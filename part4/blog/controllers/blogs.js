
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')
require('express-async-errors')



blogsRouter.get('/', async (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
    const id = mongoose.Types.ObjectId(request.params.id)

    const result = await Blog.findByIdAndRemove(id)

    if (!result) {
        const error = new Error()
        error.name = 'IdDoesNotExist'
        error.message = `No person exists with id: ${id}`
        throw error
    }


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
