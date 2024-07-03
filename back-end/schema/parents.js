import Sequelize from 'sequelize';
import database from '../db';

const Parents = database.define('parent', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    family_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio."
            }
        }
    },
    birthday: Sequelize.STRING(150),
    birthday_age: Sequelize.STRING(150),
    gender: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    gymid: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    nm_member_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Parents;
