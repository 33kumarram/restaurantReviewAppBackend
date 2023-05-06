const asyncHandler = require('express-async-handler')
const articles = require('../models/articleModel')
const { ObjectId } = require('mongodb')

const saveArticle = asyncHandler(async (req, res) => {
    try {
        const article = await articles.create(req.body)
        res.status(201).json('Article saved successfully')
    } catch (err) {
        res.status(400)
        throw new Error('Error occurred while saving article details')
    }
})

// find articles as per category
const getArticles = asyncHandler(async (req, res) => {
    const category = req.params.category
    let filter_str = category !== 'All' ? { category: category } : {}
    try {
        const all_articles = await articles.find(filter_str).populate('user', 'name _id')
        res.status(201).json(all_articles)
    } catch (err) {
        res.status(400)
        throw new Error('Error occurred while fetching articles')
    }
})

// find specific article and aggregate user and comments with it
const getArticleById = asyncHandler(async (req, res) => {
    const id = new ObjectId(req.params.id)
    try {
        const article = await articles.aggregate([
            {
                '$match': { '_id': id }
            },
            {
                '$lookup': {
                    'from': 'comments',
                    'localField': '_id',
                    'foreignField': 'article_id',
                    'as': 'comments',
                    'pipeline': [{ '$sort': { 'createdAt': -1 } }]
                }
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user',
                    'foreignField': '_id',
                    'as': 'user',
                }
            },
            {
                '$project':{
                    'user':{
                        'createdAt':0,
                        'updatedAt':0,
                        'password':0
                    }
                }
            },
            { $unwind: "$user" }
        ])
        res.status(201).json(article)
    } catch (err) {
        res.status(400)
        throw new Error('Error occurred while fetching article')
    }
})

const updateArticle = asyncHandler(async (req, res) => {
    const id = req.params.id
    let data = req.body
    const article = await articles.findById(id)
    if (!article) {
        res.status(400)
        throw new Error('Article not found')
    }
    try {
        const article = await articles.findByIdAndUpdate(id, { title: data.title, description: data.description, cover_img: data.cover_img })
        res.status(201).json('Article updated successfully')
    } catch (err) {
        res.status(400)
        throw new Error('Error occurred while updating article')
    }
})

const deleteArticle = asyncHandler(async (req, res) => {
    const id = req.params.id
    const article = await articles.findById(id)
    if (!article) {
        res.status(400)
        throw new Error('Article not found')
    }
    try {
        const article = await articles.findByIdAndDelete(id)
        res.status(201).json('Article deleted')
    } catch (err) {
        res.status(400)
        throw new Error('Error occurred while deleting article')
    }
})

module.exports = {
    saveArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
}