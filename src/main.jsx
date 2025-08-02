import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ColorSchemeProvider } from "./contexts/ColorSchemeContext";
import ErrorPage from "./error-page";
import "./main.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Root from "./pages/root";
import Signup from "./pages/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorSchemeProvider>
      <RouterProvider router={router} />
    </ColorSchemeProvider>
  </StrictMode>
);
