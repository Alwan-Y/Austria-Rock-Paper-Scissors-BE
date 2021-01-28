import { Model } from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {

    }
  }

  Room.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstPlayer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondPlayer: {
      type: DataTypes.STRING,
    },
    firstPlayerChoice: {
      type: DataTypes.STRING,
    },
    secondPlayerChoice: {
      type: DataTypes.STRING,
    },
    result: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Room',
  })

  return Room;
}
