import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingListContext from '../../context/ShoppingListContext.jsx';
import { useAuth } from '../../hooks/auth';
import Logout from '../LogOut/Logout.jsx';
import './ShoppingList.css'; // Import CSS file

function ShoppingList() {
  const { shoppingLists, loading, error, addList, deleteList } = useContext(ShoppingListContext);
  const [newListName, setNewListName] = useState("");
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleClick = () => {
    logout();
  };

  const handleAddList = async () => {
    if (!newListName.trim()) {
      alert("List name cannot be empty!");
      return;
    }

    setAdding(true);
    await addList(newListName);
    setNewListName(""); // Clear input after adding
    setAdding(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this list?")) return;
    await deleteList(id);
  };

  const handleEdit = (list) => {
    navigate(`/shopping-list/${list._id}`, { state: { list } });
  };

  return (
    
    <div className="mainContainer">
        <Logout></Logout>
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
          {shoppingLists.map((item) => {
            // Calculate the total budget (estimated cost)
            const budget = item.items?.reduce((sum, curr) => sum + (curr.estimated_cost || 0), 0) || 0;

            // Calculate the total actual cost
            const actual = item.items?.reduce((sum, curr) => sum + (curr.actual_cost || 0), 0) || 0;

            return (
              <div key={item._id} className="listWrapper">
                <div className="listSummary">{item.list_name}</div>
                <div className="listData">
                  <p><strong>Created by:</strong> {item.user_id.name}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                  <p><strong>Items:</strong> {item.items.length}</p>
                  <p><strong>Budget:</strong> ${budget.toFixed(2)}</p> {/* Total Estimated Cost */}
                  <p><strong>Actual:</strong> ${actual.toFixed(2)}</p> {/* Total Actual Cost */}

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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShoppingList;
