const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DongHoSchema = new Schema(
  {
    idLoai: {
      type: String,
      ref: "loaiDongHo",
    },
    tenDongHo: {
      type: String,
      required: true,
    },
    giaBan: {
      type: Number,
      required: true,
    },
    giaGoc: Number,
    soLuong: { type: Number, require: true },
    anhMoTa: String,
    trangThai: {
      type: String,
      default: "Còn hàng",
    },
    tyLeGiamGia: { type: Number, default: 0}
  },
  {
    collection: "dongHo",
    timestamps: true,
  },
);

module.exports = mongoose.model("DongHo", DongHoSchema);
