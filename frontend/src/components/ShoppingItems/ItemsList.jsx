
import './ItemsList.css';
// import shoppingItemsData from '../../data/shoppingItemsData.jsx';
import { useState, useEffect } from 'react';
import { getShoppingItems } from '../../data/shoppingItemsData.jsx';
import './itemsList.css'; // Import CSS file

function ItemsList() {
  const [items, setItems] = useState([]);
  const [newStore, setNewStore] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  
      useEffect(() => {
          const fetchShoppingItems = async () => {
              try {
                console.log('GET DATA');
                  const data = await getShoppingItems();
                  setItems(data);
                  console.log(data);
              } catch (err) {
                  setError(err.message);
              } finally {
                  setLoading(false);
              }
          };
  
          fetchShoppingItems();
      }, []);
      
  
  // Handle adding new store
  const handleAddStore = (itemId) => {
    if (newStore.trim() === '') return;
    setItems(
      items.map((item) =>
        item._id === itemId ? { ...item, stores: [...item.stores, newStore] } : item
      )
    );
    setNewStore('');
  };

  // Handle removing a store
  const handleRemoveStore = (itemId, store) => {
    setItems(
      items.map((item) =>
        item._id === itemId
          ? { ...item, stores: item.stores.filter((s) => s !== store) }
          : item
      )
    );
  };

  // Handle adding a new image (file upload simulation)
  const handleImageUpload = (event, itemId) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setItems(
        items.map((item) =>
          item._id === itemId ? { ...item, photo: imageUrl } : item
        )
      );
    }
  };

  return (
    < >
    {loading && <div>Loading...</div>}
      {items.map((item) => (
        <div key={item._id} className="ItemCard">

          {/* ITEM HEADER SECTION */}
          <div className="itemHeader">
            <div className="itemTitle">
              <label htmlFor="lblTitle">Item Name</label>
              <input
                type="text"
                id="txtItemName"
                name="txtItemName"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) =>
                  setItems(
                    items.map((i) =>
                      i._id === item._id ? { ...i, name: e.target.value } : i
                    )
                  )
                }
              />
            </div>
            <div className="controlButtons">
              <button className="delete">❌</button>
              <button className="edit">✏️</button>
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
                  value={item.price}
                  onChange={(e) =>
                    setItems(
                      items.map((i) =>
                        i._id === item._id ? { ...i, price: e.target.value } : i
                      )
                    )
                  }
                />
              </div>
              <div className="itemQuantity">
                <label htmlFor="txtQuantity">Unit</label>
                <input
                  type="text"
                  id="txtQuantity"
                  name="txtQuantity"
                  placeholder="Quantity"
                  value={item.unit}
                  onChange={(e) =>
                    setItems(
                      items.map((i) =>
                        i._id === item._id ? { ...i, unit: e.target.value } : i
                      )
                    )
                  }
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
                  value={item.category}
                  onChange={(e) =>
                    setItems(
                      items.map((i) =>
                        i._id === item._id ? { ...i, category: e.target.value } : i
                      )
                    )
                  }
                />
              </div>
              <div className="itemColor">
                <label htmlFor="txtColor">COLOR</label>
                <input
                  type="text"
                  id="txtColor"
                  name="txtColor"
                  placeholder="Color"
                  value={item.color}
                  onChange={(e) =>
                    setItems(
                      items.map((i) =>
                        i._id === item._id ? { ...i, color: e.target.value } : i
                      )
                    )
                  }
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
                  value={item.size}
                  onChange={(e) =>
                    setItems(
                      items.map((i) =>
                        i._id === item._id ? { ...i, size: e.target.value } : i
                      )
                    )
                  }
                />
              </div>
              <div className="itemCode">
                <label htmlFor="txtCode">CODE</label>
                <input
                  type="text"
                  id="txtCode"
                  name="txtCode"
                  placeholder="Product Code"
                  value={item.code}
                  onChange={(e) =>
                    setItems(
                      items.map((i) =>
                        i._id === item._id ? { ...i, code: e.target.value } : i
                      )
                    )
                  }
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
              {item.stores.map((store, index) => (
                <div key={index} className="storeContainer">
                  <button onClick={() => handleRemoveStore(item._id, store)}>x</button>
                  <h4>{store}</h4>
                </div>
              ))}
            </div>
            <div className="addStore">
              <button className='btnAdd' onClick={() => handleAddStore(item._id)}>+</button>
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
                <img src={item.photo} alt="Product Image" />
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
      ))}
    </>
  );
}

export default ItemsList;
