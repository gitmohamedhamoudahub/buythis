// import { useShoppingItems } from "../../context/ShoppingItemsContext.jsx";
import { useState, useContext } from "react";
import ShoppingItemsContext from "../../context/ShoppingItemsContext.jsx";
import './itemsList.css'; // Import CSS file

function ShoppingItemsList() {
    const { items, addItem, updateItem } = useContext(ShoppingItemsContext);
//   const { items, addItem, updateItem } = useShoppingItems();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newStore, setNewStore] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddNew = () => {
    setSelectedItem({ name: "", price: "", unit: "", category: "", color: "", size: "", code: "", stores: [], photo: "" });
    setIsAdding(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (isAdding) {
      addItem(selectedItem);
    } else {
      updateItem(selectedItem);
    }
    setSelectedItem(null);
  };

  
  // Handle adding new store
  const handleAddStore = (itemId) => {
    if (newStore.trim() === '') return;
    setSelectedItem(
          items.map((item) =>
        item._id === itemId ? { ...item, stores: [...item.stores, newStore] } : item
      )    
    );
    // setItems(
    //   items.map((item) =>
    //     item._id === itemId ? { ...item, stores: [...item.stores, newStore] } : item
    //   )
    // );
    setNewStore('');
  };

  // Handle removing a store
  const handleRemoveStore = (itemId, store) => {
    
    setSelectedItem(
        items.map((item) =>
                item._id === itemId
                  ? { ...item, stores: item.stores.filter((s) => s !== store) }
                  : item
              )
    );
    
    // setItems(
    //   items.map((item) =>
    //     item._id === itemId
    //       ? { ...item, stores: item.stores.filter((s) => s !== store) }
    //       : item
    //   )
    // );
  };

  // Handle adding a new image (file upload simulation)
  const handleImageUpload = (event, itemId) => 
    {
        const file = event.target.files[0];
        if (file) 
        {
            const imageUrl = URL.createObjectURL(file);
                setSelectedItem( 
                    items.map((item) => 
                        item._id === itemId ? { ...item, photo: imageUrl } : item 
                )
            )
        }
      
    }
  


  return (
    <div>
      <button onClick={handleAddNew}>🆕</button>
      <div>
        {items.map((item) => (
          <div key={item._id} className="item-row">
            <span>{item.name}</span>
            <button onClick={() => handleEdit(item)}>✏️</button>            
          </div>
          
        ))}
      </div>
      {selectedItem && (
            
        <div key={selectedItem._id} className="ItemCard">
            <div className="itemTitle"> <label htmlFor="lblFormTitle">{isAdding ? "Add New Item" : "Edit Item"}</label></div>
          {/* ITEM HEADER SECTION */}
          <div className="itemHeader">
            <div className="itemTitle">
              <label htmlFor="lblTitle">Item Name</label>
              <input
                type="text"
                id="txtItemName"
                name="txtItemName"
                placeholder="Item Name"
                value={selectedItem.name}
                onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} 
                
              />
            </div>
            <div className="controlButtons">
            <button className="edit" onClick={handleSave}>💾</button>
            <button className="edit"  onClick={() => setSelectedItem(null)}>❌</button>
              {/* <button className="delete">❌</button> */}
              {/* <button className="edit">✏️</button> */}
            </div>
          </div>

          {/* ITEM DATA SECTION */}
          <div className="itemDataContainer">
            <div className="itemRow">
              <div className="itemPrice">
                <label htmlFor="txtPrice">PRICE</label>
                <input
                  type="text"
                  id="txtPrice"
                  name="txtPrice"
                  placeholder="Price"
                  value={selectedItem.price}
                  onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })} 
                
                />
              </div>
              <div className="itemQuantity">
                <label htmlFor="txtQuantity">Unit</label>
                <input
                  type="text"
                  id="txtQuantity"
                  name="txtQuantity"
                  placeholder="Quantity"
                  value={selectedItem.unit}
                  onChange={(e) => setSelectedItem({ ...selectedItem, unit: e.target.value })} 
                
                />
              </div>
            </div>

            <div className="itemRow">
              <div className="itemCategory">
                <label htmlFor="txtCategory">CATEGORY</label>
                <input
                  type="text"
                  id="txtCategory"
                  name="txtCategory"
                  placeholder="Category"
                  value={selectedItem.category}
                  onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })} 
                
                />
              </div>
              <div className="itemColor">
                <label htmlFor="txtColor">COLOR</label>
                <input
                  type="text"
                  id="txtColor"
                  name="txtColor"
                  placeholder="Color"
                  value={selectedItem.color}
                    onChange={(e) => setSelectedItem({ ...selectedItem, color: e.target.value })} 
                
                />
              </div>
            </div>

            <div className="itemRow">
              <div className="itemSize">
                <label htmlFor="txtSize">SIZE</label>
                <input
                  type="text"
                  id="txtSize"
                  name="txtSize"
                  placeholder="Size"
                  value={selectedItem.size}
                  onChange={(e) => setSelectedItem({ ...selectedItem, size: e.target.value })} 
                
                />
              </div>
              <div className="itemCode">
                <label htmlFor="txtCode">CODE</label>
                <input
                  type="text"
                  id="txtCode"
                  name="txtCode"
                  placeholder="Product Code"
                  value={selectedItem.code}
                  onChange={(e) => setSelectedItem({ ...selectedItem, code: e.target.value })} 
                
                />
              </div>
            </div>
          </div>

          {/* ITEM STORES SECTION */}
          <div className="itemStores">
            <div className="storesTitle">
              <label htmlFor="lblStores">STORES</label>
            </div>
            <div className="storesList">
              {selectedItem.stores.map((store, index) => (
                <div key={index} className="storeContainer">
                  <button onClick={() => handleRemoveStore(selectedItem._id, store)}>x</button>
                  <h4>{store}</h4>
                </div>
              ))}
            </div>
            <div className="addStore">
              <button className='btnAdd' onClick={() => handleAddStore(selectedItem._id)}>+</button>
              <input
                type="text"
                id="txtStoreName"
                name="txtStoreName"
                placeholder="Store Name"
                value={newStore}
                onChange={(e) => setNewStore(e.target.value)}
              />
            </div>
          </div>

          {/* ITEM IMAGES SECTION */}
          <div className="itemImages">
            <div className="imagesTitle">
              <label htmlFor="lblImages">IMAGES</label>
            </div>
            <div className="imagesList">
              <div className="imageContainer">
                <img src={selectedItem.photo} alt="Product Image" />
              </div>
            </div>
            <div className="addImage">
              <button className='btnAdd'>+</button>
              <input
                type="file"
                id="fileUpload"
                name="fileUpload"
                onChange={(e) => handleImageUpload(e, item._id)}
              />
            </div>
          </div>
         
        </div>
          )
          
          }
    </div>
  );}

export default ShoppingItemsList;
