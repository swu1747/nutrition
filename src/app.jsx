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
export const App = () => {
    return (<>
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoute ><Main /></PrivateRoute >} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
            </Routes>
        </Router>
    </>)
}
