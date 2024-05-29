const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Notification = sequelize.define('Notification', {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false
  });

  return Notification;
};
