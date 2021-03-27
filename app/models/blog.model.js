const MongoClient = require('mongodb').MongoClient;

const blogSchema = MongoClient.Schema({
    blogName: {
        type: String,
        required: true,
    },
    blogDescription: {
        type: String,
        required: true,
    }, 
    timestamps: true
})

module.exports = MongoClient.model('Blog', blogSchema)