const request = require('supertest')
const app = require("./index");

//TODO: Test Error Troubleshoot!
describe('Testing Message Save Endpoint', () => {
    test('Should Return the Message', async () => {
        const res = request(app).post('/message/save').send({"userId": "Nirmith Akash", "message": "Test Message!"})
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual("Test Message!")
    })
})