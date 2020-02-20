import React from 'react'
import { Card, Button } from 'antd'
import Truncate from 'react-truncate'
import { PriceTag } from '../PriceTag/PriceTag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { classes } from 'typestyle'
import { Product } from '../../models/product'
import * as styles from './ProductCard.styles'

interface Props {
  product: Product
  addToCart: (product: Product) => void
}

export const ProductCard: React.FC<Props> = ({
  product,
  addToCart
}) => (
    <Card
      hoverable
      cover={(
        <>
          <img alt={product.name} src={product.imageUrl} />
          {product.quantityAvailable > 0 && (
            <div className={classes('addToCart', styles.addToCart)}>
              <Button type="primary" onClick={() => addToCart(product)}>
                <FontAwesomeIcon icon={faCartPlus} />&nbsp;
                Add to cart
              </Button>
            </div>
          )}
        </>
      )}
      className={styles.productCard}
    >
      <p><Truncate lines={3}>{product.name}</Truncate></p>
      <PriceTag
        salePrice={product.salePrice}
        retailPrice={product.retailPrice}
        quantityAvailable={product.quantityAvailable}
      />
    </Card>
  )
