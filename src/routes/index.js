const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
function route(app) {
    //! List các đường dẫn theo thứ tự từ chi tiết đến chung chung để nó duyệt qua hết các đường dẫn chi tiết trước
    //! File index này đều cho app lắng nghe phương thức USE, vào cụ thể từng router riêng mới cần phân biệt POST, GET,...
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/news', newsRouter);
    // app.get('/news', (req, res) => {
    //     res.render('news');
    // });
    // Routes HTTP GET requests to the specified path "/" with the specified callback function
    app.use('/', siteRouter);
    // app.get('/', (req, res) => {
    //     res.render('home');
    // });
    // app.get('/search', (req, res) => {
    //     console.log(req.query);
    //     res.render('search');
    // });
    // app.post('/search', (req, res) => {
    //     console.log(req.body);
    //     res.send('Searching... ');
    // });
}
module.exports = route;
