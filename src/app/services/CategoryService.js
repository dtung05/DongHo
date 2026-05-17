const DanhMuc = require("../models/LoaiSanPham");
const DongHo = require("../models/DongHo");

class CategoryService {
  async detail(slug) {
    try {
      const danhmuc = await DanhMuc.findOne({
        idLoai: slug,
      }).lean();

      if (!danhmuc) return null;

      const sanpham = await DongHo.find({
        idLoai: "LDH01", // QUAN TRỌNG: dùng _id thật
      }).lean();
      console.log(sanpham);
      return {
        danhmuc,
        sanpham,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = new CategoryService();
