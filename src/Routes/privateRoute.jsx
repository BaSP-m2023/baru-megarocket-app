import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (token && role === rest.role) {
          return <RouteComponent {...routeProps} />;
        }
        if (!role || role !== rest.role || !token) {
          return <Redirect to={'/auth/not-allowed'} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
