import Sequelize from 'sequelize';
import database from '../db';

// Definição do modelo Calender
const Calender = database.define('calender', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ID da academia
    gymId: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            },
        }
    },

    // Dia
    day: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            },
        }
    },

    // Horário de início
    startTime: {
        type: Sequelize.STRING(150),
        allowNull: false
    },

    // Horário de término
    finishTime: {
        type: Sequelize.STRING(150),
        allowNull: false
    },

    // Número da linha
    lineNo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    // Descrição 1
    description1: {
        type: Sequelize.STRING(150),
        allowNull: false
    },

    // Descrição 2
    description2: {
        type: Sequelize.STRING(150),
        allowNull: false
    },

    // Imagem
    image: {
        type: Sequelize.STRING(150),
        allowNull: false
    },

    // Cor
    color: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    
    // Flag de graduação
    graduationFlag: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = Calender;
