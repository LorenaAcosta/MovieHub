// @ts-ignore
import AppRouter from "./routes/AppRouter";
import * as React from "react";
import {AuthProvider} from "./features/auth/AuthContext.js";
import { FavoritesProvider } from "./features/favorites/FavoritesContext";


const App: React.FC = () =>
    <FavoritesProvider>
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    </FavoritesProvider>

export default App;
