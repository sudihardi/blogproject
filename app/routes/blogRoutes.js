module.exports = (app) => {
    const blogs = require('../controllers/blogController.js');

    // create a new blog
    app.post('/blogs', blogs.create);

    // Get all Blogs
    app.get('/blogs', blogs.getAll);

    // Get a single Blog with blogId
    app.get('/blogs/:blogId', blogs.getById);

    // Update a Blog with blogId
    app.put('/blogs/:blogId', blogs.update);

    // Delete a blog with blogId
    app.delete('/blogs/:blogId', blogs.delete)
}