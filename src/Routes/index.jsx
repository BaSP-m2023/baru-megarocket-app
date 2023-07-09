import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getAuth } from 'Redux/Auth/thunks';

import PrivateRoute from './privateRoute';
import { tokenListener } from 'Components/helper/firebase';
import Loader from 'Components/Shared/Loader';

const HomeRoute = lazy(() => import('./home'));
const AuthRoutes = lazy(() => import('./auth'));
const AdminRoutes = lazy(() => import('./admins'));
const SuperAdminRoutes = lazy(() => import('./superAdmins'));
const MemberRoutes = lazy(() => import('./members'));
const TrainerRoutes = lazy(() => import('./trainers'));

const Routes = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [path, setPath] = useState();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const setupTokenListener = async () => {
      await new Promise((resolve) => {
        tokenListener(resolve);
      });

      const token = sessionStorage.getItem('token');
      const role = sessionStorage.getItem('role');
      setUser({ token, role });
      setPath(location.pathname);

      if (token) {
        dispatch(getAuth(token));
      }
    };

    setupTokenListener();
  }, [dispatch]);

  useEffect(() => {
    if (path === '/') {
      const paths = {
        SUPER_ADMIN: '/user/super-admin',
        ADMIN: '/user/admin',
        TRAINER: '/user/trainer',
        MEMBER: '/user/member'
      };
      if (user?.role && paths[user?.role]) {
        history.push(paths[user.role]);
      }
    } else {
      history.push(path);
    }
  }, [user?.token, path]);

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Loader />
        </div>
      }
    >
      <Switch>
        <Route exact path="/" component={HomeRoute} />
        <Route path="/auth" component={AuthRoutes} />
        <PrivateRoute path="/user/super-admin" role="SUPER_ADMIN" component={SuperAdminRoutes} />
        <PrivateRoute path="/user/admin" role="ADMIN" component={AdminRoutes} />
        <PrivateRoute path="/user/trainer" role="TRAINER" component={TrainerRoutes} />
        <PrivateRoute path="/user/member" role="MEMBER" component={MemberRoutes} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
