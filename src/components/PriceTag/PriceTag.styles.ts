import { style } from 'typestyle'
import { px, padding, borderWidth } from 'csx'

export const priceTag = style({
  background: 'red',
  color: 'white',
  display: 'inline-block',
  fontSize: px(22),
  padding: padding(px(0), px(12)),
  height: px(30),
  lineHeight: px(30),
  position: 'relative',
  $nest: {
    '&:after': {
      content: `''`,
      position: 'absolute',
      borderStyle: 'solid',
      borderWidth: borderWidth(px(15), px(0), px(15), px(10)),
      borderColor: 'transparent transparent transparent red',
      right: px(-10)
    }
  }
})

export const soldOutTag = style({
  background: 'lightgrey',
  color: 'white',
  fontSize: px(22),
  padding: padding(px(0), px(12)),
  height: px(30),
  lineHeight: px(30)
})

export const priceTagWrapper = style({
  textAlign: 'center',
  fontWeight: 700
})

export const strikeThrough = style({
  textDecoration: 'line-through'
})
