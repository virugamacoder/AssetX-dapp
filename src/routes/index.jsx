import { createBrowserRouter, Navigate } from "react-router-dom";
import ROUTE_PATH from "./ROUTE_PATH";
import RootLayout from "layouts/rootLayout";
import { SecurityTokenDetails, SecurityTokensPage } from "pages/index";
import IndividualKYCPage from "pages/kyc/individualKyc";
import CorporateKYCPage from "pages/kyc/corporateKyc";

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
        ],
    },
])

export default Router;