import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'
import SignIn from "./pages/signin.jsx";
import PrivateRoute from "./components/guardRoute.jsx";
import Main from "./pages/mainPage.jsx";
import SignUp from "./pages/signUp.jsx";
import Fitness from "./pages/fitnessPage.jsx";
import FitnessSearch from "./pages/fitnessSearchPage.jsx";
import ExcerciseDetail from "./pages/fitnessDetailPage.jsx";
import EatFood from "./pages/Eatfood.jsx";
import CalBurn from "./pages/CalBurn.jsx";
import RecordPage from "./pages/recordPage.jsx";
import FoodDetail from "./pages/foodDetail.jsx";
import EverdayCal from "./pages/EverydayCal.jsx";
import EverydayNutri from "./pages/EverydayNuitri.jsx";
import Last7daycal from "./pages/Last7dayCal.jsx";
import Profile from "./pages/profile.jsx";
export const App = () => {
    return (<>
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoute />} >
                    <Route path='/' element={<Main />} />
                    <Route path="/fitness" element={<Fitness />} />
                    <Route path="/fitness/:excersie" element={<FitnessSearch />} />
                    <Route path="/fitness/:excersie/:name" element={< ExcerciseDetail />} />
                    <Route path="/record" element={<RecordPage />} />
                    <Route path="/eatfood" element={<EatFood />} />
                    <Route path="/calburn" element={<CalBurn />} />
                    <Route path="/eatfood/:food_id" element={<FoodDetail />} />
                    <Route path="/daycal/:date" element={<EverdayCal />} />
                    <Route path="/daynutri/:date" element={<EverydayNutri />} />
                    <Route path="/last7days" element={<Last7daycal />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
            </Routes>
        </Router>
    </>)
}
