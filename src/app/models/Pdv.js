import mongoose from 'mongoose';
import uuid from 'node-uuid';

const PdvSchema = new mongoose.Schema({
  id: { type: String, required: true, default: uuid.v1 },
  tradingName: { type: String, required: true },
  ownerName: { type: String, required: true },
  document: { type: String, required: true },
});

export default mongoose.model('Pdv', PdvSchema);
