const DongHo = require("../models/DongHo");
const DanhGia = require("../models/DanhGia");
const loaiSanPham = require("../models/LoaiSanPham");

class ProductService {
  async index(req) {
    const id = req.params.id;
    try {
      const dongho = await DongHo.findById(id).lean();
      if (!dongho) {
        return null;
      }
      // ảnh lấy trực tiếp trong dongho.anhmota
      const anhsanpham = dongho.anhmota || [];
      // thông số nằm trong luôn dongho.thongSo
      const thongsokithuat = dongho.thongSo || {};
      // đánh giá
      const danhgia = await DanhGia.find({ idSanPham: id }).lean();
      return {
        dongho,
        thongsokithuat,
        anhsanpham,
        danhgia,
      };
    } catch (error) {
      console.error(error);
      req.flash("message", "Lỗi kết nối database");
      return null;
    }
  }
  async store(body) {
    try {
      const {
        tenDongHo,
        idLoai,
        giaBan,
        tyLeGiamGia,
        soLuong,
        anhMoTa,

        anhmota_link,
        thongSo,
      } = body;

      if (!soLuong || isNaN(soLuong) || Number(soLuong) <= 0) {
        return {
          message: "Số lượng không hợp lệ",
          check: false,
        };
      }

      if (!giaBan || isNaN(giaBan) || Number(giaBan) <= 0) {
        return {
          message: "Giá bán không hợp lệ",
          check: false,
        };
      }

      let anhmota = [];
      if (anhmota_link) {
        anhmota = anhmota_link
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "")
          .map((path) => ({ path }));
      }

      const giaBanNum = Number(giaBan);
      const tyLeGiamGiaNum = Number(tyLeGiamGia || 0);

      const giaSauGiam = giaBanNum * (1 - tyLeGiamGiaNum / 100);

      const data = {
        tenDongHo,
        idLoai,
        giaBan: giaBanNum,
        giaSauGiam,
        tyLeGiamGia: tyLeGiamGiaNum,
        soLuong: Number(soLuong),
        anhMoTa,
        anhmota,
        thongSo,
      };

      const ketqua = await DongHo.create(data);

      if (ketqua) {
        return {
          message: "Tạo sản phẩm thành công",
          check: true,
        };
      }

      return {
        message: "Tạo sản phẩm thất bại",
        check: false,
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Lỗi database",
        check: false,
      };
    }
  }
  async quanLy(req){
     
    const dongho = await DongHo.find().lean();
    const loaisp = await loaiSanPham.find().lean();
    return {
      dongho,loaisp
    }
    

  }
  async edit(req){
    const id = req.params.id;
    const [loaisp, dongho] = await Promise.all([
        loaiSanPham.find().lean(),
        DongHo.findOne({_id: id}).lean(),
    ])
    return {
      loaisp,dongho
    }
  }
  async update(req){
      
    try {
      const id = req.body.id;
      const {

        tenDongHo,
        idLoai,
        giaBan,
        tyLeGiamGia,
        soLuong,
        trangThai,
        anhMoTa,
      } = req.body;
      if (!giaBan || isNaN(giaBan) || Number(giaBan) <= 0) {
        return {
          message: "Giá bán không hợp lệ",
          check: false,
        };
      }
      if (!soLuong || isNaN(soLuong) || Number(soLuong) < 0) {
        return {
          message: "Số lượng không hợp lệ",
          check: false,
        };
      }
      const giaBanNum = Number(giaBan);
      const tyLeGiamGiaNum = Number(tyLeGiamGia || 0);
      const giaSauGiam = giaBanNum * (1 - tyLeGiamGiaNum / 100);
      const dataUpdate = {
        tenDongHo,
        idLoai,
        giaBan: giaBanNum,
        tyLeGiamGia: tyLeGiamGiaNum,
        soLuong: Number(soLuong),
        trangThai,
        anhMoTa,
        giaSauGiam,
      };

      const result = await DongHo.findByIdAndUpdate(id, dataUpdate, {
        new: true,
      });

      if (!result) {
        return {
          message: "Không tìm thấy sản phẩm",
          check: false,
        };
      }
      return {
        message: "Cập nhật sản phẩm thành công",
        check: true,
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Lỗi server",
        check: false,
      };
    }
  }
    async search(data) {
    try {
      const { tenDongHo, idLoai, trangThai } = data;
 const loaisp = await loaiSanPham.find().lean();
      const query = {};
      if (tenDongHo && tenDongHo.trim() !== "") {
        query.tenDongHo = { $regex: tenDongHo, $options: "i" };
      }
      if (idLoai && idLoai !== "") {
        query.idLoai = idLoai;
      }
      if (trangThai && trangThai !== "") {
        query.trangThai = trangThai;
      }

      const dongho = await DongHo.find(query).lean();

      return {
        dongho,loaisp
      };
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async delete(id) {
    try {
      const result = await DongHo.findByIdAndDelete(id);

      if (!result) {
        return {
          message: "Không tìm thấy sản phẩm",
          check: false,
        };
      }

      return {
        message: "Xóa sản phẩm thành công",
        check: true,
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Lỗi server khi xóa",
        check: false,
      };
    }
  }

}
module.exports = new ProductService();
