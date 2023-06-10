'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChamCongTheoNgay', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Thang:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      Ngay:{
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      GioVao:{
        type:Sequelize.TIME,
        allowNull: false
      },
      GioRa:{
        type:Sequelize.TIME,
        allowNull: false
      },
      GioLam:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      idChamCong:{
        type: Sequelize.INTEGER,
        references:{
          model:'ChamCong',
          key:'id'
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
    await queryInterface.dropTable('ChamCongTheoNgay');
  }
};