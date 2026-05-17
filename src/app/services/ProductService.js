const dongHo = require('../models/DongHo');
const thongSoKiThuat = require('../models/ThongSoKiThuat');
const anhSanPham = require('../models/AnhSanPham');
const danhGia = require('../models/DanhGia');
class ProductService{
    async index(req){
        const id = req.params.id;
        try{
            const dongho = await dongHo.findOne({_id : id}).lean();
            if(!dongho){
                return null;
            }
            const thongsokithuat = await thongSoKiThuat.findOne({idDongHo : id}).lean();
            const anhsanpham = await anhSanPham.find({ idDongHo: id}).lean();
            const danhgia = await danhGia.find({ idSanPham:id}).lean();
            const ketqua = {
                dongho,thongsokithuat,anhsanpham,danhgia
            }
            return ketqua;
        }catch(error){
           req.flash('message', 'Lỗi kết nối database');
            return null;
        }
        
    }
}
module.exports = new ProductService();