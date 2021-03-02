const mongoose = require('mongoose');

//* Tạo slug: https://www.npmjs.com/package/mongoose-slug-generator
const slug = require('mongoose-slug-generator');
//* Create ID AutoIncrement
const AutoIncrement = require('mongoose-sequence')(mongoose);
//* Soft delete: https://www.npmjs.com/package/mongoose-delete
const mongooseDelete = require('mongoose-delete');
//* Mongooes: https://mongoosejs.com/docs/guide.html
const Schema = mongoose.Schema;
const CourseSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        description: { type: String, maxLength: 600 },
        image: { type: String },
        videoId: { type: String, required: true },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

//* Custom query helpers
CourseSchema.query.sortable = function (req) {
    //! this = coursesQuery = Courses.find() (in MeController.js)
    if (req.query.hasOwnProperty('_sort')) {
        const isInvalidType = ['desc', 'asc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isInvalidType ? req.query.type : 'desc',
        });
    }
    return this;
};

//* Add plugin:
//? Slug generator
mongoose.plugin(slug);
//? Auto Increase ID
CourseSchema.plugin(AutoIncrement);
//? Soft delete + Override
CourseSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

//* Syntax: const MyModel = mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('Courses', CourseSchema);
