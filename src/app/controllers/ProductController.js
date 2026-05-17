const ProductService = require("../services/ProductService");
class ProductController {
  // Get (Trang chi tiết sản phẩm)
  async index(req, res, next) {
    const ketqua = await ProductService.index(req);
    if(!ketqua){
      req.flash('type', false);
      return res.redirect("/");
    }
  
    res.render("client/product", {
      ketqua: ketqua,
      title: ketqua.dongho.tenDongHo,
      style: "detail_product",
      script: "detail_product",
    });
  }
}
module.exports = new ProductController();
