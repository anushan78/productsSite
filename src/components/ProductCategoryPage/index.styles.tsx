import { style } from 'typestyle'
import { px, margin, percent, padding } from 'csx'

export const layout = style({
  maxWidth: px(1200),
  margin: margin(px(20), 'auto', px(0))
})

export const productGrid = style({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(${px(200)}, 1fr))`,
  gridGap: px(24),
  alignItems: 'center',
  padding: px(24),
  gridAutoRows: `minmax(${px(300)}, auto)`,
  $nest: {
    '> div': {
      height: percent(100)
    }
  }
})

export const metaData = style({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: padding(px(24), px(24), px(0)),
  $nest: {
    '@media screen and (min-width: 768px)': {
      flexWrap: 'nowrap',
      justifyContent: 'space-between'
    }
  }
})

export const cartAlert = style({
  maxWidth: px(300)
})
