const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Meetup model
class Rsvp extends Model {}

Rsvp.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false
      }
    },
    {
      hooks: {
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'rsvp'
    }
  );

module.exports = Rsvp;