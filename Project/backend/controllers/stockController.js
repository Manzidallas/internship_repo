const StockIn = require('../models/StockIn');
const StockOut = require('../models/StockOut');
const Product = require('../models/Product');

exports.stockIn = async (req, res) => {
  const { product_id, quantity } = req.body;
  await StockIn.create({ product_id, quantity });
  res.json({ message: 'Stock added' });
};

exports.stockOut = async (req, res) => {
  const { product_id, quantity } = req.body;
  await StockOut.create({ product_id, quantity });
  res.json({ message: 'Stock removed' });
};

exports.getReport = async (req, res) => {
  const products = await Product.find();
  const report = [];

  for (const product of products) {
    const inSum = await StockIn.aggregate([
      { $match: { product_id: product._id } },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]);

    const outSum = await StockOut.aggregate([
      { $match: { product_id: product._id } },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]);

    const totalIn = inSum[0]?.total || 0;
    const totalOut = outSum[0]?.total || 0;

    report.push({
      product_name: product.product_name,
      stock_remaining: totalIn - totalOut
    });
  }

  res.json(report);
};
