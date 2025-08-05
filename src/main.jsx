import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ColorSchemeProvider } from "./contexts/ColorSchemeContext";
import ErrorPage from "./error-page";
import "./main.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Root from "./pages/root";
import Signup from "./pages/signup";
import Share from "./pages/share";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/:folderId",
        element: <Home />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/share/:fileId",
        element: <Share />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      { path: "/logout", element: <Logout /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorSchemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ColorSchemeProvider>
  </StrictMode>
);
