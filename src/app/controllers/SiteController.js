
const DongHo = require("../models/DongHo");
class SiteController {
  home(req, res, next) {
    DongHo.find({})
      .then((dongHo) =>{
        dongHo = dongHo.map(dongHo => dongHo.toObject())
        res.render("client/home", {
          dongHo: dongHo,
          title: "Unicode",
          // message: "Thêm sản phẩm lỗi",
          // type: "error",
          style: 'home',
          script: 'home',
        })
      })
      .catch(next);
  }
  traCuu(req, res) {
    res.render("client/traCuu");
  }
}

module.exports = new SiteController();
