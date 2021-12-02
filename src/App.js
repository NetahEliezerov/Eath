import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import MainNavbarComponent from './components/Navbar/Navbar';
import './App.css';
import HomePage from "./components/Home/HomePage";
import ExplorePage from './components/Explore/ExplorePage';
import RestaurantPage from './components/Restaurant/RestaurantPage';
import MyAccount from "./components/MyAccount/MyAccount";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainNavbarComponent />}>
          <Route index={true} element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="account" element={<MyAccount />} />
          <Route path="r/:restaurantId" element={<RestaurantPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;