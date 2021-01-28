module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Room', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      firstPlayer: {
        type: Sequelize.STRING,
      },
      secondPlayer: {
        type: Sequelize.STRING,
      },
      firstPlayerChoice: {
        type: Sequelize.STRING,
      },
      secondPlayerChoice: {
        type: Sequelize.STRING,
      },
      result: {
        type: Sequelize.STRING,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Room');
  },
}
