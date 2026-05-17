const orderService = require("../services/OrderService");
class OrderController{
    // get lấy danh sách đơn hàng
    async index(req,res){
        const order = await orderService.index(req);
        res.send(order);
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
        return res.redirect(req.get("referer") || "/");
        
    }
}
module.exports = new OrderController();