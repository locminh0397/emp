'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HopDong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HopDong.belongsTo(models.NhanVien,{
        foreignKey:'idNhanVien',
      })
    }
  }
  HopDong.init({
    idDaiDien:{
      type:DataTypes.INTEGER,
      allowNull: false
    },
    MaHD:{
      type: DataTypes.STRING(20),
      allowNull: false
    },
    TenHD:{
      type: DataTypes.STRING(30),
      allowNull: false
    },
    LoaiHD: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ThoiHan: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    LuongCoBan: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    HeSoLuong:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    CachTra: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    VaoNgay: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    NoiDung:{
      type: DataTypes.TEXT,
    },
    idNhanVien:{
      type: DataTypes.INTEGER,
      references:{
        model: 'NhanVien',
        key:'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }

  }, {
    sequelize,
    modelName: 'HopDong',
    tableName:'hopdong'
  });
  return HopDong;
};