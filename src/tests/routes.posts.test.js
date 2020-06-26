const assert = require('assert')
const testServer = require('../utils/mocks/testServer')
let postsRouter
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const postsfixtures = require('../utils/mocks/postsfixtures')
let request
let postId = postsfixtures.all[0]._id
let newPost = postsfixtures.all[0]
class postsServiceMock {}

beforeEach(() => {
  sandbox = sinon.createSandbox()

  //Stubs
  postsServiceMock.prototype.getAllPosts = sandbox.stub()
  postsServiceMock.prototype.getAllPosts.returns(postsfixtures.all)

  postsServiceMock.prototype.getPostById = sandbox.stub()
  postsServiceMock.prototype.getPostById
    .withArgs(postId)
    .returns(postsfixtures.byId(postId))

  postsServiceMock.prototype.createPost = sandbox.stub()
  postsServiceMock.prototype.createPost
    .withArgs({
      content: newPost.content,
      title: newPost.title,
      author: newPost.author,
    })
    .returns(postsfixtures.all[0])

  postsServiceMock.prototype.updatePost = sandbox.stub()
  postsServiceMock.prototype.updatePost
    .withArgs(postId, {
      content: newPost.content,
      title: newPost.title,
      author: newPost.author,
    })
    .returns(postsfixtures.all[0])

  postsServiceMock.prototype.deletePostById = sandbox.stub()
  postsServiceMock.prototype.deletePostById
    .withArgs(postId)
    .returns(postsfixtures.all[0]._id)

  postsRouter = proxyquire('../routes/posts', {
    '../services/PostsService': postsServiceMock,
  })
  request = testServer(postsRouter)
})

describe('GET /api/posts', () => {
  it('should return 200 status code', (done) => {
    request.get('/api/posts').expect(200, done)
  })
  it('should call the getAll function', (done) => {
    request.get('/api/posts').end((err, res) => {
      assert.deepEqual(postsServiceMock.prototype.getAllPosts.called, true)
      done()
    })
  })
  it('should return all the posts', (done) => {
    request.get('/api/posts').end((err, res) => {
      assert.deepEqual(res.body.data, postsfixtures.all)
      done()
    })
  })
})

describe('GET /api/posts/:id', () => {
  it('should return 200 status code', (done) => {
    request.get(`/api/posts/${postId}`).expect(200, done)
  })
  it('should call the getAllPosts function', (done) => {
    request.get('/api/posts').end((err, res) => {
      assert.deepEqual(postsServiceMock.prototype.getAllPosts.called, true)
      done()
    })
  })
  it('should return one post', (done) => {
    request.get(`/api/posts/${postId}`).end((err, res) => {
      assert.deepEqual(res.body.data, postsfixtures.byId(postId))
      done()
    })
  })
})

describe('POST /api/posts/', () => {
  it('should return 201 status code', (done) => {
    request
      .post(`/api/posts`)
      .send({
        content: newPost.content,
        title: newPost.title,
        author: newPost.author,
      })
      .expect(201, done)
  })
  it('should call the getAllPosts function', (done) => {
    request
      .post('/api/posts')
      .send({
        content: newPost.content,
        title: newPost.title,
        author: newPost.author,
      })
      .end((err, res) => {
        assert.deepEqual(postsServiceMock.prototype.createPost.called, true)
        done()
      })
  })
  it('should return one post', (done) => {
    request
      .post(`/api/posts`)
      .send({
        content: newPost.content,
        title: newPost.title,
        author: newPost.author,
      })
      .end((err, res) => {
        assert.deepEqual(res.body.data, {
          id: newPost._id,
          title: newPost.title,
        })
        done()
      })
  })
})

describe('PUT /api/posts/:postId', () => {
  it('should return 200 status code', (done) => {
    request
      .put(`/api/posts/${postId}`)
      .send({
        content: newPost.content,
        title: newPost.title,
        author: newPost.author,
      })
      .expect(200, done)
  })
  it('should call the updatePost function', (done) => {
    request
      .put(`/api/posts/${postId}`)
      .send({
        content: newPost.content,
        title: newPost.title,
        author: newPost.author,
      })
      .end((err, res) => {
        assert.deepEqual(postsServiceMock.prototype.updatePost.called, true)
        done()
      })
  })
  it('should return the updated post', (done) => {
    request
      .put(`/api/posts/${postId}`)
      .send({
        content: newPost.content,
        title: newPost.title,
        author: newPost.author,
      })
      .end((err, res) => {
        assert.deepEqual(res.body.data, postsfixtures.all[0])
        done()
      })
  })
})

describe('DELETE /api/posts/:postId', () => {
  it('should return 200 status code', (done) => {
    request.put(`/api/posts/${postId}`).expect(200, done)
  })
  it('should call the deletePostById function', (done) => {
    request.delete(`/api/posts/${postId}`).end((err, res) => {
      assert.deepEqual(postsServiceMock.prototype.deletePostById.called, true)
      done()
    })
  })
  it('should return the deletd id post', (done) => {
    request.delete(`/api/posts/${postId}`).end((err, res) => {
      assert.deepEqual(res.body.data, postsfixtures.all[0]._id)
      done()
    })
  })
})
