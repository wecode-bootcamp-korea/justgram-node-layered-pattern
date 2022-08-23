const express = require("express");

const router = require("./routers");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(router);

  return app;
};

module.exports = { createApp };