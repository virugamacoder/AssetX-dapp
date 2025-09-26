import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WalletConnectProvider from "./providers/WalletConnectProvider";
import store from "./redux/store";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <WalletConnectProvider>
        <Suspense>
          <App />
        </Suspense>
      </WalletConnectProvider>
    </Provider>    
  </StrictMode>,
)
