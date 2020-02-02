import mongoose from 'mongoose';

const PdvSchema = new mongoose.Schema({
  tradingName: String,
  ownerName: String,
  document: String,
});

export default mongoose.model('Pdv', PdvSchema);
