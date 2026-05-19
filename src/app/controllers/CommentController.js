const CommentSerivce = require("../services/CommentService");

class CommentController {

  async pushComment(req, res) {

    const ketqua =
      await CommentSerivce.pushComment(req);

    req.flash('type', ketqua);

    return res.redirect("/san-pham.html/" + req.body.idDongHo + "#pd-t3");
  }

}
module.exports = new CommentController();
