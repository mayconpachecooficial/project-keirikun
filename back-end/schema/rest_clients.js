import Sequelize from 'sequelize';
import database from '../db';

const RestClients = database.define('restClient', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            }
        }
    },
    phone: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            }
        }
    },
    address: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            }
        }
    },
    post: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            }
        }
    },
    password: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            }
        }
    }
});

export default RestClients;
