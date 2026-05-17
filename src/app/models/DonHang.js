const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonHang = new Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaiKhoan",
      required: true,
    },
    tongTien: {
      type: Number,
      required: true,
    },

    trangThai: {
      type: String,
      default: "Chờ xác nhận",
    },
// COD or BANK
    phuongThuc: {
      type: String,
    },

    tenNguoiNhan: {
      type: String,
    },

    diaChi: {
      type: String,
    },

    soDienThoai: {
      type: String,
    },

    ngayDat: {
      type: Date,
      default: Date.now,
    },
    dongHo: [{
          idSanPham: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DongHo",
          required: true,
        },
      
        tenSanPham: {
          type: String,
        },
      
        thanhTien: {
          type: Number,
        },
      
        soTienGiam: {
          type: Number,
          default: 0,
        },
      
        soLuong: {
          type: Number,
          default: 1,
        },
      
        img: {
          type: String,
        },
  }],
  },
  {
    collection: "donHang",
    timestamps: true,
  },
);

module.exports = mongoose.model("DonHang", DonHang);
