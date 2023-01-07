const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialNotes = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    } 
]

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = initialNotes
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test('execise 4.8: blogs are returned as json with correct length', async () => {
    const response = await api.get('/api/blogs')
    expect(response.header['content-type']).toEqual('application/json; charset=utf-8')
    expect(response.body.length).toEqual(6)
})


test('execise 4.9: blogs have unique identity: id', () => {
    const post = new Blog({})
    expect(post.id).toBeDefined()
})

test('execise 4.10: verify that POST creates a new blog', async () => {

    let newBlog =     {
        title: 'test title',
        author: 'Ramez',
        url: 'http://somewhere.html',
        likes: 2,
    } 

    let response = await api.get('/api/blogs')
    let numberOfBlogs = response.body.length
    response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toEqual(201)

    response = await api.get('/api/blogs')
    expect(response.body.length).toEqual(numberOfBlogs+1)
})


test('execise 4.11: verify that POST creates a new blog with default likes equals 0 if not present', async () => {

    let newBlog = {
        title: 'test_post',
        author: 'Ramez',
        url: 'http://somewhere.html'
    }

    let response =  await api.post('/api/blogs').send(newBlog)
    expect(response.status).toEqual(201)

    response =  await api.get(`/api/blogs/${JSON.parse(response.text).id}`)
    expect(response.status).toEqual(200)
    expect(JSON.parse(response.text).likes).toEqual(0)
})



test('execise 4.12: verify that POST returns code 400 if title is missing', async () => {

    let newBlog = {
        author: 'Ramez',
        url: 'http://somewhere.html'
    }

    let response =  await api.post('/api/blogs').send(newBlog)
    expect(response.status).toEqual(400)
})

test('execise 4.12: verify that POST returns code 400 if url is missing', async () => {

    let newBlog = {
        author: 'Ramez',
        title: 'test title'
    }

    let response =  await api.post('/api/blogs').send(newBlog)
    expect(response.status).toEqual(400)
})


test('execise 4.13: verify that deleting returns code 204 when successful', async () => {

    let newBlog =     {
        title: 'test title',
        author: 'Ramez',
        url: 'http://somewhere.html',
        likes: 2,
    } 

    let postResponse = await api.post('/api/blogs').send(newBlog)
    expect( postResponse.status).toEqual(201)

    let response =  await api.delete(`/api/blogs/${JSON.parse(postResponse.text).id}`)
    expect(response.status).toEqual(204)
})

test('execise 4.13: verify that deleting returns code 404 when id doesnot exist', async () => {

    let newBlog =     {
        title: 'test title',
        author: 'Ramez',
        url: 'http://somewhere.html',
        likes: 2,
    } 

    let postResponse = await api.post('/api/blogs').send(newBlog)
    expect( postResponse.status).toEqual(201)

    let response =  await api.delete(`/api/blogs/${JSON.parse(postResponse.text).id}`)
    expect(response.status).toEqual(204)

    response =  await api.delete(`/api/blogs/${JSON.parse(postResponse.text).id}`)
    expect(response.status).toEqual(404)


})


test('execise 4.14: verify that POST creates a new blog', async () => {

    let newBlog = {
        title: 'test_post',
        author: 'Ramez',
        url: 'http://somewhere.html',
        likes: 25
    }

    let postResponse =  await api.post('/api/blogs').send(newBlog)
    expect(postResponse.status).toEqual(201)

    let response = await api.put(`/api/blogs/${JSON.parse(postResponse.text).id}`).send({likes: 5})
    expect(response.status).toEqual(204)

    response =  await api.get(`/api/blogs/${JSON.parse(postResponse.text).id}`)
    expect(response.status).toEqual(200)
    expect(JSON.parse(response.text).likes).toEqual(5)

})


afterAll(() => {
    mongoose.connection.close()
})
