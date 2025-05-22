import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import cl from './NavBar.module.css';

import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from '../../utils/constants';
import { logout } from '../../store/userSlice';
import { RootState } from '../../store';
import { useLogoutMutation } from '../../api/userApi';
import { User } from '../../interfaces';
import { RolesEnum } from '../../enum';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [logoutApi] = useLogoutMutation();

  const handleLogout = () => {
    logoutApi();
    dispatch(logout());
  };

  return (
    <nav className={cl.navbar}>
      <div className={cl.navbarContainer}>
        <Link className={cl.navbarBrand} to={HOME_ROUTE}>
          Sneakers Store
        </Link>
        <div className={cl.navbarButtons}>
          {user?.isAuth ? (
            <>
              {user?.user?.role === RolesEnum.ADMIN ? (
                <button
                  className={cl.navButton}
                  onClick={() => navigate(ADMIN_ROUTE)}
                >
                  Admin page
                </button>
              ) : null}
              <button className={cl.navButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button
              className={cl.navButton}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
