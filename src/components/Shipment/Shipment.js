import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './shipment.css';

const Shipment = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const savedCart = getDatabaseCart()
        const orderDetails ={...loggedInUser,products:savedCart,shipment: data, orderTime:new Date()}
        fetch('https://whispering-spire-57909.herokuapp.com/addOrder',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res=>res.json())
        .then(data => {
            if(data){
                processOrder()
               alert('your order successfully') 
            }
        })
    };
    console.log(watch("example")); // watch input value by passing the name of it

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)} >

            < input defaultValue={loggedInUser.name} name="name" ref={register({ required: true })} placeholder="your name" />
            { errors.name && <span className="error">Name is required</span>}

            < input defaultValue={loggedInUser.email} name="email" ref={register({ required: true })} placeholder="your email" />
            { errors.email && <span className="error">Name is required</span>}

            < input name="address" ref={register({ required: true })} placeholder="your address" />
            { errors.address && <span className="error">Name is required</span>}

            < input name="phone" ref={register({ required: true })} placeholder="your phone" />
            { errors.phone && <span className="error">Name is required</span>}


            <input type="submit" />
        </form>
    )

}

export default Shipment;