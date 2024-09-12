const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Drawing = require('./models/Drawing');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/whiteboard', { useNewUrlParser: true, useUnifiedTopology: true });

// API Endpoints

// Create a new drawing
app.post('/drawings', async (req, res) => {
  const newDrawing = new Drawing(req.body);
  try {
    const savedDrawing = await newDrawing.save();
    res.status(201).json(savedDrawing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all drawings
app.get('/drawings', async (req, res) => {
  try {
    const drawings = await Drawing.find();
    res.json(drawings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific drawing by ID
app.get('/drawings/:id', async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id);
    if (!drawing) return res.status(404).json({ message: 'Drawing not found' });
    res.json(drawing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a drawing
app.put('/drawings/:id', async (req, res) => {
  try {
    const updatedDrawing = await Drawing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDrawing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a drawing
app.delete('/drawings/:id', async (req, res) => {
  try {
    await Drawing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Drawing deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
