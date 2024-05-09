import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
const PlaceOrder = () => {
    const{getTotalCartAmount,token,food_list,cartItems,url} =useContext(StoreContext);

    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })

    const onChangeHandler=(event)=>{
        const name = event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    // useEffect(()=>{
    //     console.log(data);
    // },[data])

    const placeOrder=async (event) =>{
        event.preventDefault();
        let orderItems =[];
        food_list.map((item)=>{
            if (cartItems[item._id]>0) {
                let itemInfo=item;
                itemInfo["quantity"]=cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        let orderData={
            address:data,
            items:orderItems,
            amount:getTotalCartAmount()+30,

        }
        let response =await axios.post(url+"/api/order/place",orderData,{headers:{token}});
        if (response.data.success) {
            const {session_url}=response.data;
            window.location.replace(session_url);
        }
        else{
            
            alert("Error");
        }
    }

    return (
        <form onSubmit={placeOrder} className='place-order'>
        <div className='place-order-left'>
            <p className='title'>Delivery Information</p>
            <div className="multi-fields">
                <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
            </div>
            <input required name='email' onChange={onChangeHandler} value={data.email} type="email"  id="" placeholder='Email Address' />
            <input required name='street' onChange={onChangeHandler} value={data.street} type="text"  id="" placeholder='Street' />
            <div className="multi-fields">
            <input name='city' required onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
                </div>
                <div className="multi-fields">
            <input type="text" required name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
                    <input type="text" required name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
                </div>
                <input type="text" required name='phone' onChange={onChangeHandler} value={data.phone} id=""  placeholder='phone'/>
        </div>
        <div className="place-order-right">
        <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>&#8377;{getTotalCartAmount()}</p>
                        </div>
                       <hr />
                        <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>&#8377;{getTotalCartAmount()===0?0:30}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>&#8377;{getTotalCartAmount()===0?0:getTotalCartAmount()+30}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
                </div>
        </form>
    )
}

export default PlaceOrder
