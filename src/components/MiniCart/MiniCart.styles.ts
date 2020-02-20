import { style } from 'typestyle'
import { px, padding } from 'csx'

export const cartItem = style({
  display: 'flex',
  padding: padding(px(12), px(0)),
  $nest: {
    'img': {
      marginRight: px(12),
      width: px(80),
      height: px(66)
    },
    '> div': {
      maxWidth: px(300)
    },
    '&:not(:last-child)': {
      borderBottom: `solid ${px(1)} #e2e2e2`,
    },
    '.ant-input-number': {
      width: px(54)
    }
  }
})
