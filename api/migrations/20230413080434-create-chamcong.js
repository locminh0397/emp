'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChamCong', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Thang: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      NgayBatDau:{
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      NgayKetThuc:{
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      TongGioLam: {
        type: Sequelize.STRING(20),
      },
      TongNgayLam:{
        type: Sequelize.STRING(20),
      },
      idNhanVien: {
        type: Sequelize.INTEGER,
        references: {
          model: 'NhanVien',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('ChamCong');
  }
};