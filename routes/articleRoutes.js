const express = require('express')
const { saveArticle, getArticles, getArticleById, updateArticle, deleteArticle } = require('../controllers/articleController')
const authorize = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/:category').get(authorize, getArticles)
router.route('/getbyid/:id').get(authorize, getArticleById)
router.route('/save').post(authorize, saveArticle)
router.route('/update/:id').post(authorize, updateArticle)
router.route('/delete/:id').delete(authorize, deleteArticle)

module.exports = router