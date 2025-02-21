import api from './axios';

// Get all shopping items
export const getShoppingItems = async () => {
    console.log('Get Items');
  const response = await api.get('/shoppingItems');
  return response.data;
};

// Get a single shopping item
export const getShoppingItem = async (id) => {
  const response = await api.get(`/shoppingItems/${id}`);
  return response.data;
};

// Create a new shopping item
export const createShoppingItem = async (itemData) => {
  const response = await api.post('/shoppingItems', itemData);
  return response.data;
};

// Update a shopping item
export const updateShoppingItem = async (id, updatedData) => {
  const response = await api.put(`/shoppingItems/${id}`, updatedData);
  return response.data;
};

// Delete a shopping item
export const deleteShoppingItem = async (id) => {
  const response = await api.delete(`/shoppingItems/${id}`);
  return response.data;
};
