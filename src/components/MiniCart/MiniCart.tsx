import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Popover, Button, Badge, InputNumber } from 'antd'
import { CartItem, UpdateQuantity, RemoveFromCart } from '../../models/cart'
import * as styles from './MiniCart.styles'

interface Props {
  cart: CartItem[]
  updateQuantity: UpdateQuantity
  removeFromCart: RemoveFromCart
  trigger?: 'hover' | 'click'
}

export const MiniCart: React.FC<Props> = ({
  cart,
  updateQuantity,
  removeFromCart,
  trigger = 'hover'
}) => {

  const cartItems = () => (
    <div>
      {cart.length > 0 ?
        cart.map((item) => (
          <div key={item.product.id} className={styles.cartItem}>
            <img src={item.product.imageUrl} />
            <div>
              <p>{item.product.name}</p>
              qty: <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) => updateQuantity(value!, item.product.id)}
                style={{ width: '54px' }}
                precision={0}
              />
              <Button type="link" onClick={() => removeFromCart(item.product.id)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </Button>
            </div>
          </div>
        ))
        :
        <p>No items in cart</p>
      }
    </div>
  )

  const productCount = () => (
    cart.reduce((a, b) => a + b.quantity, 0)
  )

  return (
    <Popover
      placement="bottomRight"
      content={cartItems()}
      title="Shopping cart"
      trigger={trigger}
    >
      <Badge count={productCount()} showZero>
        <Button><FontAwesomeIcon icon={faShoppingCart} /></Button>
      </Badge>
    </Popover>
  )
}
