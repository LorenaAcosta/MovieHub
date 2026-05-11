import {BrowserRouter,Routes, Route, Navigate} from "react-router-dom";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import MovieDetails from "../pages/MovieDetails.js";
import Profile from "../pages/Profile.js";
import Favorites from "../pages/Favorites";
import { useAuth } from "../features/auth/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

const AppRouter: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/movie/:id" element={<MovieDetails />}/>
            <Route path="/login"     element={<Login/>}/>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile"   element={
                <PrivateRoute><Profile/></PrivateRoute>
            } />

        </Routes>
    </BrowserRouter>
)

export default AppRouter;