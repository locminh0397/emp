'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BaoHiem', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaBH: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      NgayBD: {
        type: Sequelize.DATEONLY,
        allowNull: false,

      },
      MucDong:{
        type: Sequelize.STRING(30),
        allowNull: false
      },
      PhanTramLD:{
        type:Sequelize.STRING(10),
        allowNull:false
      },
      PhanTramCT:{
        type:Sequelize.STRING(10),
        allowNull:false
      },
      NhanVienDong:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      TrangThai:{
        type:Sequelize.STRING(30),
        allowNull: false,
        defaultValue:'Còn hiệu lực'
      },
      GhiChu:{
        type: Sequelize.STRING,
      },
      NguoiThucHien:{
        type:Sequelize.STRING,
        allowNull:false
      }
      ,
      idNhanVien:{
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'NhanVien',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BaoHiem');
  }
};