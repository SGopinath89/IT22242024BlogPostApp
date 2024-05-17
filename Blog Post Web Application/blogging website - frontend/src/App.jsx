import Navbar from "./components/navbar.component";
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";

// Create a context for the user authentication state
const UserContext = createContext({});

const App = () => {
    const [userAuth, setUserAuth] = useState({ access_token: null });

    // useEffect to check if a user is stored in the session on component mount
    useEffect(() => {
        const userInSession = lookInSession("user");
        if (userInSession) {
            setUserAuth(JSON.parse(userInSession));
        }
    }, []);

    return (
        <UserContext.Provider value={{ userAuth, setUserAuth }}>
            <Navbar /> {/* Ensure Navbar is outside of Routes so it's always displayed */}
            <Routes>
                <Route path="signin" element={<UserAuthForm type="sign-in" />} />
                <Route path="signup" element={<UserAuthForm type="sign-up" />} />
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
