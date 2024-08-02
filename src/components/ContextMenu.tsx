import { FC, MouseEvent } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import { TabType } from '../types/TabType';
import { ViewMoreBtn } from './Btn/ViewMoreBtn';
import { contextMenuItemsStyles, contextMenuStyles } from '../style/style';

type TypeProps = {
  anchorEl: null | HTMLElement;
  open: boolean;
  tabs: TabType[];
  handleMenuItemClick: (value: string) => void;
  handleMenuClose: () => void;
  handleMenuClick: (event: MouseEvent<HTMLElement>) => void;
};

const ContextMenu: FC<TypeProps> = ({
  anchorEl,
  open,
  tabs,
  handleMenuItemClick,
  handleMenuClose,
  handleMenuClick,
}) => (
  <>
    <ViewMoreBtn open={open} handleMenuClick={handleMenuClick} />
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
  </>
);

export default ContextMenu;
