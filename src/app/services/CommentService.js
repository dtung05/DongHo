const danhgia = require("../models/DanhGia");
class CommentService {
  async pushComment(req) {
    try{
        
        const ketqua = await danhgia.create({
        idNguoiDung: req.session.user.id,
        idSanPham: req.body.idDongHo,
        noiDung: req.body.noiDung,
        soSao: req.body.soSao,
        })
        if(ketqua){
            req.flash('message', "Đánh giá thành công");
            return true;
        }
        req.flash('message', "Đánh giá thất bại");
        return fasle;
    }catch(error){
        req.flash('message', "Lỗi database");
        return false;
    }
  }
}
module.exports = new CommentService();
