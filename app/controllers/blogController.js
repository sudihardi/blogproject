const Blog = require('../models/blogModel.js');

// Create and save a new Blog
exports.create = (req, res) => {

    // Validate request because in the model we required the blogName
    if(!req.body.blogName) {
        return res.status(400).send({
            message: "Please enter blog name!"
        })
    }

    // create a blog
    const blog = new Blog({
        blogName: req.body.blogName,
        blogDescription: req.body.blogDescription
    });

    // Save Blog in the database
    blog.save()
    .then(oBlog => {
        res.send(oBlog);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the Blog."
        })
    })

}

// Get all Blogs
exports.getAll = (req, res) => {
    Blog.find()
        .then(oBlog => {
            res.send(oBlog);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving the blog."
            })
        })
}

// Get A single Blog
exports.getById = (req, res) => {
    Blog.findById(req.params.blogId)
        .then(oBlog => {
            if(oBlog) {
                res.send(oBlog)
            }
            return res.status(404).send({
                message: "Blog not exist with id" + req.params.blogId
            })
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Blog not exist with id" + req.params.blogId
                })
            }
            return res.status(500).send({
                message: "Error retrieving blog with id" + req.params.blogId
            })
        })
}

// Update a nlog by the blogId
exports.update = (req, res) => {

// Validate request because in the model we required the blogName
if(!req.body.blogName) {
    return res.status(400).send({
        message: "Please enter blog name!"
    })
}

// Find blog and update it
Blog.findByIdAndUpdate(req.params.blogId, {
    blogName: req.body.blogName,
    blogDescription: req.body.blogDescription
}, {new: true})
.then(oBlog => {
    if(oBlog) {
        res.send(oBlog);
    }
    return res.status(404).send({
        message: "Blog does not exist with blogId" + req.params.blogId
    })
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Blog does not exist with blogId" + req.params.blogId
        })
    }
    return res.status(500).send({
        message: "Some error occured while retrieving the blog with blogId" + req.params.blogId
    })
})

}

// Deleting the Blog

exports.delete = (req, res) => {
    Blog.findByIdAndRemove(req.params.blogId)
    .then(oBlog => {
        if(oBlog) {
            res.send({
                message: "Blog has been deleted successfully!"
            })
        }
        return res.status(404).send({
            message: "Blog not exist with blogId" + req.params.blogId
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Blog not exist with blogId" + req.params.blogId
            })
        }
        return res.status(500).send({
            message: "Some error occured while deleting the blog with blogId" + req.params.blogId
        })
    })
}