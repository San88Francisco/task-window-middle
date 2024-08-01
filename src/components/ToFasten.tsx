import { FC } from 'react';
import { Menu, MenuItem } from '@mui/material';

type TypeProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onPin: () => void;
};

const menuStyles = {
  '& .MuiMenu-paper': {},
  '& .MuiMenu-list': {
    p: 0,
  },
};

const ToFaster: FC<TypeProps> = ({ anchorEl, onClose, onPin }) => {
  return (
    <Menu sx={menuStyles} anchorEl={anchorEl} open={!!anchorEl} onClose={onClose}>
      <MenuItem
        sx={{ p: 1, border: '2px solid rgba(174, 182, 206, 0.2)', borderRadius: 1 }}
        onClick={onPin}
      >
        Tab anpinnen
      </MenuItem>
    </Menu>
  );
};

export default ToFaster;
