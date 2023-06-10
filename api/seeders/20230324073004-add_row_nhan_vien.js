'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('NhanVien', [{
      HoTen: 'Nguyen Van A',
      Email: 'admin@gmail.com',
      NgaySinh: new Date('2002-10-03'),
      Password: '$2b$10$6QlHva425LZhTDGdPjuKd.TQ4a1LsC3iG40p9mFEOK5itMIMrkyW6',
      GioiTinh: 'Nam',
      HonNhan :'Độc thân',
      DanToc:'Kinh',
      QuocTich:'Việt Nam',
      TonGiao:'Không',
      SoDT: "0906345123",
      QueQuan:'Phường 14, Quận 7, Thành phố Hồ Chí Minh',
      NoiO:'Phường 14, Quận 7, Thành phố Hồ Chí Minh',
      HoKhau:'Phường 14, Quận 7, Thành phố Hồ Chí Minh',
      CCCD: "203123231341",
      NgayCap: new Date('2021-04-23'),
      NoiCap:'Thành phố Hồ Chí Minh',
      HinhAnh:'public/assets/avatar.jpg',
  
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },]
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('NhanVien', null, {});
  }
};
