const Course = require('../models/Courses');
const convertMongooes = require('../../util/mongoose');
const { render } = require('node-sass');

class CoursesController {
    //Todo: [GET] / courses
    index(req, res, next) {
        //? err: error & courses: documents
        //? "find / findOne" function of Mongoose
        //* Callback version
        // Course.find({}, function (err, courses) {
        //     if (!err) {
        //         res.json(courses);
        //     } else {
        //         next(err);
        //         res.status(400).json({ error: 'ERROR!!!' });
        //     }
        // });
        //* Promise version
        Course.find({})
            .then((courses) => {
                courses = convertMongooes.multipleMongooseToObject(courses);
                res.render('courses/courses', {
                    courses,
                    //* Enhanced object literals
                    //* <=> courses: courses
                });
            })
            .catch((err) => {
                next(err);
            });
    }
    //Todo: [GET] / courses/detail
    show(req, res, next) {
        //? Để lấy đối đối số trên URL theo cú pháp đã thiết lập trong "route/courses.js" ('/:slug') thì sử dụng "params" (params:slug)
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                if (course) {
                    // res.json(course);
                    res.render('courses/detail', {
                        course: convertMongooes.mongooesToObject(course),
                    });
                } else res.render('404');
            })
            .catch(next);
    }
    //Todo: [GET] / courses/create
    create(req, res) {
        res.render('courses/create');
    }
    //Todo: [POST] / courses/store
    store(req, res, next) {
        let formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        // res.json(formData);
        const course = new Course(formData);
        course
            .save()
            .then(() => {
                res.redirect('/me/stored/courses');
            })
            .catch(next);
    }
    //Todo: [GET] / courses/_id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                if (course) {
                    res.render('courses/edit', {
                        course: convertMongooes.mongooesToObject(course),
                    });
                }
            })
            .catch(next);
    }
    //Todo: [PUT] / courses/_id
    update(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        // res.json(req.body);
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/me/stored/courses');
            })
            .catch(next);
    }
    //Todo: [DELETE] / courses/_id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => {
                // res.redirect('/me/stored/courses')
                res.redirect('back');
            })
            .catch(next);
    }
    //Todo: [DELETE] /courses/_id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => {
                // res.redirect('/me/stored/courses')
                res.redirect('back');
            })
            .catch(next);
    }
    //Todo: [PATCH] / courses/_id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //Todo: [DELETE] /courses/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                //! Xóa cả LIST
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.send('Action invalid');
                break;
        }
    }
    //Todo: [DELETE] /courses/handle-form-delete
    handleFormDelete(req, res, next) {
        Course.deleteMany({ _id: { $in: req.body.courseIds } })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //Todo: [PATCH] /courses/handle-form-restore
    handleFormRestore(req, res, next) {
        Course.restore({ _id: { $in: req.body.courseIds } })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new CoursesController();
