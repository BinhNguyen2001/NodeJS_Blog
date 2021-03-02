//? Controller cho những trang chung: Home, Search, Contact,...
class SiteController {
    //? [GET] /
    index(req, res) {
        res.render('home');
    }
    //? [GET] / search
    search(req, res) {
        res.render('search');
    }
    //? [POST] / search
    _search(req, res) {
        console.log(req.body);
        res.send('Searching... ');
    }
}

module.exports = new SiteController();
