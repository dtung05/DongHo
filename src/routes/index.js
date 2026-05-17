const site = require("./site");
const user = require("./user");
const product = require("./product");
const cart = require("./cart");
const category = require("./category");
const order = require("./order");
function route(app) {
  app.use('/cart', cart);
  app.use("/order", order);
  app.use("/user", user);
  app.use("/san-pham.html", product);
  app.use('/category', category);
  app.use("/", site);
}

module.exports = route;