import mongoose from 'mongoose';
import uuid from 'node-uuid';
import PointSchema from './utils/PointSchema';
import MultiPolygonSchema from './utils/MultiPolygonSchema';

const PdvSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: uuid.v1,
  },
  tradingName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
  coverageArea: {
    type: MultiPolygonSchema,
    index: '2dsphere',
  },
  address: {
    type: PointSchema,
    index: '2dsphere',
  },
});

export default mongoose.model('Pdv', PdvSchema);
