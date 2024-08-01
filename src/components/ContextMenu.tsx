import { FC, MouseEvent } from 'react';
import { Menu, MenuItem, Box } from '@mui/material';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import { TabType } from '../types/TabType';
import { ViewMoreBtn } from './ViewMoreBtn';

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
        style: {
          maxHeight: 48 * 10.5,
          width: 200,
          borderRadius: 8,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {tabs.map(option => (
        <MenuItem
          key={option.value}
          onClick={() => handleMenuItemClick(option.value)}
          sx={{
            fontSize: '16px',
            fontWeight: '400',
            color: '#333',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              color: '#000',
            },
            '&:focus': {
              backgroundColor: '#e0e0e0',
              color: '#000',
            },
          }}
        >
          {option.pinned && (
            <Box component="span" sx={{ mr: '5px' }}>
              <BookmarkTwoToneIcon sx={{ fontSize: 20 }} />
            </Box>
          )}
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  </>
);

export default ContextMenu;
