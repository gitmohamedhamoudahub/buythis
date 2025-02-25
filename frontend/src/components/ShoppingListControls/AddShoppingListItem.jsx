import React, { useState, useEffect, useContext } from 'react';
import ShoppingListContext from '../../context/ShoppingListContext'; // Import the context
import './AddShoppingListItem.css';

function AddShoppingListItem({selectedItemId}) {
  const { shoppingLists, addItemToList } = useContext(ShoppingListContext); // Get context data
  const [selectedListId, setSelectedListId] = useState('');
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddItem = async () => {
    if (!selectedListId || !itemName || !price || !quantity) {
      alert('Please fill in all fields!');
      return;
    }

    const newItem = {
      
        item_id: selectedItemId,
      
      name: itemName,
      estimated_cost: parseFloat(price) * parseInt(quantity, 10), // Ensure estimated cost follows schema
      required_quantity: parseInt(quantity, 10),
      purchased_quantity: 0,
      actual_cost: 0,
    };

    setLoading(true);
    try {
      await addItemToList(selectedListId, newItem);
      setSuccessMessage('Item added successfully!');
      setItemName('');
      setPrice('');
      setQuantity('');

      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3s
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item.');
    }
    setLoading(false);
  };

  return (
    <div className="add-item-container">
      <h2>Add Item to Shopping List</h2>

      <label>Choose Shopping List:</label>
      <select value={selectedListId} onChange={(e) => setSelectedListId(e.target.value)}>
        <option value="">Select a List</option>
        {shoppingLists.map((list) => (
          <option key={list._id} value={list._id}>
            {list.list_name}
          </option>
        ))}
      </select>

      <label>Item Name:</label>
      <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />

      <label>Price:</label>
      <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />

      <label>Quantity:</label>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

      <button onClick={handleAddItem} disabled={loading}>
        {loading ? 'Adding...' : 'Add Item'}
      </button>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default AddShoppingListItem;
