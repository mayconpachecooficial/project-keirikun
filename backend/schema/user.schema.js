const sequelize = require('sequelize')
const { DataTypes } = require('sequelize')
const database = require('../registerDb')

const Users = database.define('users', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: sequelize.STRING(150),
        allowNull: false
    },

    email: {
        type: sequelize.STRING(150),
        allowNUll: false
    },

    password: {
        type: sequelize.STRING(150),
        allowNull: false 
    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
        allowNUll: false
    },

    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
        allowNull: false
    }
})

module.exports = Users