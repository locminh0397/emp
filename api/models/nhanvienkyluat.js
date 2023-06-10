'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhanVienKyLuat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NhanVienKyLuat.init({
    idNhanVien: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    idKyLuat: {
      type: DataTypes.INTEGER,
      references: {
        model: 'KyLuat',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    NgayTao: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'NhanVienKyLuat',
    tableName:'nhanvienkyluat'
  });
  return NhanVienKyLuat;
};