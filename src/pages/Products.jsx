import React from 'react'
import ProductList from '../components/Productlist'
import CartButton from '../components/CartButton'
import CartProvider from '../components/CartContext'

export default function Products() {
  return (
     <CartProvider>
          <CartButton />
          <ProductList />
        </CartProvider>
  )
}
