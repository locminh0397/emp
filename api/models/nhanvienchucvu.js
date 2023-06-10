'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhanVienChucVu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  NhanVienChucVu.init({
    idNhanVien: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    idChucVu: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    NgayBatDau: {
      type: DataTypes.DATEONLY
    },
    NgayKetThuc: {
      type: DataTypes.DATEONLY
    },
  }, {
    sequelize,
    modelName: 'NhanVienChucVu',
    tableName:'nhanvienchucvu'
  });
  return NhanVienChucVu;
};