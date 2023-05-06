const comments = require('../models/commentModel')
const { ObjectId } = require('mongodb')
const asyncHandler = require('express-async-handler')

const saveNewComment = asyncHandler(async (req, res) => {
    try {
        const newComment = await comments.create(req.body)
        res.status(201).json('Comment saved')
    } catch (err) {
        res.status(400)
        throw new Error('Error occurred while saving comment')
    }
})

const getCommentsOfArticle = asyncHandler(async (req, res) => {
    const article_id = new ObjectId(req.params.id)
    try {
        const articleComments = await comments.find({article_id:article_id}).sort({createdAt:-1})
        res.status(201).json(articleComments)
    } catch (err) {
        res.status(400)
        throw new Error('Error occurred while fetching comments')
    }
})

const deleteComment = asyncHandler(async (req, res)=>{
    const id = req.params.id
    try {
        const articleComment = await comments.findByIdAndDelete(id)
        res.status(201).json('Comment Deleted')
    } catch (err) {
        res.status(400)
        throw new Error('Error occurred while deleting article')
    }
})

module.exports = {
    saveNewComment,
    getCommentsOfArticle,
    deleteComment
}