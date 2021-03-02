const express = require('express');
const router = express.Router();
//? Import NewsController.js
const coursesController = require('../app/controllers/CoursesController');
//! List các đương dẫn từ cụ thể đến khái quát để bắt nó duyệt từ những đường chi tiết trước
//? '/courses/create'
router.get('/create', coursesController.create);
//? '/courses/store'
router.post('/store', coursesController.store);
//? 'courses/_id/edit'
router.get('/:id/edit', coursesController.edit);
//? 'courses/handle-form-action'
router.delete('/handle-form-action', coursesController.handleFormAction);
//? 'courses/handle-form-delete'
router.delete('/handle-form-delete', coursesController.handleFormDelete);
//? 'courses/handle-form-restore'
router.patch('/handle-form-restore', coursesController.handleFormRestore);
//? 'courses/_id'
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id', coursesController.destroy);
router.delete('/:id/force', coursesController.forceDestroy);
//? '/courses/detail'
router.get('/:slug', coursesController.show);
//? '/courses'
router.get('/', coursesController.index);

module.exports = router;
