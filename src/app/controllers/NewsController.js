class NewsController{
    index(req,res){
        return res.render('news');
    }
}
module.exports = new NewsController();