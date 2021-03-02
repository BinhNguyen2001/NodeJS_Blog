//? File này chứa những trang chung: Home, Search, Contact,...
const express = require('express');
const router = express.Router();
//? Import SiteController.js
const siteController = require('../app/controllers/SiteController');
//? '/search'
router.get('/search', siteController.search);
router.post('/search', siteController._search);
//? '/'
router.get('/', siteController.index);
module.exports = router;
