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
      const selectedList = shoppingLists.find((list) => list._id === listId);
      if (!selectedList) throw new Error('List not found');

      const updatedItems = [...(selectedList.items || []), newItem];

      const updatedList = { ...selectedList, items: updatedItems };

      await updateShoppingList(listId, updatedList);

      setShoppingLists((prevLists) =>
        prevLists.map((list) => (list._id === listId ? updatedList : list))
      );
    } catch (err) {
      setError(err.message);
    }
  };
  const deleteItemFromList = async (listId, itemId) => {
    try {
      console.log('Deleting item', itemId, 'from list', listId);
  
      // Send only delete_item_id instead of modifying the entire list
      await updateShoppingList(listId, { delete_item_id: itemId });
  
      // Update state locally after a successful API request
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listId
            ? { ...list, items: list.items.filter((item) => item._id !== itemId) }
            : list
        )
      );
      
      console.log('Item deleted successfully.');
    } catch (err) {
      console.error('Error deleting item:', err.message);
      setError(err.message);
    }
  };
  
  const updateItemInList = async (listId, updatedItem) => {
    try {
        console.log('Updating item in list', listId, updatedItem);
      
        const selectedList = shoppingLists.find((list) => list._id === listId);
        if (!selectedList) throw new Error('List not found');

        // Find the item in the list and update it
        const updatedItems = selectedList.items.map((item) =>
            item._id === updatedItem._id ? { ...item, ...updatedItem } : item
        );

        const updatedList = { ...selectedList, items: updatedItems };

        // Call updateShoppingList to update the list with the modified items
        await updateShoppingList(listId, updatedList);

        // Update the state after a successful API request
        setShoppingLists((prevLists) =>
            prevLists.map((list) => (list._id === listId ? updatedList : list))
        );

        console.log('Item updated successfully.');
    } catch (err) {
        console.error('Error updating item:', err.message);
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
      addItemToList,
      deleteItemFromList,
      updateItemInList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export default ShoppingListContext;
