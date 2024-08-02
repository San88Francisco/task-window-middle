import { FC } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { menuItemStyles, menuStyles } from '../style/style';

type TypeProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onPin: () => void;
};

const ToFaster: FC<TypeProps> = ({ anchorEl, onClose, onPin }) => {
  return (
    <Menu sx={menuStyles} anchorEl={anchorEl} open={!!anchorEl} onClose={onClose}>
      <MenuItem sx={menuItemStyles} onClick={onPin}>
        Tab anpinnen
      </MenuItem>
    </Menu>
  );
};

export default ToFaster;
