module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Feedback', [
      {
        id: 'da111e54-3542-4f88-bee4-4c6707e7be29',
        username: 'alpha',
        feedback: 'Nice Play :D',
      },
      {
        id: '3510cc3f-b097-4a29-9eb0-27164f826512',
        username: 'beta',
        feedback: 'Exciting!',
      },
      {
        id: '11bc59ca-5428-4e27-8abc-8afe49a4e890',
        username: 'charlie',
        feedback: 'Challenging!',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Feedback', null, {});
  },
}
