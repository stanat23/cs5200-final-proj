import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signin from './screens/sign-in';
import Signup from './screens/sign-up';
import HotelList from './screens/hotels';
import HotelDetails from "./screens/hotel-detail";
import Invoice from "./screens/invoice";
import {ProfileProvider} from "./context/profile-context";
import ReservationList from "./screens/reservations";
import EditProfile from "./screens/edit-profile";

function App() {
  return (
    <div className="App">
        <ProfileProvider>
            <BrowserRouter>
                <div className="container row">
                    <Routes>
                        <Route path="/" element={<Signin/>}/>
                        <Route path="/signin" element={<Signin/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/hotels" element={<HotelList/>}/>
                        <Route path="/hotels/:hotelId" element={<HotelDetails/>}/>
                        <Route path="/reservations/user/:email" element={<ReservationList/>}/>
                        <Route path="/invoice/:email" element={<Invoice/>}/>
                        <Route path="/user/:email" element={<EditProfile/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </ProfileProvider>
    </div>
  );
}

export default App;
