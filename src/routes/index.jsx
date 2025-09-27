import { createBrowserRouter, Navigate } from "react-router-dom";
import ROUTE_PATH from "./ROUTE_PATH";
import RootLayout from "layouts/rootLayout";
import ComponentsPage from "pages/Components";
import { AddLiquidity, CorporateKYCPage, IndividualKYCPage, InvestmentDetailPage, InvestmentsPage, KYCPage, LiquidityPage, LiquiditySettings, MarketDetailPage, NotFoundPage, PopularMarketsPage, SecurityTokenDetails, SecurityTokensPage, SwapPage } from "pages";

const Router = createBrowserRouter([
    {
        path: ROUTE_PATH.ROOT,
        element: <RootLayout />,
        // element: <ProtectedRoute Element={<RootLayout />} />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, element: <Navigate to={ROUTE_PATH.SECTURITY_TOKENS} /> },
            { path: `${ROUTE_PATH.KYC}`, element: <KYCPage /> },
            { path: `${ROUTE_PATH.KYC_INDIVIDUAL}`, element: <IndividualKYCPage /> },
            { path: `${ROUTE_PATH.KYC_CORPORATE}`, element: <CorporateKYCPage /> },
            { path: `${ROUTE_PATH.INVESTMENTS}`, element: <InvestmentsPage /> },
            { path: `${ROUTE_PATH.INVESTMENTS}/:id`, element: <InvestmentDetailPage /> },
            { path: `${ROUTE_PATH.SECTURITY_TOKENS}`, element: <SecurityTokensPage /> },
            { path: `${ROUTE_PATH.SECTURITY_TOKENS}/:id`, element: <SecurityTokenDetails /> },
            { path: `${ROUTE_PATH.POPULAR_MARKETS}`, element: <PopularMarketsPage /> },
            { path: `${ROUTE_PATH.POPULAR_MARKETS}/:id`, element: <MarketDetailPage /> },
            { path: `${ROUTE_PATH.LIQUIDITY}`, element: <LiquidityPage /> },
            { path: `${ROUTE_PATH.LIQUIDITY_SETTINGS}`, element: <LiquiditySettings /> },
            { path: `${ROUTE_PATH.ADD_LIQUIDITY}`, element: <AddLiquidity /> },
            { path: `${ROUTE_PATH.SWAP}`, element: <SwapPage /> },
            { path: `${ROUTE_PATH.SWAP_SETTINGS}`, element: <LiquiditySettings /> },
            { path: `${ROUTE_PATH.COMPONENTS}`, element: <ComponentsPage /> },
            // Catch-all route for 404 pages
            { path: "*", element: <NotFoundPage /> },
        ],
    },
])

export default Router;