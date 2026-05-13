const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DanhGia = new Schema(
  {
    idNguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaiKhoan",
      required: true,
    },

    idSanPham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DongHo",
      required: true,
    },

    noiDung: {
      type: String,
    },

    soSao: {
      type: Number,
      min: 1,
      max: 5,
    },

    ngayDanhGia: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "danhGia",
    timestamps: true,
  },
);

module.exports = mongoose.model("DanhGia", DanhGia);
