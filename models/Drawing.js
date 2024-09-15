const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'line', 'rect', 'circle', 'polygon', 'text'
  points: { type: [Number] }, // [x1, y1] for starting points of shapes
  text: { type: String }, // Only for text shapes
  color: { type: String, default: 'black' }, // Color of the shape
  width: { type: Number }, // Width for rectangles
  height: { type: Number }, // Height for rectangles
  radius: { type: Number }, // Radius for circles
});

const drawingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shapes: [shapeSchema], // Array of shapes in the drawing
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Drawing', drawingSchema);
