const taiKhoan = require("../models/TaiKhoan");
const thongTin = require("../models/ThongTin");
const donHang = require("../models/DonHang");
const fs = require("fs");
const path = require("path");
class UserService {
  async authLogin(req) {
    const user = await taiKhoan.findOne({ tenDangNhap: req.body.tenDangNhap });
    const information = await thongTin.findOne({ idUser: user._id }).lean();
    if (!user) {
      return {
        check: false,
        message: "Tên đăng nhập không tồn tại",
      };
    }
    if (user.matKhau === req.body.matKhau) {
      req.session.user = {
        id: user._id,
        vaiTro: user.vaiTro,
        hoTen: information.hoTen,
        diaChi: information.diaChi,
        soDienThoai: information.soDienThoai,
      };
      return {
        check: true,
        message: "Đăng nhập thành công",
      };
    } else
      return {
        check: false,
        message: "Mật khẩu đăng nhập không khớp",
      };
  }
  async dangKy(req) {
    let taiKhoanMoi;
    try {
      if (req.body.matKhau !== req.body.matKhau2) {
        return {
          check: false,
          message: "Mật khẩu không khớp",
        };
      }
      const taiKhoanMoi = await taiKhoan.create({
        tenDangNhap: req.body.tenDangNhap,
        matKhau: req.body.matKhau,
        gmail: req.body.gmail,
        vaiTro: "client",
        trangThai: "Hoạt động",
      });
      if (taiKhoanMoi._id) {
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
          message: `${field} đã tồn tại`,
        };
      }
      return {
        check: false,
        message: "Lỗi kết nối database",
      };
    }
  }
  async profile(req) {
    const idUser = req.session.user.id;
    const [taikhoan, thongtin, thongke] = await Promise.all([
      taiKhoan.findById(idUser).lean(),
      thongTin.findOne({ idUser: idUser }).lean(),
      donHang.aggregate([
        {
          $group: {
            _id: "$trangThai",
            soLuong: {
              $sum: 1,
            },
          },
        },
      ]),
    ]);
    return {
      taikhoan,
      thongtin,
      thongke,
    };
  }

async setProfile(req) {
  const idUser = req.session.user.id;
  const thongtin = req.body;
  let avatar = null;
  if (req.file) {
    avatar = "/uploads/" + req.file.filename;
  }
  try {
    // Lấy thông tin user hiện tại
    const userInfo = await thongTin.findOne({
      idUser: idUser,
    });
    const dataUpdate = {
      hoTen: thongtin.hoTen,
      soDienThoai: thongtin.soDienThoai,
      gioiTinh: thongtin.gioiTinh,
      diaChi: thongtin.diaChi,
    };
    if (avatar) {
      if (
        userInfo.avatar &&
        userInfo.avatar !== "/images/default-avatar.png"
      ) {

        const duongDanAnhCu = path.join(
          __dirname,
          "../../public",
          userInfo.avatar
        );
        fs.unlink(duongDanAnhCu, (err) => {
          if (err) {
            console.log("Không thể xóa ảnh cũ");
          }
        });
      }
      dataUpdate.avatar = avatar;
    }
    await taiKhoan.updateOne(
      {
        _id: idUser,
      },
      {
        $set: {
          gmail: thongtin.gmail,
        },
      },
    );
    await thongTin.updateOne(
      {
        idUser: idUser,
      },
      {
        $set: dataUpdate,
      },
    );
    req.flash(
      "message",
      "Cập nhật thông tin thành công"
    );
    return true;
  } catch (error) {
    console.log(error);
    req.flash(
      "message",
      "Lỗi database"
    );
    return false;
  }
}
}
module.exports = new UserService();
