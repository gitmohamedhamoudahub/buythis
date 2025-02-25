import { createContext, useState, useEffect } from 'react';
import { getShoppingLists, addShoppingList, deleteShoppingList, updateShoppingList } from '../data/shoppingListData.jsx';

// Create the context
const ShoppingListContext = createContext();

// Create the provider component
export const ShoppingListProvider = ({ children }) => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch shopping lists on mount
  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const data = await getShoppingLists();
        setShoppingLists(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingLists();
  }, []);

  const addList = async (newListName) => {
    try {
      const newList = await addShoppingList(newListName);
      setShoppingLists((prevLists) => [...prevLists, newList]);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteList = async (id) => {
    try {
      await deleteShoppingList(id);
      setShoppingLists((prevLists) => prevLists.filter((list) => list._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateList = async (id, updatedName) => {
    try {
      const updatedList = await updateShoppingList(id, { list_name: updatedName });
      setShoppingLists((prevLists) =>
        prevLists.map((list) => (list._id === id ? { ...list, list_name: updatedName } : list))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const addItemToList = async (listId, newItem) => {
    try {
        console.log('Adding item to list', listId);
        console.log('Adding item to list',newItem);
      // Find the selected shopping list
      const selectedList = shoppingLists.find((list) => list._id === listId);
      if (!selectedList) throw new Error('List not found');

      // Ensure items array exists
      const updatedItems = [...(selectedList.items || []), newItem];

      // Prepare the updated list object
      const updatedList = { ...selectedList, items: updatedItems };

      // Update in database
      await updateShoppingList(listId, updatedList);

      // Update state
      setShoppingLists((prevLists) =>
        prevLists.map((list) => (list._id === listId ? updatedList : list))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingLists,
        loading,
        error,
        addList,
        deleteList,
        updateList,
        addItemToList, // 🔹 Added this function
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export default ShoppingListContext;
