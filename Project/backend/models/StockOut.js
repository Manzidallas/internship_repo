const mongoose = require('mongoose');

const StockOutSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('StockOut', StockOutSchema);
