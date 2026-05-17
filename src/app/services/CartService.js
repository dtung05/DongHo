const giohang = require("../models/GioHang");
const dongho = require("../models/DongHo");
class CartService {
async index(req) {
     const mongoose = require("mongoose");
    const userId = new mongoose.Types.ObjectId(req.session.user.id);

    const data = await giohang.aggregate([
        {
            $match: {
                idUser: userId
            }
        },
        {
            $lookup: {
                from: "dongHo",
                localField: "idDongHo",
                foreignField: "_id",
                as: "dongHo"
            }
        },
        {
            $unwind: "$dongHo"
        }
    ]);
    return data;
}

async store(req) {

    const user = req.session.user;
    const cart = req.body;

    try {
        const cartItem = await giohang.findOne({
            idUser: user.id,
            idDongHo: cart.idDongHo
        });
        // nếu sản phẩm đã có trong giỏ
        if (cartItem) {
            const tongSoLuong =
                cartItem.soLuongMua + Number(cart.soLuongMua);
            // kiểm tra tổng số lượng
            if (tongSoLuong > Number(cart.soLuong)) {
                req.flash(
                    "message",
                    "Số lượng sản phẩm trong giỏ vượt quá tồn kho"
                );
                return false;
            }
            cartItem.soLuongMua = tongSoLuong;
            await cartItem.save();
        } else {
            // kiểm tra lần thêm đầu tiên
            if (Number(cart.soLuongMua) > Number(cart.soLuong)) {
                req.flash(
                    "message",
                    "Số lượng mua không hợp lệ"
                );

                return false;
            }

            await giohang.create({
                idUser: user.id,
                idDongHo: cart.idDongHo,
                soLuongMua: Number(cart.soLuongMua)
            });
        }

        req.flash("message", "Thêm vào giỏ hàng thành công");

        return true;

    } catch (error) {

        console.log(error);

        req.flash("message", "Lỗi database");

        return false;
    }
}
async delete(req){

    try{
        const idCart = req.params.id;
        const ketqua = await giohang.deleteOne({
            _id: idCart
        });
        if(ketqua.deletedCount > 0){
            req.flash("message", "Xóa sản phẩm khỏi giỏ thành công");
            return true;
        }else{
            req.flash("message", "Không tìm thấy sản phẩm");
            return false;
        }
    }catch(error){
        console.log(error);
        req.flash("message", "Xóa thất bại lỗi database");
        return false;
    }
}

}

module.exports = new CartService();