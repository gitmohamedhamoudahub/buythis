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

  // Update an item inside a shopping list
router.put('/:listId/items/:itemId', async (req, res) => {
  try {
    const { listId, itemId } = req.params;
    const updatedData = req.body; // Expect updated item data in the request body

    // Find the shopping list by listId
    const list = await ShoppingList.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'Shopping list not found' });
    }

    // Find the item within the list using itemId
    const itemIndex = list.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in this list' });
    }

    // Update the item in the list
    list.items[itemIndex] = { ...list.items[itemIndex], ...updatedData };

    // Save the updated shopping list
    const updatedList = await list.save();

    res.status(200).json(updatedList); // Respond with the updated list
  } catch (err) {
    console.error('Error updating item in list:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});


  router.put('/:id', async (req, res) => {
    try {
      console.log('Update shopping list request received');
  
      const listId = req.params.id;
      const { list_name, status, shared_with, items, delete_item_id } = req.body;
  
      console.log('Received delete_item_id:', delete_item_id);
  
      // Check if shopping list exists
      const existingList = await ShoppingList.findById(listId);
      if (!existingList) {
        return res.status(404).json({ message: 'Shopping List not found' });
      }
  
      // Check if the item exists before deleting
      if (delete_item_id) {
        const itemExists = existingList.items.some(item => item._id.toString() === delete_item_id);
        if (!itemExists) {
          return res.status(404).json({ message: 'Item not found in shopping list' });
        }
  
        // Execute the deletion
        await ShoppingList.findByIdAndUpdate(
          listId,
          { $pull: { items: { _id: delete_item_id } } },
          { new: true }
        );
  
        console.log(`Item ${delete_item_id} deleted successfully.`);
      }
  
      // Prepare update query for other fields
      let updateQuery = {};
      if (list_name !== undefined) updateQuery.list_name = list_name;
      if (status !== undefined) updateQuery.status = status;
      if (shared_with !== undefined) updateQuery.shared_with = shared_with;
      if (items !== undefined) updateQuery.items = items;
  
      let updatedList;
      if (Object.keys(updateQuery).length > 0) {
        updatedList = await ShoppingList.findByIdAndUpdate(
          listId,
          { $set: updateQuery },
          { new: true, runValidators: true }
        );
      } else {
        updatedList = await ShoppingList.findById(listId); // Retrieve updated list
      }
  
      if (!updatedList) {
        return res.status(404).json({ message: 'Shopping List not found' });
      }
  
      console.log('Updated shopping list:', updatedList);
      res.status(200).json(updatedList);
    } catch (err) {
      console.error('Error updating shopping list:', err);
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