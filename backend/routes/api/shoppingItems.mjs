import express from 'express';
import mongoose from 'mongoose';
import ShoppingItem from '../../models/ShoppingItem.mjs'; // Adjust path if needed
import ShoppingList from '../../models/ShoppingList.mjs';

const router = express.Router();

/**
 * @route   POST /api/shoppingItems
 * @desc    Create a new shopping item
 * @access  Private (Require authentication in a real app)
 */
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const { name, unit, stores, category, price, size, color, code, photo, remarks } = req.body;

        // Validation
        if (!name || name.trim() === '') {
            return res.status(400).json({ msg: 'Item name is required' });
        }
        if (!unit || unit.trim() === '') {
            return res.status(400).json({ msg: 'Unit is required' });
        }
        if (!category || category.trim() === '') {
            return res.status(400).json({ msg: 'Category is required' });
        }
        if (!price || price < 0) {
            return res.status(400).json({ msg: 'Price must be a positive number' });
        }

        // Create a new shopping item
        const newShoppingItem = new ShoppingItem({
            _id: new mongoose.Types.ObjectId(),
            name,
            unit,
            stores: stores || [], // Default to empty array
            category,
            price,
            size: size || null,
            color: color || null,
            code: code || null,
            photo: photo || null,
            remarks: remarks || null
        });

        // Save to database
        const savedItem = await newShoppingItem.save();

        res.status(201).json(savedItem); // Respond with the created item
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all shopping items
router.get('/', async (req, res) => {
    try {
      const shoppingItems = await ShoppingItem.find();
      res.status(200).json(shoppingItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  });

  
  // Update a shopping item by ID
router.put('/:id', async (req, res) => {
    try {
      const { name, unit, stores, category, price, size, color, code, photo, remarks } = req.body;
      const itemId = req.params.id;
  
      const updatedItem = await ShoppingItem.findByIdAndUpdate(
        itemId,
        {
          name,
          unit,
          stores,
          category,
          price,
          size,
          color,
          code,
          photo,
          remarks,
        },
        { new: true }
      );
  
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  });

router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const itemId = req.params.id;

    // Check if the item exists in any shopping list
    const isItemInList = await ShoppingList.findOne({ 'items.item_id': itemId });

    if (isItemInList) {
      return res.status(400).json({ message: 'Item is linked to a shopping list and cannot be deleted' });
    }

    // Proceed with deletion if the item is not linked
    const deletedItem = await ShoppingItem.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

    

export default router;
