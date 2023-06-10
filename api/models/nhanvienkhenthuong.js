'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhanVienKhenThuong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NhanVienKhenThuong.init({
    idNhanVien: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    idKhenThuong: {
      type: DataTypes.INTEGER,
      references: {
        model: 'KhenThuong',
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
    modelName: 'NhanVienKhenThuong',
    tableName: 'nhanvienkhenthuong'
  });
  return NhanVienKhenThuong;
};