import {BrowserRouter,Routes, Route, Navigate} from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import Spinner from "../components/Spinner.js";
import React, {JSX, Suspense} from "react";
import Watched from "../pages/Watched";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

const Login= React.lazy(() => import("../pages/Login.js"));
const MovieDetails = React.lazy(() =>  import("../pages/MovieDetails.js"));
const Home = React.lazy(() =>  import("../pages/Home.js"));
const Favorites = React.lazy(() =>  import("../pages/Favorites.js"));
const Profile = React.lazy(() =>  import("../pages/Profile.js"));
const Register = React.lazy(() => import("../pages/Register.js"));

const AppRouter: React.FC = () => (
    <BrowserRouter>
        <Suspense fallback={<Spinner />}>
            <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/movie/:id" element={<MovieDetails />}/>
                    <Route path="/login"     element={<Login/>}/>
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/profile"   element={<PrivateRoute><Profile/></PrivateRoute>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/watched" element={<Watched />} />
            </Routes>
        </Suspense>
    </BrowserRouter>
)

export default AppRouter;