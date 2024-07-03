import Sequelize from 'sequelize';
import database from '../db';

const Members = database.define('member', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nm_member: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            }
        }
    },
    birthday_year: Sequelize.DECIMAL,
    birthday_month: Sequelize.DECIMAL,
    birthday_day: Sequelize.DECIMAL,
    birthday_age: Sequelize.DECIMAL,
    genero: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    adress_input: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    phone01: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    phone02: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    phone03: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    lang01: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    plans: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    signature: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    pass: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    gym: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    gymid: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    active_date: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    inactive_date: {
        type: Sequelize.STRING(150),
        allowNull: false
    }
});

export default Members;
