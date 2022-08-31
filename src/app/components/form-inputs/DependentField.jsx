import React from 'react';
import { useField, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import PropTypes, { object } from 'prop-types';

const DependentField = ({
  arr,
  dependentFieldName,
  searchOn,
  propertyName,
  ...props
}) => {
  const {
    values: { [dependentFieldName]: dependentValue },
    touched,
    setFieldValue,
  } = useFormikContext();

  const dependentFieldTouched = touched[dependentFieldName];

  const [field, meta] = useField(props);

  React.useEffect(() => {
    // set the value of textC, based on textA and textB
    const value = arr.find((c) => c[searchOn] === dependentValue) || {};

    setFieldValue(props.name, value[propertyName] || '');
  }, [
    arr,
    searchOn,
    dependentValue,
    props.name,
    propertyName,
    setFieldValue,
    dependentFieldTouched,
  ]);

  return (
    <>
      <TextField
        {...props}
        {...field}
        helperText={meta.touched && meta.error ? meta.error : null}
        error={meta.touched && meta.error ? true : false}
      />
    </>
  );
};

DependentField.propTypes = {
  arr: PropTypes.arrayOf(object).isRequired,
  dependentFieldName: PropTypes.string.isRequired,
  searchOn: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
};

export default DependentField;
