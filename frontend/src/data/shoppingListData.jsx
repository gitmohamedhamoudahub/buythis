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
  const response = await api.put(`/shoppingLists/${id}`, updatedData);
  return response.data;
};

// Delete a shopping list
export const deleteShoppingList = async (id) => {
  const response = await api.delete(`/shoppingLists/${id}`);
  return response.data;
};
