import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, matchRoutes } from 'react-router-dom';
import routes from '../features/root-routes';
import { getUser } from '../features/sessions/session-slice';
import { useSelector } from 'react-redux';

const checkAuth = (routes, location, navigate, user) => {
  
  //retrieving routes user wants to visit
  const matchedRoutes = matchRoutes(routes, location);
   
  if (location.pathname === '/404') {
    return true;
  }
  //stop user from visiting the login page when l
  if (location.pathname === '/login' && user) {
    return navigate(-1);
  }
  
  //go to 404 page is the page is not available
  if (!Boolean(matchedRoutes)) {
    navigate('/404', { replace: true });
    return true;
  }

  const action = matchedRoutes[0].route.action;
  //allow all public routes
  if (action === '*') {
    return true;
    //go to the login page when user is not sign in
  } else if (!user) {
    navigate('/login', {state:{from:location}, replace:true});
    return false;
    //go the the unauthorize page if user is not authorize to visit the requested page
  } else if (!(action === user.roles.find((role) => action === role))) {
    navigate('/unauthorize', {replace:true});
    return false;
  }

  //if the user have permission to visit route
  return true;
};

function RouteGuide({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const user = useSelector(getUser);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let canNavigate = checkAuth(routes, location, navigate, user);
    setIsAuthorized(canNavigate);
    /* eslint-disable */
  }, [location]);

  return isAuthorized ? <>{children}</> : <></>;
}

export default RouteGuide;
