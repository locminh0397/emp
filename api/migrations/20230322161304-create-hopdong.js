'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HopDong', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idDaiDien: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      MaHD: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      TenHD: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      LoaiHD: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      ThoiHan: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      LuongCoBan: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      HeSoLuong: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      CachTra: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      VaoNgay: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      NoiDung:{
        type: Sequelize.TEXT,
      },
      TrangThai:{
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue:'Còn hiệu lực'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HopDong');
  }
};
