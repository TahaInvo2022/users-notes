'use strict';
const {
  Model
} = require('sequelize');
const { NOTE_TYPE } = require("../core/constant");
const noteType = Object.keys(NOTE_TYPE);
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.belongsTo(models.User, {
        foreignKey: "userId",
        as: "Author",
      });
    }
  }
  Note.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: true,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      type: {
        type: DataTypes.ENUM,
        values: noteType,
        allowNull: false,
        defaultValue: NOTE_TYPE.PERSONAL,
        set(value) {
          this.setDataValue("type", value?.toUpperCase());
        },
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Note",
      tableName: "notes",
    }
  );
  return Note;
};