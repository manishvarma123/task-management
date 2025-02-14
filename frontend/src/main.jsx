import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import "primereact/resources/primereact.min.css"; // Core styles
import "primeicons/primeicons.css"; // PrimeIcons styles
import "primereact/resources/themes/lara-light-indigo/theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer position="bottom-right" />

        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
