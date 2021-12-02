import React from 'react'

const MealComponent = (props) => {
    return (
        <div className='restaurantMealItem' style={{background: `linear-gradient(to right, ${props.meal.colors[0]}, ${props.meal.colors[1]})`}}>
            <div className='restaurantMealInfo'>
                <h1>{props.meal.mealName}</h1>
                <h3>{props.meal.including.map((mealItem) => <p className='mealItem'>{mealItem},</p>)}</h3>
                <h1>{props.meal.priceInEth} ETH</h1>
            </div>
            <div className='restaurantMealImgDiv'>
            <img className='restaurantMealImg' src={`/assets/${props.meal.mealImg}`} />
            { !props.cart.find((e) => e == props.meal) && <button className='restaurantMealAddToCart' onClick={() => props.setCart([...props.cart, props.meal])}>Add to cart</button> }
            { props.cart.find((e) => e == props.meal) && <button className='restaurantMealAddToCart' onClick={() => props.setCart(props.cart.filter((e) => e !== props.meal))}>Remove from cart</button> }
            </div>
        </div>
    )
}

export default MealComponent
