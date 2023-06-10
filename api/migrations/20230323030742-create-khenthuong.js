'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KhenThuong', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaKT:{
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      SoQD: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      NgayQD: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      TieuDe: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      NoiDung:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      Thang:{
        type: Sequelize.STRING(5),
        allowNull: false
      },
      TienThuong:{
        type: Sequelize.STRING(20),
        allowNull: false
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
    await queryInterface.dropTable('KhenThuong');
  }
};