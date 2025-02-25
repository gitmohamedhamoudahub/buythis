import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingListContext from '../../context/ShoppingListContext.jsx';
import ShoppingListSelect from '../ShoppingListControls/ShoppingListSelect.jsx';
import './StartShopping.css'; // Import CSS file

function StartShopping() {
  const { shoppingLists, loading, error, addList, deleteList } = useContext(ShoppingListContext);
  const [newListName, setNewListName] = useState("");
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState(null);

  const handleSelectList = (list) => {
    setSelectedList(list);
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
      <h1>Start Shopping</h1>

      <div>
      <h2>Select a Shopping List</h2>
      <ShoppingListSelect onSelectList={handleSelectList} />

      {selectedList && (
        <div>
          <h3>Selected Shopping List:</h3>
          <p>Name: {selectedList.list_name}</p>
          <p>Items: {selectedList.items.length}</p>
        </div>
      )}
    </div>

      </div>
  );
}

export default StartShopping;
