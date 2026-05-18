
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
  async sale(req,res){
    const dongHo = await DongHo.find({})
  .sort({ tyLeGiamGia: -1 })
  .limit(10)
  .lean();

    res.render('client/sale', {
      dongHo,
      title: "Giảm giá",
      style:"sale",
    })
  }
  lienHe(req,res){
    res.render('client/call',{
      title: "Liên hệ",
      style: 'call',
    } )
  }
  traCuu(req, res) {
    res.render("client/traCuu");
  }
}

module.exports = new SiteController();
