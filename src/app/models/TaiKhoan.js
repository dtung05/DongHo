const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaiKhoan = new Schema(
  {
    tenDangNhap: { type: String, unique: true, lowercase: true },
    matKhau: String,
    gmail: {
      type: String,
      unique: true,
      lowercase: true,
    },
    vaiTro: { type:  String, default: null },
    trangThai:{ type:  String, default: null } ,
  },
  {
    timestamps: true,
    collection: "taiKhoan",
  },
);

module.exports = mongoose.model("TaiKhoan", TaiKhoan);
