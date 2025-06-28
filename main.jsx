import React from "react";
import ReactDOM from "react-dom/client";
import CalendarGrid from "./components/CalendarGrid.jsx";
import "./index.css"; // if you have Tailwind or your own styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CalendarGrid />
  </React.StrictMode>
);
