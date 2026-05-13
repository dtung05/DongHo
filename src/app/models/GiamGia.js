const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GiamGia = new Schema(
  {
    idSanPham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DongHo",
      required: true,
    },

    tyLeGiam: {
      type: Number,
      required: true,
    },

    idAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaiKhoan",
    },

    ngayGiam: {
      type: Date,
      default: Date.now,
    },

    ghiChu: {
      type: String,
    },
  },
  {
    collection: "giamGia",
    timestamps: true,
  },
);

module.exports = mongoose.model("GiamGia", GiamGia);
