import mongoose from 'mongoose';

const ShoppingListSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, // Reference to the creator (User model)

    shared_with: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ], // List of users with access

    list_name: {
      type: String,
      required: [true, 'List name is required'],
      trim: true,
    },

    items: [
      {
        item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ShoppingItem',
          required: true,
        }, // Reference to shopping_items

        name: {
          type: String,
          required: [true, 'Item name is required'],
        }, // Denormalized item name for quick access

        required_quantity: {
          type: Number,
          required: [true, 'Required quantity is mandatory'],
          min: [1, 'Quantity must be at least 1'],
        }, // Units needed

        estimated_cost: {
          type: Number,
          required: true,
          min: [0, 'Estimated cost cannot be negative'],
        }, // Expected cost (price × quantity)

        purchased_quantity: {
          type: Number,
          default: 0,
          min: [0, 'Purchased quantity cannot be negative'],
        }, // Units actually bought

        actual_cost: {
          type: Number,
          default: 0,
          min: [0, 'Actual cost cannot be negative'],
        }, // Total cost spent
      },
    ],

    status: {
      type: String,
      enum: ['active', 'closed'],
      default: 'active',
    }, // List status

  },
  { timestamps: true } // Automatically adds `createdAt` & `updatedAt`
);

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);
export default ShoppingList;
