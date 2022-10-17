const withPWA = require("next-pwa");
const appConfig = require("./config/app.config");

const publicRuntimeConfig = {
  ...appConfig,
};

require("dotenv").config();

module.exports = withPWA({
  publicRuntimeConfig,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
  },
});
