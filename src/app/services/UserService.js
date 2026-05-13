const taiKhoan = require("../models/TaiKhoan");
const thongTin = require("../models/ThongTin");

class UserService{
    async authLogin (req) {
         const user = await taiKhoan.findOne({tenDangNhap: req.body.tenDangNhap});
        if(!user){
            return {
                check : false,
                message: "Tên đăng nhập không tồn tại",
            }
        }
        if(user.matKhau === req.body.matKhau){
            req.session.user = {
                id: user._id,
                vaiTro:  user.vaiTro,
            } 
            return {
                check: true,
                message: "Đăng nhập thành công",
            }
        }else return {
            check: false,
            message: "Mật khẩu đăng nhập không khớp",
            }
    }
    async dangKy(req) {
        let taiKhoanMoi;
        try {
            if( req.body.matKhau !== req.body.matKhau2 ){
                return {
                    check: false,
                    message: "Mật khẩu không khớp",
                }
            }
            const taiKhoanMoi = await taiKhoan.create({
                tenDangNhap: req.body.tenDangNhap,
                matKhau: req.body.matKhau,
                gmail: req.body.gmail,
                vaiTro: "client",
                trangThai: "Hoạt động"
            });
            if (taiKhoanMoi._id){
                const thongTinMoi = await thongTin.create({
                userId: taiKhoanMoi._id,
                hoTen: req.body.hoTen,
                gioiTinh: req.body.gioiTinh,
            });
            return {
                check: true,
                message: "Tạo tài khoản thành công",
            };
            }
        } catch (error) {
              if (taiKhoanMoi) {
                await taiKhoan.deleteOne({ _id: taiKhoanMoi._id });
                }
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                return {
                    check: false,
                    message: `${field} đã tồn tại`
                };
            }
            return {
                check: false,
                message: "Lỗi kết nối database"
            };
        }
    }

}
module.exports = new UserService();