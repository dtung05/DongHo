const dongho = require("../models/DongHo");
const donhang = require("../models/DonHang");

class OrderService {
  async index(req) {
    const idUser = req.session.user.id;

    const statusMap = {
      cancel: "Hủy",
      pending: "Chờ xác nhận",
      shipping: "Đang giao",
      completed: "Hoàn thành",
    };
    const status = statusMap[req.params.status];
    const query = {
      idUser: idUser,
    };
    if (status) {
      query.trangThai = status;
    }
    console.log(query);
    const order = await donhang.find(query).lean();
    return order;
  }
  async create(req) {
    let order = 0;
    if (req.body.selectedItems) {
      order = JSON.parse(req.body.selectedItems);
    }
    if (req.body.idDongHo) {
      order = [
        {
          idDongHo: req.body.idDongHo,
          soLuongMua: req.body.soLuongMua,
        },
      ];
    }
    const ids = order.map((item) => {
      return item.idDongHo;
    });
    try {
      const dongHo = await dongho.find({ _id: { $in: ids } }).lean();

      if (dongHo.length < 1) {
        return {
          ketqua: false,
        };
      }
      // gom dữ liệu
      let youOrder = [];
      dongHo.forEach((element) => {
        order.forEach((order1) => {
          if (order1.idDongHo == element._id.toString()) {
            youOrder.push({
              dongho: element,
              soLuongMua: order1.soLuongMua,
              tong: order1.soLuongMua * element.giaBan,
              thanhTien:
                order1.soLuongMua *
                (element.giaBan - (element.tyLeGiamGia * element.giaBan) / 100),
              giamGia:
                ((element.tyLeGiamGia * element.giaBan) / 100) *
                order1.soLuongMua,
            });
          }
        });
      });
      let tongTien = 0;
      youOrder.forEach((element) => {
        tongTien += element.thanhTien;
      });
      return {
        tongTien,
        data: youOrder,
        ketqua: true,
      };
    } catch (error) {
      const text = "Lỗi database " + error.code;
      req.flash("message", text);
      return {
        ketqua: false,
      };
    }
  }
  async store(req) {
    let ids = [];
    // lấy ra danh sách id
    req.body.order.forEach((element) => {
      ids.push(element.idDongHo);
    });
    // lấy ra danh sách số lượng mua theo id
    let orders = [];
    req.body.order.forEach((element) => {
      orders[element.idDongHo] = element.soLuongMua;
    });
    try {
      // truy vấn sản phẩm trong csdl
      const dongHo = await dongho.find({
          _id: {
            $in: ids,
          },
        })
        .lean();
      // check truy vấn
      if (dongHo.length < 1) {
        req.flash("message", "Lỗi truy vấn");
        return false;
      }
      // lấy ra dữ liệu sản phẩm
      let order = [];
      dongHo.forEach((item) => {
        order.push({
          idSanPham: item._id,
          tenSanPham: item.tenDongHo,
          thanhTien:
            orders[item._id] *
            (item.giaBan - (item.tyLeGiamGia * item.giaBan) / 100),
          soTienGiam:
            orders[item._id] * ((item.tyLeGiamGia * item.giaBan) / 100),
          soLuong: orders[item._id],
          img: item.anhMoTa,
        });
      });
      const idUser = req.session.user.id;
      let tongTien = 0;
      order.forEach((item) => {
        tongTien += item.thanhTien;
      });
      // thực hiện thêm sản phẩm
      const ketqua = await donhang.create({
        idUser: idUser,
        tongTien: tongTien,
        trangThai: "Chờ xác nhận",
        phuongThuc: req.body.phuongThuc,
        tenNguoiNhan: req.body.tenNguoiNhan,
        diaChi: req.body.diaChi,
        soDienThoai: req.body.soDienThoai,
        dongHo: order,
      });
      if (ketqua) {
        req.flash("message", "Tạo đơn hàng thành công");
        return true;
      }
      req.flash("message", "Tạo đơn hàng thất bại");
      return false;
    } catch (error) {
      req.flash("message", "Lỗi database " + error.code);
      return false;
    }
  }
}
module.exports = new OrderService();
