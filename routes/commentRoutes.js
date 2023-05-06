const express = require('express')
const authorize = require('../middlewares/authMiddleware')
const { saveNewComment, getCommentsOfArticle, deleteComment } = require('../controllers/commentCotroller')

const router = express.Router()

router.route('/save').post(authorize, saveNewComment)
router.route('/get/:id').get(authorize, getCommentsOfArticle)
router.route('/delete/:id').delete(authorize, deleteComment)

module.exports = router