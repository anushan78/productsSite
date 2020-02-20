import React from 'react'
import { Product } from '../../models/product'
import * as styles from './PriceTag.styles'

type PriceProps = Pick<Product, 'retailPrice' | 'salePrice' | 'quantityAvailable'>

export const PriceTag: React.FC<PriceProps> = ({
  retailPrice,
  salePrice,
  quantityAvailable
}) => {

  const formatPrice = (cents: number) => {
    const dollar = cents / 100
    return dollar.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }).replace('.00', '')
  }

  return (
    <div className={styles.priceTagWrapper}>
      {retailPrice > salePrice &&
        <div className={styles.strikeThrough}>{`${formatPrice(retailPrice)}`}</div>
      }
      {quantityAvailable > 0 ?
        (
          <div className={styles.priceTag}>
            {`${formatPrice(salePrice)}`}
          </div>
        ) : (
          <div className={styles.soldOutTag}>
            Sold out
          </div>
        )
      }
    </div>
  )
}
