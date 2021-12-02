import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import restaurantsService from '../../services/restaurants';
import { Box, Button, Typography, Modal } from '@mui/material';
import MealComponent from './Meal';
import './RestaurantPage.css';
import web3Service from '../../services/web3';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'black',
    color: 'white',
    fontFamily: 'Poppins',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px'
};



const RestaurantPage = () => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { restaurantId } = useParams();
    const [currentRestaurant, setCurrentRestaurant] = useState(null)

    const getRestaurants = async () => {
        const res = await restaurantsService.getRestaurants();
        setCurrentRestaurant(res.find((restaurant) => restaurant.restaurantId === restaurantId))
    }

    useEffect(() => {
        if(!currentRestaurant) {
            getRestaurants();
        }
    }, []);

    const payOrder = async () => {
        const address = await web3Service.getAddress();
        console.log(city, address)
        console.log(address)
        const signMsg = `Hey! Click the Sign button to accept the Eath order. Address: ${address} Restaurant: ${currentRestaurant.name}`;
        if(!error) {
            const options = {
                signMsg,
                address: address,
                restaurantId: currentRestaurant.restaurantId,
                orderedItems: cart,
                setError
            }
            console.log(await web3Service.completeBuy(options));
        }
    }

    const handleCityChange = (_, value) => {
        setCity(_.target.value);
    }

    const handleStreetChange = (_, value) => {
        setStreet(_.target.value);
    }

    return (
        <div>
            { currentRestaurant && <div><img className='restaurantCoverImg' src={`/assets/${currentRestaurant.coverImg}`} />
            <div className='restaurantTitle'>
                <h1 className='restaurantTitleText'>{currentRestaurant.name} {currentRestaurant.emoji}</h1>
                <button className='completeOrderBtn' onClick={handleOpen}>Complete Order</button>
                { currentRestaurant.meals.map((meal) => <MealComponent setCart={setCart} cart={cart} meal={meal} />) }
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className='connectWalletModal'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Cart Items:<br />
                            {cart.map((e) => <span>{e.mealName}</span>)}
                        </Typography><br />
                        <input className='cityInputOrder' placeholder='City' onChange={handleCityChange}/><br /><br />
                        <input className='cityInputOrder' placeholder='Street' onChange={handleStreetChange} /><br /><br />
                        <button className='payOrderBtn' onClick={() => payOrder()}>Pay With Wallet</button><br />
                        { error && <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: 'red'}}><br /><br />
                            Order Denied
                        </Typography> }
                    </Box>
                </Modal></div> }
        </div>
    )
}

export default RestaurantPage
