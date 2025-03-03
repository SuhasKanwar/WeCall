import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { SocketProvider } from "./context/SocketProvider";
import { ThemeProvider } from "./context/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SocketProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SocketProvider>
  </BrowserRouter>
);