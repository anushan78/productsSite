import React from 'react'
import { Layout } from 'antd'
import { MiniCart } from '../MiniCart/MiniCart'
import { LOGO } from './consts'
import { headerStyle } from './PageHeader.styles'
import { CartItem, UpdateQuantity, RemoveFromCart } from '../../models/cart'

const { Header } = Layout

interface Props {
  cart: CartItem[]
  updateQuantity: UpdateQuantity
  removeFromCart: RemoveFromCart
}

export const PageHeader: React.FC<Props> = ({
  cart,
  updateQuantity,
  removeFromCart
}) => (
    <Header className={headerStyle}>
      <img src={LOGO} width="120" />
      <MiniCart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </Header>
  )
