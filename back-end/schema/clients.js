const Sequelize = require('sequelize');
const database = require('../db');

const Clients = database.define('client', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    gymName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field cannot be empty."
            },
        }
    },

    representative: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field cannot be empty."
            },
        }
    },

    uniqueCode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    address: {
        type: Sequelize.STRING,
        allowNull: false
    },

    tel: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    saveDay: {
        type: Sequelize.STRING,
        allowNull: false
    },

    status: {
        type: Sequelize.STRING,
        allowNull: false
    },

    language: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Clients;
