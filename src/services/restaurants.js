import restaurantsJson from './restaurants.json';
import axios from 'axios';

class Restaurants {
    constructor() {

    }

    getRestaurants = async () => (await axios.get('http://localhost:5144/getRestaurants')).data;
}

export default new Restaurants();