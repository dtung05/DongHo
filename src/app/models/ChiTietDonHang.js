const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChiTietDonHang = new Schema(
  {
    idDonHang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonHang",
      required: true,
    },

    idSanPham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DongHo",
      required: true,
    },

    tenSanPham: {
      type: String,
    },

    giaKhiMua: {
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
  },
  {
    collection: "chiTietDonHang",
    timestamps: true,
  },
);

module.exports = mongoose.model("ChiTietDonHang", ChiTietDonHang);
