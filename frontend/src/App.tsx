import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import AppRouter from './components/AppRouter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { login, logout } from './store/userSlice';
import { userApi, useRefreshMutation } from './api/userApi';

const AuthChecker = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  const [triggerRefresh] = useRefreshMutation();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkUser = async () => {
      if (!token) return;

      try {
        const result = await dispatch(
          userApi.endpoints.checkAuth.initiate(),
        ).unwrap();
        dispatch(login(result));
      } catch {
        try {
          const refreshResult = await triggerRefresh().unwrap();
          localStorage.setItem('token', refreshResult.accessToken);

          const retryCheck = await dispatch(
            userApi.endpoints.checkAuth.initiate(),
          ).unwrap();
          dispatch(login(retryCheck));
        } catch {
          dispatch(logout());
        }
      }
    };

    checkUser();
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <AuthChecker />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
