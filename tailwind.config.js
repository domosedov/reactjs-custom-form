module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.css',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.ts',
      './src/**/*.tsx'
    ]
  },
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
}
