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
export const App = () => {
    return (<>
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoute />} >
                    <Route path='/' element={<Main />} />
                    <Route path="/fitness" element={<Fitness />} />
                    <Route path="/fitness/:excersie" element={<FitnessSearch />} />
                </Route>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
            </Routes>
        </Router>
    </>)
}
