module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Room', [
      {
        id: 'c4cb353b-0f1e-455b-b634-562a6d39bc90',
        playerOneUsername: 'alpha',
        playerTwoUsername: 'beta',
      },
      {
        id: '61dfc472-f3c2-4c99-a40f-b190cef9a8b6',
        playerOneUsername: 'alpha',
        playerTwoUsername: 'charlie',
      },
      {
        id: '17d8679f-b7ad-429b-9a87-d8a5925c4e32',
        playerOneUsername: 'charlie',
        playerTwoUsername: 'beta',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Room', null, {});
  },
}
