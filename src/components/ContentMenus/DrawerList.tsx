import { FC } from 'react';
import { Box, List, MenuItem, Typography } from '@mui/material';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import { TabType } from '../../types/TabType';
import { contextMenuItemsStyles, drawerBoxStyles, drawerPaperStyles } from '../../style/style';

type PropsType = {
  tabs: TabType[];
  handleMenuItemClick: (value: string) => void;
};

export const DrawerList: FC<PropsType> = ({ tabs, handleMenuItemClick }) => (
  <Box
    sx={drawerPaperStyles}
    role="presentation"
    onClick={event => event.stopPropagation()}
    onKeyDown={event => event.stopPropagation()}
  >
    <Box sx={drawerBoxStyles} />
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

