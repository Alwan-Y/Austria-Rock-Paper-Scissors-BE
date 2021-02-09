module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('User', [
      {
        id: '54572486-086b-4500-bdab-5fe5795f7050',
        email: 'ebisukuru@gmail.com ',
        username: 'ebisukuru',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {});
  }
};
