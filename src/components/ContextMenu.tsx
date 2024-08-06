import { FC, MouseEvent } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { TabType } from '../types/TabType';
import { ViewMoreBtn } from './Btn/ViewMoreBtn';
import { MenuLongContent } from './ContentMenus/MenuLongContent';
import DrawerContent from './ContentMenus/DrawerContent';
import useDrawer from '../hook/useDrawer';

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
}) => {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { state, toggleDrawer } = useDrawer();

  return (
    <>
      <ViewMoreBtn
        open={state.bottom}
        handleMenuClick={(event: MouseEvent<HTMLElement>) => toggleDrawer('bottom', true)(event)}
      />
      {isLgScreen ? (
        <DrawerContent
          state={state}
          toggleDrawer={toggleDrawer}
          tabs={tabs}
          handleMenuItemClick={handleMenuItemClick}
        />
      ) : (
        <MenuLongContent
          anchorEl={anchorEl}
          open={open}
          handleMenuClose={handleMenuClose}
          tabs={tabs}
          handleMenuItemClick={handleMenuItemClick}
        />
      )}
    </>
  );
};

export default ContextMenu;
