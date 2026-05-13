const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GioHang = new Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaiKhoan",
      required: true,
    },

    idDongHo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DongHo",
      required: true,
    },

    soLuongMua: {
      type: Number,
      default: 1,
    },

    ngayThem: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "gioHang",
    timestamps: true,
  },
);

module.exports = mongoose.model("GioHang", GioHang);
