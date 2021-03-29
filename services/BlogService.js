const Blog = require('../app/models/blogModel.js');

exports.getAll = () =>{
    const getData = Blog.find()
    return getData
}

// exports.getById = () =>{
//     const findData = Blog.findById(req.params.blogId)
//     return findData
// }

exports.getPopuler = () => {
    const getDataPopuler = Blog.find().sort({'-mostView': -1})
    return getDataPopuler
}
    