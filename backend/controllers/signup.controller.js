const userService = require("../services/user.service")

const signupController = {
    signup: async (request, response) => {
        try {
            const { name, email, password } = request.body

            if (!name) {
                return response.status(400).send({ success: false, message: 'Name is required.'})
            }

            if (!email) {
                return response.status(400).send({ success: false, message: 'Email is required.' })
            }

            if (!password) {
                return response.status(400).send({ success: false, message: 'Password is required.' })
            }


            await userService.create({name, email, password})

            return response.status(201).send({ success: true, message: 'User created'})

        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error.'})
        }
    }
}


module.exports = signupController
