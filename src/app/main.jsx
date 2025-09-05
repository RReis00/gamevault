import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { ThemeProvider } from "../context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Redux store provider → makes global state accessible via useSelector/useDispatch */}
    <Provider store={store}>
      {/* Theme provider → supplies theme + toggle function to the app */}
      <ThemeProvider>
        {/* Main app component (contains routing, layout, pages, etc.) */}
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
