import { FC } from 'react';
import { Box, List, MenuItem, Typography } from '@mui/material';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import { TabType } from '../../types/TabType';
import { contextMenuItemsStyles } from '../../style/style';

interface DrawerListProps {
  tabs: TabType[];
  handleMenuItemClick: (value: string) => void;
}

const DrawerList: FC<DrawerListProps> = ({ tabs, handleMenuItemClick }) => (
  <Box
    sx={{
      width: 'auto',
      height: '85vh',
      overflowY: 'auto',
    }}
    role="presentation"
    onClick={event => event.stopPropagation()}
    onKeyDown={event => event.stopPropagation()}
  >
    <Box
      sx={{
        margin: '10px auto',
        width: 100,
        height: 5,
        backgroundColor: 'black',
        borderRadius: 10,
      }}
    />
    <List>
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
    </List>
  </Box>
);

export default DrawerList;
