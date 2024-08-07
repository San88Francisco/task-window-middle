import { FC, MouseEvent } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import { TabType } from '../../types/TabType';
import { contextMenuItemsStyles, contextMenuStyles } from '../../style/style';

type PropsType = {
  anchorEl: null | HTMLElement;
  open: boolean;
  tabs: TabType[];
  handleMenuClose: (event: MouseEvent<HTMLElement>) => void;
  handleMenuItemClick: (value: string) => void;
};

export const MenuLongContent: FC<PropsType> = ({
  anchorEl,
  open,
  handleMenuClose,
  tabs,
  handleMenuItemClick,
}) => {
  return (
    <Menu
      id="long-menu"
      MenuListProps={{ 'aria-labelledby': 'long-button' }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      PaperProps={{
        style: contextMenuStyles,
      }}
    >
      {tabs.map(option => (
        <MenuItem
          key={option.value}
          onClick={() => handleMenuItemClick(option.value)}
          sx={contextMenuItemsStyles}
        >
          {option.pinned && (
            <Typography component="span">
              <BookmarkTwoToneIcon sx={{ fontSize: 20 }} />
            </Typography>
          )}
          <Typography component="p" sx={{ ml: 0.5 }}>
            {option.label}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};
