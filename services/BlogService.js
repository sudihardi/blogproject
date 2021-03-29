const Blog = require('../app/models/blogModel.js');

exports.getAll = () =>{
    const getData = Blog.find()
    return getData
}

exports.getPopuler = () => {
    const getDataPopuler = Blog.find().sort({'-mostView': -1})
    return getDataPopuler
}
    