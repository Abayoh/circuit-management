import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, matchRoutes } from 'react-router-dom';
import routes from '../features/root-routes';

const user = {
  name: 'alex',
  role: ['admin'],
};

const checkAuth = (routes, location, navigate) => {
  //retrieving routes user wants to visit
  const matchedRoutes = matchRoutes(routes, location);

  if (location.pathname === '/404') {
    return true;
  }

  if (!Boolean(matchedRoutes)) {
    navigate('/404', { replace: true });
    return true;
  }

  const action = matchedRoutes[0].route.action;
  //if the route is public
  if (action === '*') {
    return true;
    //if the user cannot visit route
  } else if (!(action === user.role.find((role) => action === role))) {
    navigate('/login');
    return false;
  }

  //if the user have permission to visit route
  return true;
};

function RouteGuide({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let canNavigate = checkAuth(routes, location, navigate);
    setIsAuthorized(canNavigate);
    /* eslint-disable */
  }, [location]);

  return isAuthorized ? <>{children}</> : <></>;
}

export default RouteGuide;
