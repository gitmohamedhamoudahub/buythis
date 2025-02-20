import mongoose from 'mongoose';

// Shopping Item Schema
const ShoppingItemSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, 'Item name is required'],
    },
    unit: {
      type: String,
      required: [true, 'Unit of measure is required'],
    },
    stores: [
      {
        type: String,
      },
    ], // List of stores where the item is available
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price per unit is required'],
      min: [0, 'Price must be a positive number'],
    },
    size: {
      type: String,
    }, // Size or packaging details
    color: {
      type: String,
    }, // Color (if applicable)
    code: {
      type: String,
    }, // Barcode or unique product code
    photo: {
      type: String,
    }, // URL to the product image
    remarks: {
      type: String,
    }, // Additional notes
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create the ShoppingItem model
const ShoppingItem = mongoose.model('ShoppingItem', ShoppingItemSchema);

export default ShoppingItem;
