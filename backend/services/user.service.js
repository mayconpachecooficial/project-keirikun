const Users = require('../schema/user.schema')

const userService = {
    create: async (user) => {
        return await Users.create(user)
    },

    getByUsername: async (username) => {
        return await Users.findOne({
            where: { username }
        })
    },

    getByEmail: async (email) => {
        return await Users.findOne({
            where: { email }
        })
    }
}

module.exports = userService