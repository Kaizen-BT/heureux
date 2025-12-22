import { createRoot } from "react-dom/client";
import "./index.css";
import { App, HomeLoader } from "./routes/App.tsx";
import { createHashRouter, NavLink, RouterProvider } from "react-router";
import { StrictMode } from "react";

const router = createHashRouter([
  {
    path: "/",
    loader: HomeLoader,
    Component: App,
  },
  {
    path: "/test",
    element: (
      <div>
        <p>This is the test route</p>
        <NavLink to={"/"}>Back home</NavLink>
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
