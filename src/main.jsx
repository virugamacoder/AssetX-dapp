import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WalletConnectProvider from "providers/WalletConnectProvider";
import store from "./redux/store";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Router from "routes";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <WalletConnectProvider>
        <Suspense>
          <RouterProvider router={Router} />
        </Suspense>
      </WalletConnectProvider>
    </Provider>    
  </StrictMode>,
)
