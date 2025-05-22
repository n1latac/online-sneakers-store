import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SNEAKER_ROUTE,
} from './utils/constants';
import SneakerPage from './pages/SneakerPage';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth';

export const authRoutes = [
  // {
  //   path: ADMIN_ROUTE,
  //   Component: Admin
  // },
  // {
  //   path: BASKET_ROUTE,
  //   Component: Basket
  // }
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: SNEAKER_ROUTE + '/:id',
    Component: SneakerPage,
  },
];
