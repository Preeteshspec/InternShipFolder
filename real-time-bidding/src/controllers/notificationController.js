const { Notification } = require('../models');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { user_id: req.user.id } });
    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { ids } = req.body;
    await Notification.update({ is_read: true }, { where: { id: ids, user_id: req.user.id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
