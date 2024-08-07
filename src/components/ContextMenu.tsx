import { FC, MouseEvent } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { TabType } from '../types/TabType';
import { ViewMoreBtn } from './Btn/ViewMoreBtn';
import { MenuLongContent } from './ContentMenus/MenuLongContent';
import { DrawerContent } from './ContentMenus/DrawerContent';
import useDrawer from '../hook/useDrawer';

type TypeProps = {
  anchorEl: null | HTMLElement;
  open: boolean;
  tabs: TabType[];
  handleMenuItemClick: (value: string) => void;
  handleMenuClose: () => void;
  handleMenuClick: (event: MouseEvent<HTMLElement>) => void;
};

export const ContextMenu: FC<TypeProps> = ({
  anchorEl,
  tabs,
  handleMenuItemClick,
  handleMenuClose,
  handleMenuClick,
}) => {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { isOpen, toggleDrawer } = useDrawer();

  const handleMenuToggle = (event: MouseEvent<HTMLElement>) => {
    if (isLgScreen) {
      toggleDrawer(true)(event);
    } else {
      handleMenuClick(event);
    }
  };

  return (
    <>
      <ViewMoreBtn open={isOpen} handleMenuClick={handleMenuToggle} />
      {isLgScreen ? (
        <DrawerContent
          state={isOpen}
          toggleDrawer={toggleDrawer}
          tabs={tabs}
          handleMenuItemClick={handleMenuItemClick}
        />
      ) : (
        <MenuLongContent
          anchorEl={anchorEl}
          open={!!anchorEl}
          handleMenuClose={handleMenuClose}
          tabs={tabs}
          handleMenuItemClick={handleMenuItemClick}
        />
      )}
    </>
  );
};

