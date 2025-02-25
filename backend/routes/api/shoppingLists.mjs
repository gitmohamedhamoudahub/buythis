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
  
// Update a shopping list by ID
router.put('/:id', async (req, res) => {
  try {
      const listId = req.params.id;
      const { list_name, status, shared_with, items } = req.body;

      // Validate if list exists
      const existingList = await ShoppingList.findById(listId);
      if (!existingList) {
          return res.status(404).json({ message: 'Shopping List not found' });
      }

      // Validate shared_with field (if provided)
      if (shared_with && !Array.isArray(shared_with)) {
          return res.status(400).json({ message: 'shared_with must be an array of user IDs' });
      }

      // Validate items field (if provided)
      if (items && !Array.isArray(items)) {
          return res.status(400).json({ message: 'items must be an array' });
      }

      // Update fields if provided
      if (list_name !== undefined) existingList.list_name = list_name;
      if (status !== undefined) existingList.status = status;
      if (shared_with !== undefined) existingList.shared_with = shared_with;
      if (items !== undefined) existingList.items = items;

      // Save updated list
      const updatedList = await existingList.save();
      res.status(200).json(updatedList);
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