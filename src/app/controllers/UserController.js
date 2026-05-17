

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
    logOut(req, res, next) {

    delete req.session.user;

    req.flash("message", "Đăng xuất thành công");
    req.flash("type", true);

    return res.redirect("/");
}
}

module.exports = new UserController();