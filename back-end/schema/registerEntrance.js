import Sequelize from 'sequelize';
import database from '../db';

const Entrance = database.define('entrance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    LESSON_NAME: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            },
        }
    },

    LESSON_HOUR: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            },
        }
    },

    MEMBER_ID: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            },
        }
    },
    
    GYM_ID: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    
    LESSON_DAY: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },

    LESSON_DATE: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
});

export default Entrance;
