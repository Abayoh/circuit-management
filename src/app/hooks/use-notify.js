import { useSnackbar } from 'notistack';
const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();
  const notify = (message, position, variant) =>
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: position.y,
        horizontal: position.x,
      },
      autoHideDuration: 3000,
    });
  return notify;
};

export default useNotify;
