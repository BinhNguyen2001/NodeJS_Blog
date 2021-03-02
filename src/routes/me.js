const express = require('express');
const router = express.Router();
//? Import NewsController.js
const meController = require('../app/controllers/MeController');
//! List các đương dẫn từ cụ thể đến khái quát để bắt nó duyệt từ những đường chi tiết trước

router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);
module.exports = router;
