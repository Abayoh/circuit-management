import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { useField, useFormikContext } from 'formik';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const FileUploader = ({
  btnLabel,
  enablePreview,
  fileType,
  onfileUploaded,
  ...props
}) => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFieldValue(field.name, file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file && enablePreview) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, enablePreview]);
  return (
    <Stack direction='column' spacing={2} alignItems='center'>
      {enablePreview && (
        <CardMedia
          component='img'
          height='240'
          width='200'
          image={
            fileDataURL ? fileDataURL : '/assets/images/placeholder-image.png'
          }
          alt='customer Image'
        />
      )}
      <FormControl error={meta.error ? true : false}>
        <Button variant='contained' component='label'>
          {btnLabel}
          <input
            {...props}
            onBlur={field.onBlur}
            hidden
            type='file'
            onChange={handleChange}
            accept={fileType || 'image/*'}
          />
        </Button>
        <FormHelperText sx={{ fontSize: '16px' }}>
          { meta.error}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default FileUploader;
