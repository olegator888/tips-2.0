import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routing";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(<RouterProvider router={router} />);
}
