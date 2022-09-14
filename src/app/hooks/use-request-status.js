import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestStates } from '../models/request-state';

const useRequestStatus = (
  state,
  setState,
  onSuccess = () => {},
  onError = () => {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state === requestStates.failed) {
      dispatch(setState(requestStates.idle));
      setIsLoading(false);
      onError();
    } else if (state === requestStates.loading) {
      setIsLoading(true);
    } else if (state === requestStates.succeeded) {
      dispatch(setState(requestStates.idle));
      setIsLoading(false);
      onSuccess();
    } else if (state === requestStates.loaded) {
      dispatch(setState(requestStates.idle));
      setIsLoading(false);
      onSuccess(requestStates.loaded);
    }
    /* eslint-disable */
  }, [state]);

  return isLoading;
};

export default useRequestStatus;
