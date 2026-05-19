const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DongHoSchema = new Schema(
  {
    idLoai: {
      type: String,
    },
    tenDongHo: {
      type: String,
      required: true,
    },
    giaBan: {
      type: Number,
      required: true,
    },
    giaSauGiam: {
      type: Number,
      default: 0,
    },
    soLuong: {
      type: Number,
      required: true,
    },
    anhMoTa: String,
    trangThai: {
      type: String,
      default: "Còn hàng",
    },
    tyLeGiamGia: {
      type: Number,
      default: 0,
    },
    anhmota: [
      {
        path: String,
      },
    ],

    thongSo: {
      gioiTinh: String,
      matKinh: String,
      doDay: String,
      chatLieu: String,
      dayDeo: String,
    },
  },
  {
    collection: "dongHo",
    timestamps: true,
  },
);



module.exports = mongoose.model("DongHo", DongHoSchema);
