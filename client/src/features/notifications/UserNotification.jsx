import * as React from 'react';
import { setNotificationDisplay } from './notificationsSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function UserNotifications() {
  const dispatch = useDispatch();
  const notificationType = useSelector((state) => state.notifications.notificationType);
  const notificationMessage = useSelector((state) => state.notifications.notificationMessage);
  const notificationDisplay = useSelector((state) => state.notifications.notificationDisplay);
  const notificationVertical = useSelector((state) => state.notifications.notificationVertical);
  const notificationHorizontal = useSelector((state) => state.notifications.notificationHorizontal);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setNotificationDisplay(false));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>      
      <Snackbar 
        open={notificationDisplay} 
        autoHideDuration={6000} 
        onClose={handleClose} 
        anchorOrigin= 
          {{vertical: notificationVertical, 
            horizontal: notificationHorizontal}}
            >
        <Alert onClose={handleClose} severity={notificationType} sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}



