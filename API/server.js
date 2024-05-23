const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Item = require('./models/item');

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors(
    {
    origin: ["https://crud-frontend-hazel.vercel.app"],
    methods: ["POST", "GET" ,"PUT" , "DELLETE"],
    credentials: true
}
));

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://Crud:crud123@cluster0.pq5zgaz.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

  // Create
app.post('/items', async (req, res) => {
    try {
      const newItem = new Item(req.body);
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Read
  app.get('/items', async (req, res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update
  app.put('/items/:id', async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete
  app.delete('/items/:id', async (req, res) => {
    try {
      await Item.findByIdAndDelete(req.params.id);
      res.json({ message: 'Item deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
