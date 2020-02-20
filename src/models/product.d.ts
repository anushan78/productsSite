export interface Product {
  id: string
  imageUrl: string
  name: string
  quantityAvailable: number
  retailPrice: number
  salePrice: number
}

export interface MetaData {
  query: string
}