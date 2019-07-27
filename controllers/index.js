const express = require('express');
const models = require('../models/').models;
const router = express.Router();

router.route('/').get(models.homePage);
router.route('/saved').post(models.saveArticle);
router.route('/saveNote').post(models.saveNote);
router.route('/checkNote').post(models.checkNote);
router.route('/scrape').get(models.scrapeArticles);


module.exports = router;

