const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commenter_name: {
        type: String,
        require: true
    },
    comment_text: {
        type: String,
        require: true
    },
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    commenter_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
}, {
    timestamps: true
})

const comments = mongoose.model('comments', commentSchema)

module.exports = comments