import { createBrowserRouter, Navigate } from "react-router-dom";
import ROUTE_PATH from "./ROUTE_PATH";
import RootLayout from "layouts/rootLayout";
import { SecurityTokenDetails, SecurityTokensPage } from "pages/index";
import IndividualKYCPage from "pages/kyc/individualKyc";
import CorporateKYCPage from "pages/kyc/corporateKyc";
import LiquidityPage from "pages/liquidity/liquidityList";
import LiquiditySettings from "pages/liquidity/liquiditySettings";
import AddLiquidity from "pages/liquidity/addLiquidity";

const Router = createBrowserRouter([
    {
        path: ROUTE_PATH.ROOT,
        element: <RootLayout />,
        // element: <ProtectedRoute Element={<RootLayout />} />,
        // errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Navigate to={ROUTE_PATH.SECTURITY_TOKENS} /> },
            { path: `${ROUTE_PATH.KYC_INDIVIDUAL}`, element: <IndividualKYCPage /> },
            { path: `${ROUTE_PATH.KYC_CORPORATE}`, element: <CorporateKYCPage /> },
            { path: `${ROUTE_PATH.SECTURITY_TOKENS}`, element: <SecurityTokensPage /> },
            { path: `${ROUTE_PATH.SECTURITY_TOKENS}/:id`, element: <SecurityTokenDetails /> },
            { path: `${ROUTE_PATH.LIQUIDITY}`, element: <LiquidityPage /> },
            { path: `${ROUTE_PATH.LIQUIDITY_SETTINGS}`, element: <LiquiditySettings /> },
            { path: `${ROUTE_PATH.ADD_LIQUIDITY}`, element: <AddLiquidity /> },
            { path: `${ROUTE_PATH.SWAP}`, element: <SwapPage /> },
        ],
    },
])

export default Router;