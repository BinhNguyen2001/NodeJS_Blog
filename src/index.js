//? ExpressJS
//Todo: Import the top-level function of express
const express = require('express');
//Todo: Creates an Express application using the top-level function
const app = express();
//Todo: Define port number as 3000
const port = 3000;

//? Morgan: HTTP logger
// const morgan = require('morgan');
// app.use(morgan('combined'));

//? Path: Manage path library
//! chứa biến __dirname thuộc thư viện path, mặc định là đường dẫn đến file index.js
const path = require('path');

//? DataBase: MongoDB
const db = require('./config/db/index');
//Todo: Connect to DB
db.connect();

//? Template Engine
const exphbs = require('express-handlebars');
app.engine(
    'hbs',
    exphbs({
        extname: '.hbs', //*Thay đổi đuôi .handlebars => .hbs
        helpers: require('./helpers/handlebars'),
    }),
);
//Todo: Set view engine thành handlebars bên trên
app.set('view engine', 'hbs');
//Todo: Setup lại đuờng dẫn đến file views do khác với mặc định của handlebar
app.set('views', path.join(__dirname, 'resources', 'views')); //* path sẽ tự điền kí tự ngăn cách dùm luôn

//? Setup static files: folder "public"
app.use(express.static(path.join(__dirname, 'public')));

//? Thay đổi phương thức của form (do form chỉ hỗ trợ get & post)
const methodOverride = require('method-override');
//Todo: Sử dụng cách "override using a query value"
app.use(methodOverride('_method'));

//? Setup middleware nhận dữ liệu từ POST method
//Todo: Xử lí dữ liệu gửi từ form, cấu trúc lại đói tượng req & lưu vào object mới là "body" -> req.body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
//Todo: Xử lí dữ liệu gửi từ code JS
app.use(express.json());

//? Custom middlewares
const SortMiddleware = require('./app/middlewares/sortMiddleware');
app.use(SortMiddleware);

//? Import routes/index.js
const route = require('./routes');
//Todo: route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
