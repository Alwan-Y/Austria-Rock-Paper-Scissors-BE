import { Model } from 'sequelize'

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
        }
    }

    User.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }, {
    sequelize,
    modelName: 'User',
    })

    return User;
}
