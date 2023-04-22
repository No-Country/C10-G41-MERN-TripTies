import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Log from "./components/Log/Log";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import AboutUs from "./components/AboutUs/AboutUs";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import Saved from "./components/Saved/Saved";
import PlaceIVisited from "./components/PlaceIVisited/PlaceIVisited";
import CompleteProfile from "./components/completeProfile/completeProfile";
import Profile from "./components/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Log />,
  },
  {
    path: "/completeProfile",
    element: <CompleteProfile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
