const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    tenDangNhap: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },

    matKhau: {
      type: String,
      required: true,
    },

    gmail: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },

    vaiTro: {
      type: String,
      default: "user",
    },

    trangThai: {
      type: Boolean,
      default: true,
    },

    hoTen: String,

    diaChi: String,

    soDienThoai: String,

    avatar: String,

    gioiTinh: String,
  },
  {
    timestamps: true,
    collection: "taiKhoan",
  }
);

module.exports = mongoose.model("User", User);