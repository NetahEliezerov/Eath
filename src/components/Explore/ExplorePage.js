import React, {useState, useEffect} from 'react';
import './ExplorePage.css';
import restaurantsService from '../../services/restaurants';

const ExplorePage = () => {
    const [restaurants, setRestaurants] = useState([]);

    const getRestaurants = async () => {
        const restaurantsRes = await restaurantsService.getRestaurants();
        setRestaurants(restaurantsRes);
    }

    useEffect(() => {
        if(restaurants != []) {
            getRestaurants();
        }
    }, [])

    console.log(restaurants)
    return (
        <div>
            <div className='exploreCategory'>
                <h1 className='exploreCategoryName'>Hot Lately</h1>
                { restaurants.map((restaurant) => <div className='restaurantExplore' id={`${restaurant.restaurantId}`} style={{background: `linear-gradient(to right, ${restaurant.colors[0]}, ${restaurant.colors[1]})`}}>
                    <div className='restaurantExploreTitle'><h1>{restaurant.name} {restaurant.emoji}</h1>
                    <img className='restaurantExploreImg' src={`/assets/${restaurant.thumbnailImg}`} /></div>
                    <button className='restaurantExploreBtn' onClick={() => window.location.href = `/r/${restaurant.restaurantId}`} style={{backgroundColor: [restaurant.colors[0]]}}>Order Now</button>
                </div>) }
            </div>
        </div>
    )
}

export default ExplorePage
