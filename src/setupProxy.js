const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      "/podcaster",
      createProxyMiddleware({
          target: "https://podlybackend.herokuapp.com/podcaster",
          //changeOrigin: true
      })
  )
};