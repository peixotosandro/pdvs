import mongoose from 'mongoose';

const MultiPolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['MultiPolygon'],
    required: true,
  },
  coordinates: {
    type: [[[[Number]]]],
    required: true,
  },
});

export default MultiPolygonSchema;
