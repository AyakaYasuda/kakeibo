const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spendingSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  memo: { type: String, required: false },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
});

module.exports = mongoose.model('Spending', spendingSchema);
