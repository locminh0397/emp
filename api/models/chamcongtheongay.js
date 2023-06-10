'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChamCongTheoNgay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChamCongTheoNgay.belongsTo(models.ChamCong,{
        foreignKey:'idChamCong'
      })
    }
  }
  ChamCongTheoNgay.init({
    Thang:{
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Ngay:{
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    GioVao:{
      type:DataTypes.TIME,
      allowNull: false
    },
    GioRa:{
      type:DataTypes.TIME,
      allowNull: false
    },
    GioLam:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    idChamCong:{
      type: DataTypes.INTEGER,
      references:{
        model:'ChamCong',
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'ChamCongTheoNgay',
    tableName:'chamcongtheongay'
  });
  return ChamCongTheoNgay;
};