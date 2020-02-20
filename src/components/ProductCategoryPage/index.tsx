import React from 'react'
import { Layout, message, Pagination } from 'antd'
import * as styles from './index.styles'
import { GET_PRODUCTS_URL } from '../Common/consts'
import { ProductCard } from './ProductCard'
import { Product, MetaData } from '../../models/product'
import { CartItem } from '../../models/cart'
import { PageHeader } from '../Common/PageHeader'

const { Content } = Layout

interface State {
  products: Product[]
  productsOnPage: Product[]
  metadata: MetaData
  cart: CartItem[]
  currentPage: number
  pageSize: number
  hasError: boolean
}

export class ProductCategoryPage extends React.Component<unknown, State> {

  state: Readonly<State> = {
    products: [],
    productsOnPage: [],
    cart: [],
    metadata: {
      query: ''
    },
    currentPage: 1,
    pageSize: 10,
    hasError: false
  }

  componentDidMount() {
    this.getProducts()
  }

  async getProducts() {
    try {
      const response = await fetch(GET_PRODUCTS_URL)
      const { results, metadata } = await response.json()
      this.setState({
        products: results,
        metadata
      }, () => this.getProductsForPage())
    } catch (error) {
      this.setState({ hasError: true })
    }
  }

  updateQuantity = (quantity: number, productId: string) => {
    this.setState((state) => {
      const existingProduct = state.cart.find((item) => item.product.id === productId)
      existingProduct && (existingProduct.quantity = quantity)
      return { cart: state.cart }
    })
  }

  addToCart = async (product: Product) => {
    this.setState((state) => {
      const existingProduct = state.cart.find((item) => item.product.id === product.id)
      if (existingProduct) {
        existingProduct.quantity++
        return { cart: state.cart }
      }
      state.cart.push({
        product,
        quantity: 1
      })
      return { cart: state.cart }
    })
    await message.loading('Adding to cart...', 1.5)
    message.success(
      <div className={styles.cartAlert}>
        {product.name} added to cart!
      </div>
    )
  }

  removeFromCart = (productId: string) => {
    this.setState((state) => {
      const cart = state.cart.filter((item) => item.product.id !== productId)
      return { cart }
    })
  }

  getProductsForPage = () => {
    const { currentPage, pageSize, products } = this.state
    const from = (currentPage - 1) * pageSize
    const to = currentPage * pageSize
    this.setState({
      productsOnPage: products.slice(from, to)
    })
  }

  changePage = (currentPage: number, pageSize: number) => {
    this.setState({
      currentPage,
      pageSize
    }, () => this.getProductsForPage())
  }

  render() {
    const { metadata, products, pageSize, currentPage, productsOnPage, cart } = this.state
    const { query } = metadata
    return (
      <Layout className={styles.layout}>
        <Layout>
          <PageHeader cart={cart} updateQuantity={this.updateQuantity} removeFromCart={this.removeFromCart} />
          <section className={styles.metaData}>
            <h1>Showing results for <strong>{query}</strong></h1>
            <Pagination
              total={products.length}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} products`}
              pageSize={pageSize}
              defaultCurrent={currentPage}
              showSizeChanger
              pageSizeOptions={['10', '20', '50']}
              onChange={(page, size) => this.changePage(page, size!)}
              onShowSizeChange={this.changePage}
            />
          </section>
          <Content className={styles.productGrid}>
            {productsOnPage.map((product) => (
              <ProductCard product={product} addToCart={this.addToCart} key={product.id} />
            ))}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
