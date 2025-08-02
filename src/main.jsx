import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./main.css";
import Home from "./pages/home";
import Root from "./pages/root";
import { ColorSchemeProvider } from "./contexts/ColorSchemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorSchemeProvider>
      <RouterProvider router={router} />
    </ColorSchemeProvider>
  </StrictMode>
);
