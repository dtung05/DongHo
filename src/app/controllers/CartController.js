const CartService = require("../services/CartService");
const cartService = require("../services/CartService");

class CartController{

    // method post
    async store(req,res,next){
        const ketQua  = await cartService.store(req); 
            req.flash('type', ketQua);
            return res.redirect(req.get("referer") || "/");
    }
    // get Trang index
    async index(req,res){
        const data  = await CartService.index(req);
    
       res.render('client/indexCart',{
        data,
        title:"Giỏ hàng",
        style:"indexCart",
        script: "indexCart",
       }  )
    }
    // post delete
    async delete(req,res){
        const ketqua = await CartService.delete(req);
        req.flash('type', ketqua);
        return res.redirect(req.get("referer") || "/");
    }
}
module.exports = new CartController();