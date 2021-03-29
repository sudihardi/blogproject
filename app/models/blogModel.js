const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    blogName: {
     type: String,
     required: true
    },
    blogDescription: String,
    blogDate: {
        type: Date, default: Date.now
    },
    mostView: {
        type: Number, default: 0
    }
});

module.exports = mongoose.model('Blog', BlogSchema);