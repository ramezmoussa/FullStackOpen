
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const mongoose = require('mongoose')
require('express-async-errors')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
  
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    
    const userID = response.user
    if (!userID) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
  
    const user = await User.findById(userID)
  
    const blog = new Blog(request.body)
    blog.user = user
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
    const id = mongoose.Types.ObjectId(request.params.id)

    const blog = await Blog.findById(id)
    if (!blog) {
        const error = new Error()
        error.name = 'IdDoesNotExist'
        error.message = `No Blog exists with id: ${id}`
        throw error
    }
    const userID = response.user
    if (!userID || userID !== blog.user.toString()) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }


    await Blog.findByIdAndRemove(id)
    response.status(204).end()
})
  


blogsRouter.put('/:id', async (request, response) => {
    const id = mongoose.Types.ObjectId(request.params.id)

    const result = await Blog.findOneAndUpdate({ _id: id }, request.body, { returnDocument: 'before', runValidators: true })
    if (!result) {
        const error = new Error()
        error.name = 'IdDoesNotExist'
        error.message = `No person exists with id: ${id}`
        throw error
    }


    return response.status(204).end()

})


blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter
