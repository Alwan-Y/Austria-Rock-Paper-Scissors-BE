module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Feedback', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
      },
      feedback: {
        type: Sequelize.TEXT,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Feedback');
  },
}
