import shoppingListData from '../../data/shoppingLists.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getShoppingLists, addShoppingList, deleteShoppingList } from '../../data/shoppingListData.jsx';
import './ShoppingList.css'; // Import CSS file

function ShoppingList() {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newListName, setNewListName] = useState("");
    const [adding, setAdding] = useState(false);
    
    const navigate = useNavigate(); // Hook for navigation

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
    
    const handleAddList = async () => {
        if (!newListName.trim()) {
            alert("List name cannot be empty!");
            return;
        }

        setAdding(true);
        try {
            const newList = await addShoppingList(newListName);
            setShoppingLists((prevLists) => [...prevLists, newList]);
            setNewListName(""); // Clear input after adding
        } catch (err) {
            alert("Error adding list: " + err.message);
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this list?")) return;
        try {
            await deleteShoppingList(id);
            setShoppingLists((prevLists) => prevLists.filter((list) => list._id !== id));
        } catch (err) {
            alert("Error deleting list: " + err.message);
        }
    };

    const handleEdit = (list) => {
        navigate(`/shopping-list/${list._id}`, { state: { list } });
    };

    return (
        <div className="mainContainer">
            {/* Add New List Section */}
            <div className="addNewList">
                <label>List Name:</label>
                <input 
                    type="text" 
                    placeholder="Enter new list name" 
                    value={newListName} 
                    onChange={(e) => setNewListName(e.target.value)}
                />
                <button onClick={handleAddList} disabled={adding}>
                    {adding ? "Adding..." : "Add New List"}
                </button>
            </div>

            <div className="listsContainer">
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                
                <div className="allLists">
                    {shoppingLists.map((item) => (
                        <div key={item._id} className="listWrapper">
                            <div className="listSummary">{item.list_name}</div>
                            <div className="listData">
                                <p><strong>Created by:</strong> {item.user_id.name}</p>
                                <p><strong>Status:</strong> {item.status}</p>
                                <p><strong>Items:</strong> {item.items.length}</p>

                                {/* Emoji Buttons */}
                                <div className="buttonContainer">
                                    {item.items.length !== 0 && (
                                        <button className="iconButton" data-tooltip="Start Shopping">🛒</button>
                                    )}
                                    <button className="iconButton" data-tooltip="Edit List" onClick={() => handleEdit(item)}>✏️</button>
                                    {item.items.length === 0 && (
                                        <button className="iconButton" data-tooltip="Delete List" onClick={() => handleDelete(item._id)}>❌</button>
                                    )}
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

export default ShoppingList;
