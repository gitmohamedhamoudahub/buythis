import React, { useState, useEffect } from 'react';
import { getShoppingLists } from '../../data/shoppingListData'; // Assuming this function fetches the shopping lists
import AddShoppingListItem from './AddShoppingListItem.jsx';
import './ShoppingListSelect.css'; // Import CSS for styling (optional)

function ShoppingListSelect({ onSelectList }) {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLists, setFilteredLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null); 
  useEffect(() => {
    // Fetch all shopping lists from the database
    const fetchShoppingLists = async () => {
      try {
        const lists = await getShoppingLists();
        setShoppingLists(lists);
        setFilteredLists(lists);
      } catch (error) {
        console.error('Error fetching shopping lists:', error);
      }
    };
    
    fetchShoppingLists();
  }, []);

  useEffect(() => {
    // Filter shopping lists based on search term
    const results = shoppingLists.filter(list =>
      list.list_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLists(results);
  }, [searchTerm, shoppingLists]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectList = (list) => {
    setSelectedListId(list._id); // Store selected list ID
    onSelectList(list); // Pass selected list to parent component
  };

  return (
    <div className="shopping-list-select">
      <div className="listsContainer">

      <div className="search-container">
        <input
          type="text"
          placeholder="Search shopping lists..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
        <div className="allLists">
          {filteredLists.length === 0 && <p>No shopping lists found</p>}

          {filteredLists.map((list) => (
            <div 
              key={list._id} 
              className={`listWrapper ${selectedListId === list._id ? 'selected' : ''}`} 
              onClick={() => handleSelectList(list)}
            >
              <div className="listSummary">{list.list_name}</div>
              <div className="listData">
                <p><strong>Created by:</strong> {list.user_id.name}</p>
                <p><strong>Status:</strong> {list.status}</p>
                <p><strong>Items:</strong> {list.items.length}</p>

                {/* Emoji Buttons */}
                <div className="buttonContainer">
                  {list.items.length !== 0 && (
                    <button className="iconButton" data-tooltip="Start Shopping">🛒</button>
                  )}
                  {/* <button className="iconButton" data-tooltip="Edit List">✏️</button>
                  {list.items.length === 0 && (
                    <button className="iconButton" data-tooltip="Delete List">❌</button>
                  )} */}
                  <button className="iconButton" data-tooltip="Close List">🔒</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListSelect;
