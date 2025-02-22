import { createContext, useContext, useState, useEffect } from "react";
import { getShoppingItems } from "../data/shoppingItemsData.jsx";

const ShoppingItemsContext = createContext();

export const ShoppingItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchShoppingItems = async () => {
      try {
        const data = await getShoppingItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching shopping items:", error);
      }
    };
    fetchShoppingItems();
  }, []);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const updateItem = (updatedItem) => {
    setItems(items.map((item) => (item._id === updatedItem._id ? updatedItem : item)));
  };

  return (
    <ShoppingItemsContext.Provider value={{ items, addItem, updateItem }}>
      {children}
    </ShoppingItemsContext.Provider>
  );
};

export default ShoppingItemsContext;

