import { Model } from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      const { History } = models

      Room.hasMany(History, { foreignKey: 'roomId' })
      Room.hasMany(History, { foreignKey: 'playerOne' })
      Room.hasMany(History, { foreignKey: 'playerTwo' })
    }
  }

  Room.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    playerOneUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    playerTwoUsername: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Room',
  })

  return Room;
}
