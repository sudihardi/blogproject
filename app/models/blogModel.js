const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    blogName: {
     type: String,
     required: true
    },
    blogDescription: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', BlogSchema);