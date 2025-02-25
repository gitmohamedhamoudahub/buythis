import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingListContext from '../../context/ShoppingListContext.jsx';
import ShoppingListSelect from '../ShoppingListControls/ShoppingListSelect.jsx';
import './StartShopping.css'; // Import CSS file
import ShoppingListGrid from '../ShoppingListControls/ShoppingListGrid/ShoppingListGrid.jsx';

function StartShopping() {
  const { shoppingLists, loading, error, addList, deleteList } = useContext(ShoppingListContext);
  const [newListName, setNewListName] = useState("");
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState(null);

  // Filter shopping lists to show only those with items
  const nonEmptyLists = shoppingLists.filter(list => list.items && list.items.length > 0);

  useEffect(() => {
    if (selectedList) {
      const updatedList = shoppingLists.find((list) => list._id === selectedList._id);
      if (updatedList && updatedList.items.length > 0) {
        setSelectedList(updatedList);
      } else {
        setSelectedList(null); // Reset if the list is now empty
      }
    }
  }, [shoppingLists]);

  const handleSelectList = (list) => {
    if (list.items && list.items.length > 0) {
      setSelectedList(list);
    } else {
      alert("This list has no items!");
    }
  };

  const handleAddList = async () => {
    if (!newListName.trim()) {
      alert("List name cannot be empty!");
      return;
    }

    setAdding(true);
    await addList(newListName);
    setNewListName("");
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
        {/* Pass only lists with items */}
        <ShoppingListSelect onSelectList={handleSelectList} shoppingLists={nonEmptyLists} />

        {selectedList && (
          <div className="mainContainer">
            <ShoppingListGrid list={selectedList} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StartShopping;
