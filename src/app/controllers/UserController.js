

const UserService = require("../services/UserService")
class UserController{
    async authLogin(req, res, next){
        const ketQua = await UserService.authLogin(req);
        req.flash("message", ketQua.message);
        req.flash("type", ketQua.check);
        return res.redirect(req.get("referer") || "/");
    }

    async dangKy(req, res, next) {
        const ketQua = await UserService.dangKy(req);
        req.flash("message", ketQua.message);
        req.flash("type", ketQua.check);
        return res.redirect("/");
    }
    async logOut(req, res, next) {

    delete req.session.user;

    req.flash("message", "Đăng xuất thành công");
    req.flash("type", true);

    return res.redirect("/");
    }
    // method: get xem trang thông tin
    async profile(req,res){
        const ketqua = await UserService.profile(req);
        res.render("client/profile",{
            ...ketqua,
            title:"Thông tin cá nhân",
        })
    }
    // method: post Sửa thông tin cá nhân
    async setProfile(req,res){
        const ketqua = await UserService.setProfile(req);
        req.flash("type", ketqua);
        if(!ketqua){
            req.flash("message","Cập nhật thất bại");
        }
        return res.redirect('/user/profile');
       
    }
}

module.exports = new UserController();