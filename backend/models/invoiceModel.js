const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  // Add more fields as needed
});

module.exports = mongoose.model('Invoice', invoiceSchema);
