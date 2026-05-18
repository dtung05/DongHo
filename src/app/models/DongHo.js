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
    giaSauGiam: {
      type: Number,
      default: 0,
    },
    soLuong: {
      type: Number,
      require: true,
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
  },
  {
    collection: "dongHo",
    timestamps: true,
  },
);
DongHoSchema.pre("save", function(next) {
  this.giaSauGiam =
    this.giaBan -
    (this.giaBan / 100 * this.tyLeGiamGia);
  next();
});
DongHoSchema.pre("findOneAndUpdate", async function(next) {
  const update = this.getUpdate();
  const doc = await this.model.findOne(this.getQuery());
  const giaBan =
    update.giaBan ?? doc.giaBan;
  const tyLeGiamGia =
    update.tyLeGiamGia ?? doc.tyLeGiamGia;
  update.giaSauGiam =
    giaBan -
    (giaBan / 100 * tyLeGiamGia);
  next();
});
module.exports = mongoose.model("DongHo", DongHoSchema);