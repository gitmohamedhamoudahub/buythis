import shoppingListData from '../../data/shoppingLists.jsx';
import './ShoppingList.css'; // Import CSS file

function ShoppingList() {
    console.log(shoppingListData);

    return (
    <div className='mainContainer'>
        {/* Add New List Section */}
          <div className="addNewList">
            <label>List Name:</label>
            <input type="text" placeholder="Enter new list name" />
            <button>Add New List</button>
          </div>
    

        <div className="listsContainer">

            
            
            <div className="allLists">
                {shoppingListData.map((item) => (
                    <div key={item._id} className="listWrapper">
                        <div className="listSummary">{item.list_name}</div>
                        <div className="listData">
                            <p><strong>Created by:</strong> {item.user_id}</p>
                            <p><strong>Status:</strong> {item.status}</p>
                            <p><strong>Items:</strong> {item.items.length}</p>
                            
                            {/* Emoji Buttons */}
                            <div className="buttonContainer">
                            {item.items.length !== 0 && (
                                <button className="iconButton" data-tooltip="Start Shopping">🛒</button>
                            )}
                                <button className="iconButton" data-tooltip="Edit List">✏️</button>
                                {item.items.length === 0 && (
                                    <button className="iconButton" data-tooltip="Delete List">❌</button>
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
