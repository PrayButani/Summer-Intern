import React from 'react';
import { Alert as MuiAlert, Snackbar } from '@mui/material';
import { useAlert } from '../../context/AlertContext';

const Alert = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert) return null;

  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={6000}
      onClose={hideAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert
        onClose={hideAlert}
        severity={alert.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert; 