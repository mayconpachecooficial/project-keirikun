import { DataTypes, Model } from 'sequelize';
import database from '../db';

class Inventory extends Model {}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      unique: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    cust: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.STRING(45),
      unique: false,
    },
    category: {
      type: DataTypes.STRING(45),
      unique: false,
    },
    mercado: {
      type: DataTypes.STRING(45),
      unique: false,
    },
    kijun: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tani: {
      type: DataTypes.STRING(45),
      unique: false
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: database,
    modelName: 'inventory'
  }
);

export default Inventory;
