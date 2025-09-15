// src/main.jsx
// client/src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppRouter from "./routes/AppRouter";
import "./index.css"; // Tailwind entry (make sure this exists and imports tailwind directives)

// Optional: global CSS (you can remove if not used)
// import "./styles/global.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
