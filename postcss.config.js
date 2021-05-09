const plugins = {
  'postcss-easy-import': {},
  'postcss-normalize': {},
  tailwindcss: {},
  'postcss-custom-media': {
    importFrom: ['./tailwind.config.js'],
  },
  'postcss-preset-env': {
    stage: 0,
    features: {
      'focus-within-pseudo-class': false,
    },
  },
}

module.exports = {
  plugins,
}
