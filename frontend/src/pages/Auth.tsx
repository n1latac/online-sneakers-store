import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login as loginAction } from '../store/userSlice';
import cl from '../styles/Auth.module.css';
import { useLoginMutation, useRegistrationMutation } from '../api/userApi';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from '../utils/constants';
import { useDispatch } from 'react-redux';

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginApi, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();
  const [registerApi, { isLoading: regLoading, error: regError }] =
    useRegistrationMutation();

  const handleClick = async () => {
    try {
      const user = isLogin
        ? await loginApi({ email, password }).unwrap()
        : await registerApi({ email, password }).unwrap();

      dispatch(loginAction(user));
      navigate(HOME_ROUTE);
    } catch (err: any) {
      alert(err.data?.message || 'Ошибка авторизации');
    }
  };

  const loading = loginLoading || regLoading;

  return (
    <div className={cl.authContainer}>
      <div className={cl.authCard}>
        <h2 className={cl.authTitle}>
          {isLogin ? 'Authentication' : 'Registration'}
        </h2>

        <div className={cl.formGroup}>
          <label htmlFor="email" className={cl.formLabel}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={cl.formControl}
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={cl.formGroup}>
          <label htmlFor="password" className={cl.formLabel}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={cl.formControl}
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={cl.formFooter}>
          <div className={cl.toggleText}>
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <NavLink className={cl.link} to={REGISTRATION_ROUTE}>
                  Sign Up!
                </NavLink>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <NavLink className={cl.link} to={LOGIN_ROUTE}>
                  Log In!
                </NavLink>
              </>
            )}
          </div>
          <button
            className={cl.button}
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </div>

        {(loginError || regError) && (
          <div className={cl.errorText}>
            {(loginError as any)?.data?.message ||
              (regError as any)?.data?.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
