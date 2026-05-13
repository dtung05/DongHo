const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AnhSanPham = new Schema(
  {
    idDongHo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DongHo",
    },
    path: String,
  },
  {
    collection: "anhSanPham",
  },
);

module.exports = mongoose.model("AnhSanPham", AnhSanPham);
