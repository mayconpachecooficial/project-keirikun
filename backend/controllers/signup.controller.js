const signupDto = require('../dto/signup.dto')
const userService = require('../services/user.service')

const signupController = {
    signup: async (request, response) => {
        try {
            const { error, value: payload } = signupDto.validate(request.body)

            if (error) {
                return response.status(400).send({ success: false, error : error.details })
            }

            const [userByEmail, userByUsername] = await Promise.all([
                userService.getByEmail(payload.email),
                userService.getByUsername(payload.username)
            ])

            if (userByEmail) {
                return response.status(409).send({ success: false, message: 'Email already exist.'})
            }

            if (userByUsername) {
                return response.status(409).send({ success: false, message: 'Username already exist.'})
            }

            await userService.create(payload)

            return response.status(201).send({ success: true, message: 'User created.'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error.'})
        }
    }
}

module.exports = signupController
