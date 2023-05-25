import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import { persistor, store } from "./app/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AXiIRotpOGeNahhygSqaLF5M7m3YRxmVqVxzXGT2WahkQ4No18bzHB7PRGqu9hDeSxozketg3Ien3uC_",
            }}
          >
            <App />
          </PayPalScriptProvider>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
