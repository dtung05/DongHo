

const UserService = require("../services/UserService")
class UserController{
    async authLogin(req, res, next){
        const ketQua = await UserService.authLogin(req);
        req.flash("message", ketQua.message);
        req.flash("type", ketQua.check);
        return res.redirect("/");
    }

    async dangKy(req, res, next) {
        const ketQua = await UserService.dangKy(req);
        req.flash("message", ketQua.message);
        req.flash("type", ketQua.check);
        return res.redirect("/");
    }
    logOut(req, res, next) {
    req.session.destroy((err) => { // xóa bên server
        if (err) {
            return next(err);
        }

        res.clearCookie("connect.sid"); // xóa bên người dùng
        req.flash("message", "Đăng xuất thành công");
        req.flash("type", true);
        return res.redirect("/");
    });
}
}
module.exports = new UserController();