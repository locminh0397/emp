'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KyLuat', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaKL:{
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false
      },
      SoQD: {
        type: Sequelize.STRING(10),
        unique: true,
        allowNull: false
      },
      NgayQD: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      TieuDe: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      NoiDung:{
        type:Sequelize.TEXT,
        allowNull: false
      },
      Thang: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      TienPhat: {
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
    await queryInterface.dropTable('KyLuat');
  }
};