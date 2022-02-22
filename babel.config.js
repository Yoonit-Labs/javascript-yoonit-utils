module.exports = {
  plugins: [
    '@babel/plugin-syntax-dynamic-import'
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
      }
    ]
  ]
}
