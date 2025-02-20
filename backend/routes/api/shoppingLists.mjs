import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import ShoppingList from '../../models/ShoppingList.mjs';
import mongoose from 'mongoose';

const router = express.Router();

// Get all shopping lists
router.get('/', async (req, res) => {
    try {
      const shoppingLists = await ShoppingList.find().populate('user_id', 'name email');
      res.status(200).json(shoppingLists);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  });
  


// Get a specific shopping list by ID
router.get('/:id', async (req, res) => {
    try {
      const listId = req.params.id;
      const shoppingList = await ShoppingList.findById(listId).populate('user_id', 'name email');
  
      if (!shoppingList) {
        return res.status(404).json({ message: 'Shopping List not found' });
      }
  
      res.status(200).json(shoppingList);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  });
  
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const { user_id, list_name } = req.body;

        // Validation
        if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ msg: 'Invalid or missing user ID' });
        }

        if (!list_name || list_name.trim() === '') {
            return res.status(400).json({ msg: 'List name is required' });
        }

        // Create new shopping list
        const newShoppingList = new ShoppingList({
            user_id,
            list_name,
            shared_with: [], // Empty array
            items: [], // Empty array
            status: 'active', // Default status
        });

        // Save to database
        const savedList = await newShoppingList.save();

        res.status(201).json(savedList); // Respond with the created list
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});
// Delete a shopping list by ID
router.delete('/:id', async (req, res) => {
    try {
      const listId = req.params.id;
      
      const deletedList = await ShoppingList.findByIdAndDelete(listId);
  
      if (!deletedList) {
        return res.status(404).json({ message: 'Shopping List not found' });
      }
  
      res.status(200).json({ message: 'Shopping List deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  });
  

export default router;