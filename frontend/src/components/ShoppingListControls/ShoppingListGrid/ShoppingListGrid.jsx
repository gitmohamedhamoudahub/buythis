import React, { useState, useContext } from 'react';
import ShoppingListContext from '../../../context/ShoppingListContext.jsx';
import './ShoppingListGrid.css';

function ShoppingListGrid({ list }) {
  const { updateItemInList, deleteItemFromList } = useContext(ShoppingListContext);
  const [items, setItems] = useState(list.items || []);

  const handleInputChange = (index, field, value) => {
    if (value =='') return '';
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSave = async (index) => {
    const updatedItem = items[index];
    try {
        console.log(updatedItem);
        
        // Call the updated function with only the list ID and the updated item
        await updateItemInList(list._id, updatedItem);
        
        alert('Item updated successfully!');
    } catch (error) {
        console.error('Error updating item:', error);
        alert('Failed to update item.');
    }
};


  const handleDelete = async (index) => {
    const itemId = items[index]._id;
    try {
      await deleteItemFromList(list._id, itemId);
      setItems(items.filter((_, i) => i !== index));
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item.');
    }
  };

  return (
    <div className="shopping-list-grid">
      <h3>{list.list_name}</h3>
      <div className="grid-header">
        <span>Item Name</span>
        <span>Required Qty</span>
        <span>Estimated Cost</span>
        <span>Purchased Qty</span>
        <span>Actual Cost</span>
        <span>Actions</span>
      </div>

      {list.items.length === 0 ? (
        <p>No items in this list.</p>
      ) : (
        list.items.map((item, index) => (
          <div className="grid-row" key={item.item_id}>
            <span>{item.name }</span>
            <input
              type="number"
              value={item.required_quantity}
              onChange={(e) => handleInputChange(index, 'required_quantity', parseInt(e.target.value))}
            />
            <input
              type="number"
              step="0.01"
              value={item.estimated_cost}
              onChange={(e) => handleInputChange(index, 'estimated_cost', parseFloat(e.target.value))}
            />
            <input
              type="number"
              value={item.purchased_quantity}
              onChange={(e) => handleInputChange(
                index, 'purchased_quantity', 
                parseInt(e.target.value))
            }
            />
            <input
              type="number"
              step="0.01"
              value={item.actual_cost}
              onChange={(e) => handleInputChange(index, 'actual_cost', parseFloat(e.target.value))}
            />
            <div className="actions">
              <button onClick={() => handleSave(index)}>Save</button>
              <button onClick={() => handleDelete(index)} className="delete">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ShoppingListGrid;
