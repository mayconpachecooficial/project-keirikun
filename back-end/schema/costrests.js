import Sequelize from 'sequelize';
import database from '../db';
import mSuppliers from './m_suppliers';
import costCategory from './costCategory';

const Costrests = database.define('costrest', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  rest_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Esse campo não pode estar vazio."
      },
    }
  },
  worker_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Esse campo não pode estar vazio."
      },
    }
  },
  cost_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Esse campo não pode estar vazio."
      },
    }
  },
  amount: {
    type: Sequelize.DECIMAL(15, 2),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Esse campo não pode estar vazio."
      },
    }
  },
  payday: {
    type: Sequelize.DATE,
    validate: {
      notEmpty: {
        msg: "Esse campo não pode estar vazio."
      },
    }
  },
  memo: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  paykubun: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Esse campo não pode estar vazio."
      },
    }
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Esse campo não pode estar vazio."
      },
    }
  },
  seq: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Esse campo não pode estar vazio."
      },
    }
  },
  suppliers_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  checked_kubun: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  category: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

Costrests.belongsTo(mSuppliers, { foreignKey: 'suppliers_id', as: 'supplier' });
Costrests.belongsTo(costCategory, {
  foreignKey: 'cost_id',
  as: 'kamokus',
  targetKey: 'control_id',
});

export default Costrests;
