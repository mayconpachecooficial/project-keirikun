import Sequelize from 'sequelize';
import database from '../db';

const RestManagers = database.define('rest_manager', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    restId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    workStatus: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pickupTime: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cash: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    bank: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    uber: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    square: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    cash2: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    caixa: {
        type: Sequelize.STRING(150),
        allowNull: false,
    }
});

export default RestManagers;
