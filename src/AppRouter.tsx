import { createBrowserRouter } from "react-router-dom";

/** Layouts */
import UnAuthorizedLayout from "./layouts/UnAuthorizedLayout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";

/** UnAuthorized Pages */
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

/** Authorized Pages */
import Dashboard from "./pages/Dashboard";
import ReportsRouter from "./pages/reports/ReportsRouter";
import SettingsRouter from "./pages/settings/SettingsRouter";
import MetricCatalogRouter from "./pages/metrics/MetricCatalogRouter";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthorizedLayout />, //change to protected layout
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      { path: "/reports/*", element: <ReportsRouter /> },
      { path: "/settings/*", element: <SettingsRouter /> },
      { path: "/metric-catalog/*", element: <MetricCatalogRouter /> },
    ],
  },
  {
    path: "/login",
    element: <UnAuthorizedLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);
