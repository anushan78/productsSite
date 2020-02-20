
import React from 'react'
import { message } from 'antd'
import { mount, ReactWrapper } from 'enzyme'
import wait from 'waait'
import { ProductCategoryPage } from './index'
import { PageHeader } from '../Common/PageHeader'
import { mockProducts } from '../../mocks/mockProducts'
import { GET_PRODUCTS_URL } from '../Common/consts'

function methodInstance<TInstance>(wrapper: ReactWrapper) {
  return wrapper.instance() as any as TInstance
}

describe('<ProductCategoryPage />', () => {

  let wrapper: ReactWrapper
  let instance: ProductCategoryPage

  beforeEach(async () => {
    wrapper = mount(<ProductCategoryPage />)
    instance = methodInstance<ProductCategoryPage>(wrapper)
    jest.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: jest.fn().mockResolvedValue(mockProducts)
      }) as any
    )
    await instance.getProducts()
  })

  it('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Should contain PageHeader', () => {
    expect(wrapper.find(PageHeader).length).toEqual(1)
  })

  it('Should render products', () => {
    wrapper.setState({
      products: mockProducts.results,
      metadata: mockProducts.metadata
    }, () => instance.getProductsForPage())
    wrapper.update()
    expect(wrapper.find('.ant-card').length).toEqual(10)
  })

  it('Should fetch products', async () => {
    expect(window.fetch).toHaveBeenCalledWith(GET_PRODUCTS_URL)
  })

  it('Should throw error', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500
      }) as any
    )
    await instance.getProducts()
    expect(wrapper.state('hasError')).toEqual(true)
  })

  it('Should change pages', () => {
    wrapper.update()
    instance.changePage(2, 20)
    expect(wrapper.state('currentPage')).toEqual(2)
    expect(wrapper.state('pageSize')).toEqual(20)
  })

  it('Should add to cart', async () => {
    jest.spyOn(message, 'loading')
    jest.spyOn(message, 'success')
    wrapper.update()
    wrapper.find('.addToCart button').at(1).simulate('click')
    expect(wrapper.state('cart')).toEqual([{
      product: mockProducts.results[1],
      quantity: 1
    }])
    expect(message.loading).toHaveBeenCalledWith('Adding to cart...', 1.5)
    await wait(1500)
    expect(message.success).toHaveBeenCalled()
  })

  it('Should increase quantity if product is already in cart', () => {
    wrapper.update()
    wrapper.find('.addToCart button').at(1).simulate('click')
    wrapper.find('.addToCart button').at(1).simulate('click')
    expect(wrapper.state('cart')).toEqual([{
      product: mockProducts.results[1],
      quantity: 2
    }])
  })

  it('Should remove items from cart', () => {
    wrapper.update()
    wrapper.find('.addToCart button').at(1).simulate('click')
    expect(wrapper.state('cart')).toEqual([{
      product: mockProducts.results[1],
      quantity: 1
    }])
    instance.removeFromCart(mockProducts.results[1].id)
    expect(wrapper.state('cart')).toEqual([])
  })

  it('Should adjust quantity', () => {
    wrapper.update()
    wrapper.find('.addToCart button').at(1).simulate('click')
    instance.updateQuantity(5, mockProducts.results[1].id)
    expect(wrapper.state('cart')).toEqual([{
      product: mockProducts.results[1],
      quantity: 5
    }])
  })

})
