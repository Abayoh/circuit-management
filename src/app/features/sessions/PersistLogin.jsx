import { useEffect, useState } from 'react';
import { refreshAccessToken } from './session-slice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';

const PersistLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useSelector((state) => state.session.accessToken);
  const dispatch = useDispatch();
  useEffect(() => {
    const refresh = async () => {
      if (!accessToken) await dispatch(refreshAccessToken());
      setIsLoading(false);
    };
    refresh();
  }, []);
  return <>{isLoading ? <Loading /> : children}</>;
};

export default PersistLogin;
