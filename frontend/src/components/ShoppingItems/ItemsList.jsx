// import 'bootstrap/dist/css/bootstrap.min.css';
function ItemsList()
{
    return(
        <>
                <table class="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Unit</th>
                    <th>Stores</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Product Code</th>
                    <th>Photo</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Milk</td>
                    <td>Liter</td>
                    <td>Walmart, Target</td>
                    <td>Grocery</td>
                    <td>$2.50</td>
                    <td>1L</td>
                    <td>White</td>
                    <td>1234567890</td>
                    <td><img src="https://via.placeholder.com/50" alt="Milk"/></td>
                    <td>Fresh daily</td>
                    <td><button>🗑️</button></td>
                    <td><button>✍️</button></td>
                </tr>
                <tr>
                    <td>Bread</td>
                    <td>Pack</td>
                    <td>Target</td>
                    <td>Grocery</td>
                    <td>$1.50</td>
                    <td>500g</td>
                    <td>Brown</td>
                    <td>2345678901</td>
                    <td><img src="https://via.placeholder.com/50" alt="Bread"/></td>
                    <td>Whole wheat</td>
                    <td><button>🗑️</button></td>
                    <td><button>✍️</button></td>
                </tr>
                <tr>
                    <td>Eggs</td>
                    <td>Carton</td>
                    <td>Walmart, Target</td>
                    <td>Grocery</td>
                    <td>$3.00</td>
                    <td>12 Eggs</td>
                    <td>Yellow</td>
                    <td>3456789012</td>
                    <td><img src="https://via.placeholder.com/50" alt="Eggs"/></td>
                    <td>Free range</td>
                    <td><button>🗑️</button></td>
                    <td><button>✍️</button></td>
                </tr>
                <tr>
                    <td>Cheese</td>
                    <td>Block</td>
                    <td>Walmart</td>
                    <td>Dairy</td>
                    <td>$4.00</td>
                    <td>200g</td>
                    <td>Yellow</td>
                    <td>4567890123</td>
                    <td><img src="https://via.placeholder.com/50" alt="Cheese"/></td>
                    <td>Cheddar</td>
                    <td><button>🗑️</button></td>
                    <td><button>✍️</button></td>
                </tr>
                <tr>
                    <td>Tomatoes</td>
                    <td>kg</td>
                    <td>Whole Foods, Walmart</td>
                    <td>Grocery</td>
                    <td>$2.00</td>
                    <td>1kg</td>
                    <td>Red</td>
                    <td>5678901234</td>
                    <td><img src="https://via.placeholder.com/50" alt="Tomatoes"/></td>
                    <td>Fresh</td>
                    <td><button>🗑️</button></td>
                    <td><button>✍️</button></td>
                </tr>
                <tr>
                    <td>Rice</td>
                    <td>kg</td>
                    <td>Target</td>
                    <td>Grocery</td>
                    <td>$3.50</td>
                    <td>1kg</td>
                    <td>White</td>
                    <td>6789012345</td>
                    <td><img src="https://via.placeholder.com/50" alt="Rice"/></td>
                    <td>Long-grain</td>
                    <td><button>🗑️</button></td>
                    <td><button>✍️</button></td>
                </tr>
                <tr>
                    <td>Orange Juice</td>
                    <td>Liter</td>
                    <td>Whole Foods, Walmart</td>
                    <td>Beverages</td>
                    <td>$3.00</td>
                    <td>1L</td>
                    <td>Orange</td>
                    <td>7890123456</td>
                    <td><img src="https://via.placeholder.com/50" alt="Orange Juice"/></td>
                    <td>100% pure</td>
                    <td><button>🗑️</button></td>
                    <td><button>✍️</button></td>
                </tr>
                <tr>
                    <td>Chicken Breast</td>
                    <td>kg</td>
                    <td>Costco, Walmart</td>
                    <td>Meat</td>
                    <td>$5.00</td>
                    <td>1kg</td>
                    <td>Pink</td>
                    <td>8901234567</td>
                    <td><img src="https://via.placeholder.com/50" alt="Chicken Breast"/></td>
                    <td>Boneless, skinless</td>
                    <td><button>🗑️</button></td>
                    <td><button>✍️</button></td>
                </tr>
                <tr>
                    <td>Shampoo</td>
                    <td>Bottle</td>
                    <td>Target, Walmart</td>
                    <td>Personal Care</td>
                    <td>$2.99</td>
                    <td>250ml</td>
                    <td>Transparent</td>
                    <td>9012345678</td>
                    <td><img src="https://via.placeholder.com/50" alt="Shampoo"/></td>
                    <td>For all hair types</td>
                    <td><button>🗑️</button></td>
                    <td><button>✍️</button></td>
                </tr>
                <tr>
                    <td>Laptop</td>
                    <td>Piece</td>
                    <td>Best Buy, Amazon</td>
                    <td>Electronics</td>
                    <td>$799.00</td>
                    <td>15-inch</td>
                    <td>Black</td>
                    <td>0123456789</td>
                    <td><img src="https://via.placeholder.com/50" alt="Laptop"/></td>
                    <td>High performance</td>
                    <td><button>🗑️</button></td>
                    <td><button>✍️</button></td>
                </tr>
            </tbody>
        </table>

        </>
    )
}

export default ItemsList;