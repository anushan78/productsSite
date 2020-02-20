
import React from 'react'
import { ProductCard } from './ProductCard'
import { mount, ReactWrapper } from 'enzyme'
import { mockProducts } from '../../mocks/mockProducts'

describe('<ProductCard />', () => {

  let wrapper: ReactWrapper
  const addtoCart = jest.fn()
  const product = mockProducts.results[1]
  const productNotAvailable = mockProducts.results[31]

  beforeEach(() => {
    wrapper = mount(
      <ProductCard
        product={product}
        addToCart={addtoCart}
      />
    )
  })

  it('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Should add to cart', () => {
    wrapper.find('button').simulate('click')
    expect(addtoCart).toHaveBeenCalledWith(product)
  })

  it('Should contain product details', () => {
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('p').text()).toContain('Havaianas Top Thongs')
  })

  it('Should not show cart button if not available', () => {
    wrapper = mount(
      <ProductCard
        product={productNotAvailable}
        addToCart={addtoCart}
      />
    )
    expect(wrapper.find('button').exists()).toBeFalsy()
  })

})
