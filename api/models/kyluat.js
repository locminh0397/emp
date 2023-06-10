'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KyLuat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KyLuat.belongsToMany(models.NhanVien,{
        through: 'NhanVienKyLuat',
        as: 'nhanvien',
        foreignKey: 'idKyLuat'
      });
    }
  }
  KyLuat.init({
    SoQD: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false
    },
    MaKL:{
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false
    },
    NgayQD: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    TieuDe: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    NoiDung:{
      type:DataTypes.TEXT,
      allowNull: false
    },
    Thang: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    TienPhat: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
   
   
  }, {
    sequelize,
    modelName: 'KyLuat',
    tableName:'kyluat'
  });
  return KyLuat;
};