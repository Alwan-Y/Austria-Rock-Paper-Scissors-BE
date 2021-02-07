module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('History', [
      {
        id: '5041f349-ef85-4078-856d-d821fca998ed',
        round: 1,
        playerOneChoice: 'rock',
        playerTwoChoice: 'paper',
        result: 'beta Win',
        roomId: 'c4cb353b-0f1e-455b-b634-562a6d39bc90',
      },
      {
        id: '8c8ba6db-f07b-4b51-94b0-e7a3dd119a5a',
        round: 2,
        playerOneChoice: 'rock',
        playerTwoChoice: 'paper',
        result: 'charlie Win',
        roomId: '61dfc472-f3c2-4c99-a40f-b190cef9a8b6',
      },
      {
        id: 'f902d5ad-bee4-4975-8799-f7ecbd4ab98c',
        round: 3,
        playerOneChoice: 'rock',
        playerTwoChoice: 'rock',
        result: 'DRAW',
        roomId: '17d8679f-b7ad-429b-9a87-d8a5925c4e32',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('History', null, {});
  },
}
