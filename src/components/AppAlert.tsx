import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { hideAlert } from '~store/alertSlice';
import { useAppDispatch, useAppSelector } from '~utils/userHooks';

export const AppAlert: React.FC = () => {
  const { isShown, type, content } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    <>
      <Snackbar open={isShown} autoHideDuration={2000} onClose={handleClose}>
        <Alert variant="filled" severity={type}>
          {content}
        </Alert>
      </Snackbar>
    </>
  );
};
