import mongoose from 'mongoose';
import uuid from 'node-uuid';

const PdvSchema = new mongoose.Schema({
  id: { type: String, default: uuid.v1 },
  tradingName: String,
  ownerName: String,
  document: String,
});

export default mongoose.model('Pdv', PdvSchema);
