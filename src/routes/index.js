const newRoter = require("./news");
const site = require("./site");
const user = require("./user");
function route(app) {
  app.use("/news", newRoter);
  app.use("/user", user);
  app.use("/", site);
}

module.exports = route;
