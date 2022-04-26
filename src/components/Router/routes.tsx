import type { Route } from '@tanstack/react-location';
import { Navigate } from '@tanstack/react-location';

import { Api } from '../../api';
import ExpenseCreate from '../../pages/ExpenseCreate/ExpenseCreate';
import { ExpenseEdit } from '../../pages/ExpenseEdit/ExpenseEdit';
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
        path: ':id',
        element: <ExpenseEdit />,
        loader: async ({ params: { id } }) => ({
          expense: await Api.Expense.getOne(id),
        }),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
