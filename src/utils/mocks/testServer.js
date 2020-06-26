const express = require('express')
const supertest = require('supertest')
const app = express()

function testServer(route) {
  app.use(express.json())
  route(app)
  return supertest(app)
}

module.exports = testServer
