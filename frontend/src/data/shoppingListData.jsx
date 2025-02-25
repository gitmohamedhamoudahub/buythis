import api from './axios';

// Get all shopping lists
export const getShoppingLists = async () => {
  const response = await api.get('/shoppingLists');
  return response.data;
};

export const addShoppingList = async (listName) => {
    const response = await api.post('/shoppingLists', { 
        user_id: "67b4d6e15d26b775aa557a7f", // Replace with dynamic user ID
        list_name: listName 
    });
    return response.data;
};
// Get a single shopping list
export const getShoppingList = async (id) => {
  const response = await api.get(`/shoppingLists/${id}`);
  return response.data;
};

// Create a new shopping list
export const createShoppingList = async (listData) => {
  const response = await api.post('/shoppingLists', listData);
  return response.data;
};

// Update a shopping list
export const updateShoppingList = async (id, updatedData) => {
  try {
    console.log('Updating Shopping List:', id, updatedData);

    // Ensure only valid keys are sent to the API
    const allowedFields = ['list_name', 'status', 'shared_with', 'items', 'delete_item_id'];
    const filteredData = Object.keys(updatedData)
      .filter((key) => allowedFields.includes(key) && updatedData[key] !== undefined)
      .reduce((obj, key) => {
        obj[key] = updatedData[key];
        return obj;
      }, {});

    if (Object.keys(filteredData).length === 0) {
      console.warn('No valid fields to update.');
      return null;
    }

    const response = await api.put(`/shoppingLists/${id}`, filteredData);
    console.log('Updated Shopping List:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error updating shopping list:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update shopping list');
  }
};

// Delete a shopping list
export const deleteShoppingList = async (id) => {
  const response = await api.delete(`/shoppingLists/${id}`);
  return response.data;
};


export const updateItemInList = async (listId, itemId, updatedItem) => {
  try {
    console.log('Updating item in list:', listId, itemId, updatedItem);

    // Send the request to update the item
    const response = await api.put(`/shoppingLists/${listId}/items/${itemId}`, updatedItem);

    // Log the response for debugging
    console.log('Item updated:', response.data);
    return response.data; // Return the updated list data
  } catch (error) {
    console.error('Error updating item:', error);
    throw new Error('Failed to update item');
  }
};