const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoaiSanPham = new Schema(
  {
    idLoai: String,
    tenLoai: String,
    anhLoai: String,
    moTa: String,
  },
  {
    collection: "loaiSanPham",
  },
);
module.exports = mongoose.model("LoaiSanPham", LoaiSanPham);
