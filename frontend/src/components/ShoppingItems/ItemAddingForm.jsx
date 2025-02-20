function ItemAddingForm()
{ 
    return(   
         <>
            <p></p>         
         <div class="Form">
            <form>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" placeholder="Enter item name"/>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Unit</label>
                    <input type="text" class="form-control" placeholder="e.g., kg, liter"/>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">Stores</label>
                    <input type="text" class="form-control" placeholder="Where to buy?"/>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Category</label>
                    <input type="text" class="form-control" placeholder="e.g., Vegetables, Electronics"/>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-4">
                    <label class="form-label">Price</label>
                    <input type="number" class="form-control" placeholder="Price" />
                </div>
                <div class="col-md-4">
                    <label class="form-label">Size</label>
                    <input type="text" class="form-control" placeholder="e.g., Large, Small"/>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Color</label>
                    <input type="text" class="form-control" placeholder="Color"/>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">Product Code</label>
                    <input type="text" class="form-control" placeholder="Unique code"/>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Photo</label>
                    <input type="file" class="form-control"/>
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label">Remarks</label>
                <textarea class="form-control" rows="3" placeholder="Additional notes"></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        
        </form>
        </div>
    </>
    )
}

export default ItemAddingForm;