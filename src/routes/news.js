const express = require('express');
const router = express.Router();
//? Import NewsController.js
const newsController = require('../app/controllers/NewsController');
//! List các đương dẫn từ cụ thể đến khái quát để bắt nó duyệt từ những đường chi tiết trước
//? '/news/detail'
router.get('/:slug', newsController.show);
//? '/news'
router.get('/', newsController.index);

module.exports = router;
