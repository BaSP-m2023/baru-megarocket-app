import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Switch, useLocation, useHistory, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getAuth } from 'Redux/Auth/thunks';

import PrivateRoute from './privateRoute';
import { tokenListener } from 'Components/helper/firebase';
import Loader from 'Components/Shared/Loader';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

const HomeRoute = lazy(() => import('./home'));
const AuthRoutes = lazy(() => import('./auth'));
const AdminRoutes = lazy(() => import('./admins'));
const SuperAdminRoutes = lazy(() => import('./superAdmins'));
const MemberRoutes = lazy(() => import('./members'));
const TrainerRoutes = lazy(() => import('./trainers'));

const Routes = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const setupTokenListener = async () => {
      await new Promise((resolve) => {
        tokenListener(resolve);
      });

      const token = sessionStorage.getItem('token');
      const role = sessionStorage.getItem('role');

      if (location.pathname === '/') {
        const paths = {
          SUPER_ADMIN: '/user/super-admin',
          ADMIN: '/user/admin',
          TRAINER: '/user/trainer',
          MEMBER: '/user/member'
        };
        if (role) {
          history.push(paths[role]);
        }
      }

      if (token) {
        dispatch(getAuth(token));
      }
      setIsLoading(false);
    };

    setupTokenListener();
  }, [dispatch]);

  if (isLoading) {
    return (
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
    );
  }

  return (
    <Suspense>
      <Switch>
        <Route exact path="/" component={HomeRoute} />
        <Route path="/auth" component={AuthRoutes} />
        <PrivateRoute path="/user/super-admin" role="SUPER_ADMIN" component={SuperAdminRoutes} />
        <PrivateRoute path="/user/admin" role="ADMIN" component={AdminRoutes} />
        <PrivateRoute path="/user/trainer" role="TRAINER" component={TrainerRoutes} />
        <PrivateRoute path="/user/member" role="MEMBER" component={MemberRoutes} />
        <Redirect to="/auth/not-found" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
