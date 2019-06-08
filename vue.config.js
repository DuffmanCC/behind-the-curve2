module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/behind-the-curve2/'
    : '/'
}