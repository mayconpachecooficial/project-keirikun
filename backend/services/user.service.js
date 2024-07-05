const Users = require('../schema/user.schema')

const userService = {
    create: async (user) => {
        return await Users.create(user)
    }
}

module.exports = userService