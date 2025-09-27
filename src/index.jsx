import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/font.css";
import { RouterProvider } from "react-router-dom";
import Router from "routes";
import WalletConnectProvider from "providers/WalletConnectProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "redux/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <WalletConnectProvider>
        <Suspense>
          <RouterProvider router={Router} />
        </Suspense>
      </WalletConnectProvider>
    </Provider>
  </React.StrictMode>
);
