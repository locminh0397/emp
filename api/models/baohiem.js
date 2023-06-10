'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BaoHiem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BaoHiem.belongsTo(models.NhanVien,{
        foreignKey:'idNhanVien'
      });
    }
  }
  BaoHiem.init({
    MaBH: {
      type: DataTypes.STRING(30),
      allowNull:false
    },
    NgayBD: {
      type: DataTypes.DATEONLY,
      allowNull: false,

    },
    MucDong:{
      type: DataTypes.STRING(30),
      allowNull: false
    },
    PhanTramLD:{
      type:DataTypes.STRING(10),
      allowNull:false
    },
    PhanTramCT:{
      type:DataTypes.STRING(10),
      allowNull:false
    },
    NhanVienDong:{
      type: DataTypes.STRING(20),
      allowNull: false
    },
    NguoiThucHien:{
      type:DataTypes.STRING,
      allowNull:false
    },
    TrangThai:{
      type:DataTypes.STRING(30),
      allowNull: false,
      defaultValue:'Còn hiệu lực'
    },
    GhiChu:{
      type: DataTypes.STRING,
    },
    idNhanVien:{
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'BaoHiem',
    tableName: 'baohiem'
  });
  return BaoHiem;
};