const { hash, compare, genSalt } = require('bcrypt')

const SALT_ROUNDS = 10

const encryptPassword = async(password) => {
    genSaltGenerated = await genSalt(SALT_ROUNDS)
    return await hash(password, genSaltGenerated)

}

const verifyPassword = async (password, encrypted) => {
    return await compare(password, encrypted)
}

module.exports = { encryptPassword, verifyPassword }