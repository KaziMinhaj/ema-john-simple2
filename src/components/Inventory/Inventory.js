import React from 'react';
const Inventory = () => {
    const handleAddProducts=()=>{
        const product = {}
        fetch('https://whispering-spire-57909.herokuapp.com/addProduct',{
            method:"POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form>   
            <button onClick={handleAddProducts}>Add product</button>
            </form>
        </div>
    );
};

export default Inventory;