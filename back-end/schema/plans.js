import Sequelize from 'sequelize';
import database from '../db';

const Plans = database.define('plan', {
    ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    GYM_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            },
        }
    },
    PLANS_NAME: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            },
        }
    },
    PLAN_VALOR: {
        type: Sequelize.STRING(45),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            },
        }
    },
    PLAN_KUBUN: {
        type: Sequelize.STRING(45),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            },
        }
    },
    PLAN_DISCRITION1: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            },
        }
    },
    PLAN_DISCRITION2: {
        type: Sequelize.STRING(150),
    },
    PLAN_DISCRITION3: {
        type: Sequelize.STRING(150),
    },
    PLAN_DISCRITION4: {
        type: Sequelize.STRING(150),
    },
    PLAN_DISCRITION5: {
        type: Sequelize.STRING(150),
    },
    CONTROL_NAME: {
        type: Sequelize.STRING(150),
    },
    AGE: {
        type: Sequelize.STRING(45),
    },
});

export default Plans;
