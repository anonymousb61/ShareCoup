import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProfilePrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/homepage" replace={true} state={{ from: props.location }} />
        )
      }
    />
  );
};

export default ProfilePrivateRoute;

