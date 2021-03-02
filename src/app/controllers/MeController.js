const Courses = require('../models/Courses');
const convertMongooes = require('../../util/mongoose');

class MeController {
    //Todo: [GET] / me/store/courses
    storedCourses(req, res, next) {
        // res.json(res.locals._sort); // check res.locals(middleware)
        let coursesQuery = Courses.find({});
        Promise.all([
            coursesQuery.sortable(req),
            Courses.countDocumentsDeleted(),
        ])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    // res.json(convertMongooes.multipleMongooseToObject(courses))
                    courses: convertMongooes.multipleMongooseToObject(courses),
                    deletedCount,
                });
            })
            .catch(next);
    }
    //Todo: [GET] / me/trash/courses
    trashCourses(req, res, next) {
        let coursesQuery = Courses.findDeleted({});
        coursesQuery
            .sortable(req)
            .then((courses) => {
                res.render('me/trash-courses', {
                    courses: convertMongooes.multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}
module.exports = new MeController();
