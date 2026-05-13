const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSanPham = new Schema(
  {
    idDongHo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DongHo",
      required: true,
    },

    pathVideo: {
      type: String,
      required: true,
    },
  },
  {
    collection: "videoSanPham",
    timestamps: true,
  },
);

module.exports = mongoose.model("VideoSanPham", VideoSanPham);
