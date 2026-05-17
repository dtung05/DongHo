// CategoryController.js

const CategoryService = require('../services/CategoryService');

class CategoryController {

  // GET /danh-muc/:slug
 async detail(req, res, next) {
  const slug = req.params.slug;

  const ketqua = await CategoryService.detail(slug);

  if (!ketqua) {
    req.flash('type', 'error');
    req.flash('message', 'Không tìm thấy danh mục');
    return res.redirect('/');
  }

  res.render('client/category', {
    title: ketqua.danhmuc.tenLoai,
    danhmuc: ketqua.danhmuc,
    dongHo: ketqua.sanpham,
    style: 'category'
  });
}

}

module.exports = new CategoryController();