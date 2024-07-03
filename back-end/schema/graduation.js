import Sequelize from 'sequelize';
import database from '../db';

const Graduations = database.define('graduation', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nm_member: {
    type: Sequelize.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "Esse campo não pode estar vazio."
      }
    }
  },
  color: Sequelize.STRING(150),
  status: Sequelize.STRING(150),
  graduation_dt: Sequelize.STRING(150),
  first_point: Sequelize.STRING(150),
  second_point: Sequelize.STRING(150),
  third_point: Sequelize.STRING(150),
  fourth_point: Sequelize.STRING(150),
  lesson_after: Sequelize.STRING(150),
  obs: Sequelize.STRING(150),
  gym: Sequelize.STRING(150),
  nm_member_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  GYM_ID: Sequelize.STRING(150),
});

export default Graduations;
