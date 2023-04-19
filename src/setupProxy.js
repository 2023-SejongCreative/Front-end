const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use("/ws", createProxyMiddleware({ target: "http://", ws: true }));
};
