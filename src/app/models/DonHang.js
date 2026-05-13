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
  },
  {
    collection: "donHang",
    timestamps: true,
  },
);

module.exports = mongoose.model("DonHang", DonHang);
