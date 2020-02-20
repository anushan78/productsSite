import { style } from 'typestyle'
import { px, percent } from 'csx'

export const productCard = style({
  $debugName: 'productCard',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'space-between',
  overflow: 'hidden',
  $nest: {
    '> div': {
      padding: px(12),
      width: percent(100),
      position: 'relative',
      overflow: 'hidden'
    },
    '.ant-card-cover': {
      borderBottom: `solid ${px(1)} #eaeaea`
    },
    '&:hover .addToCart': {
      bottom: px(0),
      opacity: 1
    }
  }
})

export const addToCart = style({
  position: 'absolute',
  bottom: px(-80),
  left: px(0),
  right: px(0),
  padding: px(12),
  background: 'rgba(255, 255, 255, 0.5)',
  opacity: 0,
  transition: 'all 0.2s ease',
  $nest: {
    button: {
      width: percent(100),
      textTransform: 'uppercase'
    }
  }
})
