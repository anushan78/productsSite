import { Product } from './product'

export interface CartItem {
  product: Product
  quantity: number
}
export type UpdateQuantity = (value: number, productId: string) => void
export type RemoveFromCart = (productId: string) => void