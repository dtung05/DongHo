const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ThongSoKiThuat = new Schema(
  {
    idDongHo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DongHo",
    },

    gioiTinh: String,
    matKinh: String,
    doDay: String,
    chatLieu: String,
    dayDeo: String,
  },
  {
    collection: "thongSoKiThuat",
  },
);
module.exports = mongoose.model("ThongSoKiThuat", ThongSoKiThuat);
