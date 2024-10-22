import { createBrowserRouter, Navigate } from "react-router-dom";
import { BanquetsPage } from "@/pages/banquets";
import { ErrorPage } from "@/pages/error-page";
import { WaitersListPage } from "@/pages/waiters-list";
import { WaitersAccountingPage } from "@/pages/waiters-accounting";
import { AppRoutes, START_PAGE } from "@/shared/routing";
import { App } from "@/app/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to={AppRoutes.BANQUETS} /> },
          {
            path: AppRoutes.BANQUETS,
            element: <BanquetsPage />,
          },
          {
            path: AppRoutes.WAITERS_ACCOUNTING,
            element: <WaitersAccountingPage />,
          },
          {
            path: AppRoutes.WAITERS_LIST,
            element: <WaitersListPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={START_PAGE} />,
  },
]);
