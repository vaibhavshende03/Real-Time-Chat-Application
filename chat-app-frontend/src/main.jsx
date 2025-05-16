import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MyRoutes from "./config/MyRoutes.jsx";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./context/chatContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster position="top-center" reverseOrder={true} />
    <ChatProvider>
      <MyRoutes />
    </ChatProvider>
  </BrowserRouter>
);
