

const PrivateRoute = ({children}) => {
    const {user} = useAuth();
    return user ? children : <Navigate to="/login" />;
}