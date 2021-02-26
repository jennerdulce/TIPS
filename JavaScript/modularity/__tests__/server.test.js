// you typically want to (name).test.js to be the same name of the file that you would like to test

const supertest = require('supertest')
const server = require('../server.js')

// request just brings in all routes with the app. the app through its app property
const request = supertest(server.app)

// describe = test suite
// it = actual test youre running
// expect - assertions/projected outcome

describe('Check Server', () => {
  it('error handler works', async () => {
    const respond = await request.get('/route');
    expect(response.status).toEqual(404)
  })
})

// ===============================================
// # TIPS
// - red green refactor
// - write tests before writing code
// - write test to dictate passing code, prevents modifying code to pass test
// - programming sphere vs wiring engineering sphere