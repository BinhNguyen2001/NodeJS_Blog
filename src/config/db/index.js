//* Using Node.js `require()`
const mongoose = require('mongoose');

//? Link: https://mongoosejs.com/docs/connections.html
async function connect() {
    try {
        // await mongoose.connect('mongodb://localhost:27017/Udemy_dev', {
		// await mongoose.connect('mongodb+srv://coursesNodejs:node123@cluster0.hmv8h.mongodb.net/Udemy_dev?retryWrites=true&w=majority', {
        await mongoose.connect('mongodb+srv://binhnguyen:kimnguu@cluster0.hmv8h.mongodb.net/Udemy_dev?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Connect db successfully!!!');
    } catch (error) {
        console.log('Connect db fail!!!');
    }
}
module.exports = { connect };

// const db = require('this file')
// db.connect();
//Normal: module.exports = connect;
// const db = require('this file')
// db();
