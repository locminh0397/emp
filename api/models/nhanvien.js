'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhanVien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NhanVien.belongsToMany(models.ChucVu,{
        through: 'NhanVienChucVu',
        as:'chucvu',
        foreignKey: 'idNhanVien'
      });
      NhanVien.belongsToMany(models.ThongBao,{
        through: 'NhanVienThongBao',
        as:'thongbao',
        foreignKey: 'idNhanVien'
      });
      NhanVien.belongsTo(models.PhongBan,{
        foreignKey:'idPhongBan'
      });
      NhanVien.hasMany(models.HopDong,{
        foreignKey: 'idNhanVien'
      });
      NhanVien.hasMany(models.BangCap,{
        foreignKey:'idNhanVien'
      });
      NhanVien.hasMany(models.BaoHiem,{
        foreignKey: 'idNhanVien'
      })
      NhanVien.belongsToMany(models.KhenThuong,{
        through: 'NhanVienKhenThuong',
        as:'khenthuong',
        foreignKey: 'idNhanVien'
      });
      NhanVien.belongsToMany(models.KyLuat,{
        through: 'NhanVienKyLuat',
        as:'kyluat',
        foreignKey: 'idNhanVien'
      });
      NhanVien.hasMany(models.PhanCong,{
        foreignKey: 'idNhanVien'
      })
      NhanVien.hasMany(models.ChamCong,{
        foreignKey:'idNhanVien'
      })
    }
  }
  NhanVien.init({
    HoTen:{
      type: DataTypes.STRING,
      allowNull: false
    },
    NgaySinh:{
      type:DataTypes.STRING,
      allowNull:false
    },
    Email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    GioiTinh:{
      type: DataTypes.STRING,
      allowNull: false
    },
    HonNhan:{
      type:DataTypes.STRING(50),
      allowNull: false
    },
    DanToc:{
      type:DataTypes.STRING(50),
      allowNull: false
    },
    QuocTich:{
      type:DataTypes.STRING(50),
      allowNull: false
    },
    TonGiao:{
      type:DataTypes.STRING(50),
      allowNull: false
    },
    GioiTinh:{
      type: DataTypes.STRING,
      allowNull: false
    },
    SoDT: {
      type: DataTypes.STRING,
      allowNull: false
    },
    QueQuan:{
      type: DataTypes.STRING(60),
      allowNull: false
    },
    NoiO:{
      type: DataTypes.STRING(60),
      allowNull: false
    },
    HoKhau:{
      type: DataTypes.STRING(60),
      allowNull: false
    },
    CCCD:{
      type:DataTypes.STRING,
      allowNull: false
    },
    NgayCap:{
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    NoiCap: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    TinhTrang:{
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue:"Đang Làm Việc"
    },
    HinhAnh:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "public/assets/avatar.jpg"
    },
    isAdmin:{
      type: DataTypes.BOOLEAN,
      defaultValue:"0"
    },
    idPhongBan:{
      type: DataTypes.INTEGER,
      references:{
        model:"PhongBan",
        key:"id"
      },
      onDelete:'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, { 
    sequelize,
    modelName: 'NhanVien',
    tableName:'nhanvien'
  });
  return NhanVien;
};