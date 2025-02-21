import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
//import "./ShoppingListDetails.css";

function ShoppingListDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const list = location.state?.list;

    // Local state for managing list items
    const [items, setItems] = useState(list?.items || []);
    const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "" });

    if (!list) {
        return <p>No list data available.</p>;
    }

    // Handle input changes
    const handleInputChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    // Handle adding a new item
    const handleAddItem = () => {
        if (!newItem.name.trim() || !newItem.quantity.trim() || !newItem.unit.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedItems = [...items, { ...newItem }];
        setItems(updatedItems);
        setNewItem({ name: "", quantity: "", unit: "" }); // Reset form
    };

    return (
        <div className="detailsContainer">
            <h2>Shopping List Details</h2>
            <p><strong>List Name:</strong> {list.list_name}</p>
            <p><strong>Created by:</strong> {list.user_id.name}</p>
            <p><strong>Status:</strong> {list.status}</p>
            <p><strong>Items Count:</strong> {items.length}</p>

            <h3>Items:</h3>
            <ul>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.quantity} {item.unit}
                        </li>
                    ))
                ) : (
                    <p>No items in this list.</p>
                )}
            </ul>

            {/* Add New Item Section */}
            <h3>Add New Item</h3>
            <div className="addItemForm">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Item Name" 
                    value={newItem.name} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="text" 
                    name="quantity" 
                    placeholder="Quantity" 
                    value={newItem.quantity} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="text" 
                    name="unit" 
                    placeholder="Unit (e.g., kg, pcs)" 
                    value={newItem.unit} 
                    onChange={handleInputChange} 
                />
                <button onClick={handleAddItem}>➕ Add Item</button>
            </div>

            <button onClick={() => navigate(-1)}>🔙 Back to Lists</button>
        </div>
    );
}

export default ShoppingListDetails;
