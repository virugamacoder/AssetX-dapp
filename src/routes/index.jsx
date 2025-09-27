import { createBrowserRouter } from "react-router-dom";
import ROUTE_PATH from "./ROUTE_PATH";
import RootLayout from "layouts/rootLayout";

const Router = createBrowserRouter([
    {
        path: ROUTE_PATH.ROOT,
        element: <RootLayout />,
        // element: <ProtectedRoute Element={<RootLayout />} />,
        // errorElement: <ErrorPage />,
        children: [
        
        ],
    },
])

export default Router;