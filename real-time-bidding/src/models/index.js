const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const ItemModel = require('./item');
const BidModel = require('./bid');
const NotificationModel = require('./notification');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = UserModel(sequelize);
const Item = ItemModel(sequelize);
const Bid = BidModel(sequelize);
const Notification = NotificationModel(sequelize);

User.hasMany(Bid, { foreignKey: 'user_id' });
Bid.belongsTo(User, { foreignKey: 'user_id' });

Item.hasMany(Bid, { foreignKey: 'item_id' });
Bid.belongsTo(Item, { foreignKey: 'item_id' });

User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync({ alter: true });

module.exports = {
  User,
  Item,
  Bid,
  Notification,
  sequelize
};
