import { createContext, useContext, useState, useEffect } from "react";
import { getShoppingItems, updateShoppingItem, createShoppingItem  } from "../data/shoppingItemsData.jsx";

const ShoppingItemsContext = createContext();

export const ShoppingItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    console.log('Refresh');
    const fetchShoppingItems = async () => {
      try {
        const data = await getShoppingItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching shopping items:", error);
      }
    };
    fetchShoppingItems();
    
  }, [isRefresh]);

  const addItem = async (newItem) => {
    try {
      const response = await createShoppingItem(newItem);  
  
      setItems((prevItems) => {
        return [...prevItems, response.item];  
      });
  
      console.log("New Item added:", response.data);
      console.log("Updated items list:", items);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  
  
const updateItem = async (updatedItem) => {
  if (!updatedItem) return;
  try {
    const response = await updateShoppingItem(updatedItem._id, updatedItem);
    setItems((prevItems) => 
      prevItems.map((item) => 
        item._id === updatedItem._id ? { ...response.item } : item
      )
    );
  } catch (error) {
    console.error("Error updating item:", error);
  }
};



  return (
    <ShoppingItemsContext.Provider value={{ items, addItem, updateItem }}>
      {children}
    </ShoppingItemsContext.Provider>
  );
};

export default ShoppingItemsContext;

