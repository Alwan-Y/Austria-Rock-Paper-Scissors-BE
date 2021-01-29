import { Model } from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
    }
  }

  Feedback.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Feedback',
  })

  return Feedback;
}
