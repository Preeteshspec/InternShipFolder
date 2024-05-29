const { Bid, Item } = require('../models');
const { io } = require('../services/socket');

exports.getBids = async (req, res) => {
  try {
    const bids = await Bid.findAll({ where: { item_id: req.params.itemId } });
    res.json({ bids });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.placeBid = async (req, res) => {
  const { itemId } = req.params;
  const { bid_amount } = req.body;
  try {
    const item = await Item.findByPk(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (bid_amount <= item.current_price) {
      return res.status(400).json({ message: 'Bid amount must be higher than the current price' });
    }

    const bid = await Bid.create({
      item_id: itemId,
      user_id: req.user.id,
      bid_amount
    });

    await item.update({ current_price: bid_amount });

    io.emit('update', { itemId, current_price: bid_amount });
    res.status(201).json({ bid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
