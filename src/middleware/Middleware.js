class Middleware {
  auth(req, res, next) {
    if (req.session.user) {
      return next();
    }
    req.flash("message", "Cần đăng nhập để truy vập vào giỏ hàng");
    req.flash("type", false);
    return res.redirect("/");
  }
}

module.exports = new Middleware();
