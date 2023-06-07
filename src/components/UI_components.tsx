import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const SideButton = styled(Button)({
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
  position: 'fixed',
  top: '50%',
  right: 0,
  transform: 'rotate(90deg)',
  transformOrigin: 'top right',
});
