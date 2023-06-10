'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KhenThuong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      KhenThuong.belongsToMany(models.NhanVien,{
        through: 'NhanVienKhenThuong',
        as: 'nhanvien',
        foreignKey: 'idKhenThuong'
      });
    }
  }
  KhenThuong.init({
    SoQD: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    MaKT:{
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    NgayQD: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    TieuDe: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    NoiDung:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    Thang:{
      type: DataTypes.STRING(5),
      allowNull: false
    },
    TienThuong:{
      type: DataTypes.STRING(20),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'KhenThuong',
    tableName:'khenthuong'
  });
  return KhenThuong;
};