import React from 'react';
import { useField, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';

const ShareDependentField = (props) => {
  const [disabled, setDisabled] = React.useState(true);
  const {
    values: { isShareholder },
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    if (isShareholder) {
      setDisabled(false);
    } else {
      setFieldValue(props.name, 0);
      setDisabled(true);
    }
  }, [isShareholder, setFieldValue, props.name]);

  return (
    <>
      {isShareholder && <TextField {...props} {...field} disabled={disabled} />}
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

export default ShareDependentField;
