const orderService = require("../services/OrderService");
class OrderController{
    // get lấy danh sách đơn hàng
    async index(req,res){
        const orders = await orderService.index(req);
        res.render('client/order', {
            orders,
            title: "Đơn hàng",
            currentStatus: req.params.status || "all"
        })
    };
    // post đổ dữ liệu vào form xác nhận
    async create(req,res){
        const data = await  orderService.create(req);
        res.render('client/createOrder', {
            tongTien: data.tongTien,
            data: data.data,
            title: "Đơn hàng",
            style: "createOrder",
        });
    }
    //post: Đặt hàng
    async store(req,res){
        const ketqua = await orderService.store(req);
        req.flash('type', ketqua);
        if(ketqua){
            return res.redirect('/order/index');
        }
        return res.redirect("/");
        
    }
    // post: Hủy đơn hàng
    async cancel(req,res){
        const ketqua = await orderService.cancel(req);
        if(ketqua){
            req.flash("message", "Hủy đơn hàng thành công");
        }
        req.flash("message","Hủy đơn hàng thất bại");
        req.flash('type', ketqua);
        return res.redirect(req.get("referer") || "/");
    }
}
module.exports = new OrderController();