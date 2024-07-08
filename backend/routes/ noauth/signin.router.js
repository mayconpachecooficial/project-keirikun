const { Router } = require('express')
const signinController = require('../../controllers/signin.controller')

const signinRouter = Router()

signinRouter.post('/signin', signinController.signin)

module.exports = signinRouter