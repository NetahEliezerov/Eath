import cookies from 'js-cookie';
import React, {useEffect, useState} from 'react'
import restaurantsService from '../../services/restaurants';
import web3Service from '../../services/web3';
import MealComponent from '../Restaurant/Meal';
import './MyAccount.css';

const MyAccount = () => {
    const [orders, setOrders] = useState(null);
    const [allRestaurants, setAllRestaurants] = useState([]);

    if(!cookies.get('pubkey')) {
        window.location.href = "/";
    }

    const getOrders = async () => {
        const ordersRes = await web3Service.getOrders(await web3Service.getAddress());
        console.log(ordersRes)
        setOrders(ordersRes);
    }

    const getRestaurants = async () => {
        const restaurants = await restaurantsService.getRestaurants();
        setAllRestaurants(restaurants);
    }



    useEffect(() => {
        if(orders != []) {
            getOrders();
        }
        if(allRestaurants != []) {
            getRestaurants()
        }
    }, [])

    const currentRestaurant = (restaurantId) => allRestaurants.find((res) => res.restaurantId === restaurantId);
    console.log(orders != null)
    return (
        <div>
            <div className='accountPageTitle'>
                <h1 className='accountPageTitleText'>My Account</h1><br /><br />
                <h1 className='accountPageTitleText'>Recent Orders</h1>
                {/* { orders != null ? <div>{orders.map((order) => <div className='accountOrder' style={{background: `linear-gradient(to right, ${currentRestaurant(order.restaurantId).colors[0]}, ${currentRestaurant(order.restaurantId).colors[1]})`}}>
                    <h1 className='accountOrderTitle'>{currentRestaurant(order.restaurantId).name}
                    <p className='accountOrderDate'>{new Date(order.orderTimestamp).toLocaleString()}</p>
                    </h1>
                </div>) }</div> : null } */}
                { orders != null && orders.map((order) => <div className='accountOrder' style={{background: `linear-gradient(to right, ${currentRestaurant(order.restaurantId).colors[0]}, ${currentRestaurant(order.restaurantId).colors[1]})`}}>
                    <h1 className='accountOrderTitle'>{currentRestaurant(order.restaurantId).name}
                    <p className='accountOrderDate'>{new Date(order.orderTimestamp).toLocaleString()}</p>
                    </h1>
                </div>) }
            </div>
        </div>
    )
}

export default MyAccount
