/**
 *   UTILS
 * */
const baseFontSize = 18 // body

// Transforms
const toRem = (value) => `${value / FONT_SIZES.base}rem`

/**
 *   TOKENS
 * */
const BREAKPOINTS = {
  '3xs': 375,
  '2xs': 478,
  xs: 576,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1366,
  xxl: 1440,
  '3xl': 1567,
  '4xl': 1920,
}

// Colors
// - for text, backgrounds, borders, fill, strokes

const BRANDS = {
  neutral: {
    100: '#ffffff',
    200: '#2C2C33',
    300: '#000000',
  },
}

// Typography
// - font sizes
const FONT_SIZES = {
  base: baseFontSize,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  36: 36,
  42: 42,
}

// - font weights
const FONT_WEIGHTS = {
  light: '300',
  normal: '400',
  medium: '500',
  bold: '700',
  black: '900',
}

// - font families
const FONT_FAMILIES = {
  body: 'sans-serif',
  heading: 'sans-serif',
}

// - line heights
// Other naming convention welcome since this is a pretty large object
const LINE_HEIGHTS = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
}

// - letter spacings
const LETTER_SPACINGS = {}

// Borders
// - radius
const RADII = {
  0: 0,
  2: 2,
  4: 4,
  full: 999,
}

// - border width
const BORDER_WIDTHS = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
}

// Box shadows

const SHADOWS = {
  default: `0 ${toRem(2)} ${toRem(12)} rgba(0, 0, 0, 0.2)`,
}

const HEIGHTS = {}

const WIDTHS = {
  xxs: BREAKPOINTS.xxs,
  xs: BREAKPOINTS.xs,
  sm: BREAKPOINTS.sm,
  md: BREAKPOINTS.md,
  lg: BREAKPOINTS.lg,
  xl: BREAKPOINTS.xl,
  xxl: BREAKPOINTS.xxl,
  '3xl': BREAKPOINTS['3xl'],
  '4xl': BREAKPOINTS['4xl'],
}

const SIZES = {
  0: 0,
  none: 'none',
  full: '100%',
  screen: '100vh',
}

const SPACINGS = {
  1: 1,
  2: 2,
}

const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  up: 1,
  docked: 10,
  dropdown: 20,
  sticky: 30,
  banner: 40,
  overlay: 50,
  modal: 60,
  popover: 70,
  skipLink: 80,
  toast: 90,
  tooltip: 100,
}

const borderWidths = {}
Object.keys(BORDER_WIDTHS).map((size) => {
  borderWidths[size] = toRem(BORDER_WIDTHS[size])
})

const fontSizes = {}
Object.keys(FONT_SIZES).map((size) => {
  fontSizes[size] = toRem(FONT_SIZES[size])
})

const radiusSizes = {}
Object.keys(RADII).map((size) => {
  radiusSizes[size] = toRem(RADII[size])
})

const spacings = {}
Object.keys(SPACINGS).map((key) => {
  spacings[key] = toRem(SPACINGS[key])
})

for (let i = 0; i < 700; i = i + 5) {
  spacings[i] = toRem(i)
}

const heights = {}
Object.keys(HEIGHTS).map((size) => {
  heights[size] = toRem(HEIGHTS[size])
})

const widths = {}
Object.keys(WIDTHS).map((size) => {
  widths[size] = toRem(WIDTHS[size])
})

const breakpoints = {}
Object.keys(WIDTHS).map((size) => {
  breakpoints[size] = toRem(BREAKPOINTS[size])
})

// ES5 Syntax as ES6 is not supported in Tailwind build
module.exports = {
  BREAKPOINTS: breakpoints,
  BRANDS,
  SHADOWS,
  BORDER_WIDTHS: borderWidths,
  RADII: radiusSizes,
  LETTER_SPACINGS,
  LINE_HEIGHTS,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  FONT_SIZES: {
    ...fontSizes,
    base: baseFontSize,
  },
  SPACINGS: spacings,
  SIZES,
  Z_INDEX,
  HEIGHTS: {
    ...heights,
    ...SIZES,
    ...spacings,
  },
  WIDTHS: {
    ...widths,
    ...SIZES,
    ...spacings,
  },
}
