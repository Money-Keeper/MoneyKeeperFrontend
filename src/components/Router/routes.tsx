import type { Route } from '@tanstack/react-location';
import { Navigate } from '@tanstack/react-location';

import ExpenseCreate from '../../pages/ExpenseCreate/ExpenseCreate';
import NotFound from '../../pages/NotFound/NotFound';

const routes: Route[] = [
  {
    path: '/',
    element: <Navigate to="/invoices" />,
  },
  {
    path: 'invoices',
    children: [
      {
        path: '/',
        element: <Navigate to="/invoices/create" />,
      },
      {
        path: 'create',
        element: <ExpenseCreate />,
      },
      {
        path: ':invoiceId',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
