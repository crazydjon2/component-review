if (process.env.NODE_ENV === 'development') {
  module.exports = {
    devServer: {
      host: '127.0.0.1',
      proxy: {
        '^/api': {
          target: 'http://127.0.0.1:8080',
          ws: true,
          changeOrigin: true
        }
      }
    }
  }
}
else {
  module.exports = {
    css: {
      extract: false
    }
  }
}
