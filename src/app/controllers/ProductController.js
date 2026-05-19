const ProductService = require("../services/ProductService");
const loaiDH = require("../models/LoaiSanPham");
class ProductController {
  // GET /san-pham/:id
  async index(req, res, next) {
    try {
      const ketqua = await ProductService.index(req);

      if (!ketqua || !ketqua.dongho) {
        req.flash("type", false);
        return res.redirect("/");
      }

      return res.render("client/product", {
        ketqua,
        title: ketqua.dongho.tenDongHo || "Chi tiết sản phẩm",
        style: "detail_product",
        script: "detail_product",
      });
    } catch (error) {
      console.error(error);
      req.flash("type", false);
      return res.redirect("/");
    }
  }
  // get? san-pham.html/create form thêm sản phẩm
  async create(req, res) {
    const loaisp = await loaiDH.find().lean();
    return res.render("staff/create", {
      layout: "staff",
      title: "thêm đồng hồ",loaisp,
      old: req.flash("old")[0] || {},
    });
  }
  async store(req, res) {
    const ketqua = await ProductService.store(req.body);

    if (!ketqua.check) {
      req.flash("old", req.body);
    }
    req.flash("message", ketqua.message);
    req.flash("type", ketqua.check);
    return res.redirect("/san-pham.html/create");
  }
  async quanLy(req,res){
    const ketqua = await ProductService.quanLy(req);

    res.render("staff/quanLy",{...ketqua,
      layout: 'staff',
      title: "Quản lý sản phẩm"
    });
  }
  async edit(req,res){
    const ketqua = await ProductService.edit(req);

    return res.render('staff/edit', {
      dongho: ketqua.dongho,
      loaisp: ketqua.loaisp,
      title: "Sửa sản phẩm",
      layout: "staff",
    })
  }
  async update(req, res) {
  const result = await ProductService.update(req);

  req.flash("message", result.message);
  req.flash("type", result.check);

  return res.redirect("/san-pham.html/edit/"+req.body.id);
}
async search(req, res) {
  const result = await ProductService.search(req.body);

  return res.render("staff/quanly", {
    layout: "staff",
   ...result,
  });
}
}

module.exports = new ProductController();
