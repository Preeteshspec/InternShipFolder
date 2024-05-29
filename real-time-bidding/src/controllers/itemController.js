const { Item } = require('../models');

exports.getItems = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const items = await Item.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [['created_at', 'DESC']]
    });
    res.json({
      totalItems: items.count,
      totalPages: Math.ceil(items.count / limit),
      currentPage: page,
      items: items.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createItem = async (req, res) => {
  const { name, description, starting_price, end_time } = req.body;
  const image_url = req.file?.path || null;
  try {
    const item = await Item.create({ name, description, starting_price, current_price: starting_price, image_url, end_time });
    res.status(201).json({ item });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const { name, description, starting_price, end_time } = req.body;
  const image_url = req.file?.path || null;
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (item.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await item.update({ name, description, starting_price, end_time, image_url });
    res.json({ item });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (item.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await item.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
