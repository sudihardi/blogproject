const Blog = require('../models/blogModel.js');
const BlogService = require('../../services/BlogService.js')

// Create and save a new Blog
exports.create = async (req, res) => {

    // Validate request because in the model we required the blogName
    if(!req.body.blogName) {
        return res.status(400).send({
            message: "Please enter blog name!"
        })
    }

    // create a blog
    try {
        const blog = await new Blog({
        blogName: req.body.blogName,
        blogDescription: req.body.blogDescription
    });
    return res.status(200).send(blog)
    } catch (error) {
        res.status(500).send({
            message: err.message || "Some error occured while creating the Blog."
        })
    }
    

}

// Get Home
exports.getHome = async (req, res) => {
    try {
        let promise = await getInParallel([() => Promise.resolve(BlogService.getAll()),
                            () => Promise.resolve(BlogService.getPopuler())])
                            if(promise) {
                                return res.status(200).send(promise)
                            }
    } catch (error) {
        console.log(error);
    }}
function getInParallel(apiCalls) {
  let parallel = apiCalls.map((funct) => {
    return funct()
  })
  return Promise.all(parallel).then((res) => {
    return res
  })
}


// Get all Populer
exports.getPopuler = async (req, res) => {
   try {
       const getPopuler = await BlogService.getPopuler()
       if(getPopuler) {
            return res.status(200).send(getPopuler)
        } else {
             return res.status(404).send("Data is not found")
        }
   } catch (error) {
       return res.status(404).send("Data is not found")
   }
}

// Get all Blogs
exports.getAll = async (req, res) => {
   try {
       const getBlog = await BlogService.getAll()
       if(getBlog) {
            return res.status(200).send(getBlog)
        } else {
             return res.status(404).send("Data is not found")
        }
   } catch (error) {
       return res.status(404).send("Data is not found")
   }
}

// Get A single Blog
exports.getById = async (req, res) => {

    try {
        const updateData = await Blog.findByIdAndUpdate({_id: req.params.blogId}, {$inc: {
        mostView: 1}
        }, {new: true})
        
        if(updateData) {
            
            return res.status(200).send(updateData)
        } else {
             return res.status(404).send("Data is not found")
        }
    } catch (error) {
        return res.status(404).send("Data is not found")
    }
}

// Update a Blog by the blogId
exports.update = async (req, res) => {

// Validate request because in the model we required the blogName
if(!req.body.blogName) {
    return res.status(400).send({
        message: "Please enter blog name!"
    })
}

// Find blog and update it
try {
    const findData = await Blog.findOneAndUpdate(req.params.blogId, {
    blogName: req.body.blogName,
    blogDescription: req.body.blogDescription
}, {new: true})
return res.status(200).send(findData)
} catch (error) {
    return res.status(404).send({
            message: "Blog does not exist with blogId" + req.params.blogId
        })
}
}

// Deleting the Blog

exports.delete = async (req, res) => {
try {
    await Blog.findOneAndDelete(req.params.blogId)
    return res.status(200).send("Blog has been deleted successfully!")
} catch (error) {
    return res.status(404).send({
            message: "Blog not exist with blogId" + req.params.blogId
        })
}
}