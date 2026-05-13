const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThongTin = new Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaiKhoan",
    },
    hoTen: String,
    diaChi: { type: String, default: null },
    soDienThoai: { type: String, default: null },
    avatar: { type: String, default: null },
    gioiTinh: String,
  },
  {
    collection: "thongTin",
  },
);
module.exports = mongoose.model("ThongTin", ThongTin);
