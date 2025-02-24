import { createContext, useState, useEffect } from 'react';
import { getShoppingLists, 
    addShoppingList, 
    deleteShoppingList } from '../data/shoppingListData.jsx';

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

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingLists,
        loading,
        error,
        addList,
        deleteList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export default ShoppingListContext;
