import Sequelize from 'sequelize';
import database from '../db';

const Payment = database.define('payments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nm_member_id: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            }
        }
    },
    nm_member: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    year: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    month: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    division: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    obs: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    plan: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    plan_value: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    gym_id: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            }
        }
    }
});

export default Payment;
