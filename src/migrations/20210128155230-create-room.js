module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Room', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      firstPlayer: {
        type: Sequelize.STRING,
        onDelete: 'set null',
        references: {
          model: 'User',
          key: 'userName',
        },
      },
      secondPlayer: {
        type: Sequelize.STRING,
        onDelete: 'set null',
        references: {
          model: 'User',
          key: 'userName',
        },
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
