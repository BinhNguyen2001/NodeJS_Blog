//! Do object mà MongoDb trả về là một object tương đối phức tạp nên khi đưa vào handlerbar sẽ không lấy được các thuộc tính bên trong (vấn đề bảo mật của handlebars). Do đó phải giải quyết bẳng cách đưa nó về một object bình thường rồi mới truyền vào hàm render().
// function multipleMongooseToObject(mongooesArray) {
//     return mongooesArray.map(mongooesArray => mongooesArray.toObject())
// }
// function mongooesToObject(mongooes) {
//     return mongooes ? mongooes.toObject() : mongooes;
// }
// module.exports = {
//     multipleMongooseToObject,
//     mongooesToObject,
// }
// const convertMongooes = require('../../util/mongoose');

module.exports = {
    multipleMongooseToObject: function (mongooesArray) {
        return mongooesArray.map((mongooesArray) => mongooesArray.toObject());
    },
    mongooesToObject: function (mongooes) {
        return mongooes ? mongooes.toObject() : mongooes;
    },
};
