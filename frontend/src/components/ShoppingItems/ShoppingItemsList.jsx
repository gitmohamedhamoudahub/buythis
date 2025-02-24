// import { useShoppingItems } from "../../context/ShoppingItemsContext.jsx";
import { useState, useContext, useEffect } from "react";
import ShoppingItemsContext from "../../context/ShoppingItemsContext.jsx";
import './itemsList.css'; // Import CSS file

function ShoppingItemsList() {
    const { items, addItem, updateItem } = useContext(ShoppingItemsContext);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newStore, setNewStore] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("Updated items list:", items);
    setFilteredItems(items);
}, [items]);

  const handleAddNew = () => {
    setSelectedItem({ name: "", price: "", unit: "", category: "", color: "", size: "", code: "", stores: [], photo: "" });
    setIsAdding(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsAdding(false);
  };

  const handleSave = async () => {
    console.log('Before Update',items);
    if (isAdding) {
      await addItem(selectedItem);
    } else {
      {
        await updateItem(selectedItem)

      };
    }
    setSelectedItem(null);

    console.log('After Update',items);
 
  };

  
  const handleAddStore = () => {
    if (newStore.trim() === '') return; // Prevent adding empty store
    setSelectedItem(prev => ({
        ...prev,
        stores: [...prev.stores, newStore] // Add new store to the existing array
    }));
    setNewStore(''); // Clear input field
};

const handleRemoveStore = (store) => {
    setSelectedItem(prev => ({
        ...prev,
        stores: prev.stores.filter(s => s !== store) // Remove the selected store
    }));
};
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedItem((prev) => ({
            ...prev,
            photo: imageUrl
        }));
    }
};
    
    const handleItemFilter = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        
        if (term === "") {
            setFilteredItems(items); // Show all items if search box is empty
        } else {
            setFilteredItems(items.filter(item =>
                item.name.toLowerCase().includes(term) || 
                item.category.toLowerCase().includes(term) ||
                item.stores.some(store => store.toLowerCase().includes(term))
            ));
        }
    };
  return (
    <div  >
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
                <div className="controlButtonsa">
                <button className="edit1" onClick={handleSave}>💾 Save</button>
                <button className="edit1"  onClick={() => setSelectedItem(null)}>❌ Close</button>
                  {/* <button className="delete">❌ Close</button> */}
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
        <button onClick={() => handleRemoveStore(store)}>x</button>
        <h4>{store}</h4>
    </div>
))}
                </div>
                <div className="addStore">
    <button className='btnAdd' onClick={handleAddStore}>+</button>
    <input
        type="text"
        id="txtStoreName"
        name="txtStoreName"
        placeholder="Store Name"
        value={newStore}
        onChange={(e) => setNewStore(e.target.value)}
    />
</div>              </div>
    
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

       <div className="itemFieldControl">




       <div className="itemSearch">
              <div><strong>Search:</strong></div>
              <div>
                <input
                className="txtSearchItem"
                type="text"
                id="txtItemSearch"
                name="txtItemSearch"
                placeholder="Search Item"
                value={searchTerm}
                onChange={handleItemFilter} 
                
              />
              </div>
            </div>
        <button onClick={handleAddNew} className="btnItemsAdd"><strong>🆕 Add New Item</strong></button>
         
            </div>
      <div>
        {filteredItems.map((item) => (
          <div key={item._id} className="itemsContainer">
            <div key={item._id} className="item-row">
                <div className="itemField"><strong>Name:</strong> {item.name}</div>
                <div className="itemField"><strong>Category:</strong>{item.category}</div>
                <div className="itemField"><strong>Stores:</strong> {item.stores}</div>
                <div className="itemField"><strong>Price:</strong>{item.price}</div>
                <button className="btnItemsEdit" onClick={() => handleEdit(item)}>✏️</button> 
                  
                </div>
                  </div>
        ))}
      </div>
      
    </div>
  );}

export default ShoppingItemsList;
