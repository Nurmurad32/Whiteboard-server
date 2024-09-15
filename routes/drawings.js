const express = require('express');
const drawingRoute = express.Router();
const Drawing = require('../models/Drawing');

drawingRoute.get('/a', (req,res) => {
  res.send("Drawing Route")
})

// POST: Create a new drawing
drawingRoute.post('/create', async (req, res) => {
  const { title, shapes } = req.body;
  console.log(title, shapes);
  const newDrawing = new Drawing({ title, shapes });
  try {
    await newDrawing.save();
    res.status(201).json({message:"success", data: newDrawing});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET: Get all drawings
drawingRoute.get('/all-drawing', async (req, res) => {
  try {
    const drawings = await Drawing.find();
    res.status(200).json(drawings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET: Get a drawing by ID
drawingRoute.get('/drawings/:id', async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id);
    if (!drawing) return res.status(404).json({ error: 'Drawing not found' });
    res.status(200).json(drawing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT: Update a drawing by ID
drawingRoute.put('/drawings/:id', async (req, res) => {
  const { title, shapes } = req.body;
  try {
    const drawing = await Drawing.findByIdAndUpdate(req.params.id, { title, shapes }, { new: true });
    if (!drawing) return res.status(404).json({ error: 'Drawing not found' });
    res.status(200).json(drawing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: Delete a drawing by ID
drawingRoute.delete('/drawings/:id', async (req, res) => {
  try {
    const drawing = await Drawing.findByIdAndDelete(req.params.id);
    if (!drawing) return res.status(404).json({ error: 'Drawing not found' });
    res.status(200).json({ message: 'Drawing deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = drawingRoute;
