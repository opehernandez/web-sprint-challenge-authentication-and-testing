// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe('testing the register endpoint', ()=> {
  test('can register a user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: "hellothere" })
    expect(res.status).toBe(201)
  })
  test('responds with 400 on missing username or password', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ password: "hellothere" })
    expect(res.status).toBe(400)
  })
})
describe('testing the login endpoint', ()=> {
  test('can login', async () => {
    const create = await request(server)
      .post('/api/auth/register')
      .send({ username: 'testsubject', password: "password1" })
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'testsubject', password: "password1" })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe("Welcome back testsubject...")
  })
  test('responds with 401 on invalid credentials', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: "testuser", password: "invalidpassword" })
    expect(res.status).toBe(401)
  })
})
