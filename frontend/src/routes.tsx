import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Home from "./pages/Home/Home";
import App from "./App";
import Register from "./pages/Register/Register";



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
        <Route path='' element={<Home />} />
        <Route path='/Register' element={<Register />} />
        </Route>
    )
)

export  default router
