import { FC } from 'react';
import { SwipeableDrawer } from '@mui/material';
import { DrawerList } from './DrawerList';
import { TabType } from '../../types/TabType';

type PropsType = {
  state: boolean;
  tabs: TabType[];
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  handleMenuItemClick: (value: string) => void;
};

export const DrawerContent: FC<PropsType> = ({
  state,
  toggleDrawer,
  tabs,
  handleMenuItemClick,
}) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={state}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      PaperProps={{
        sx: {
          height: '90vh',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        },
      }}
    >
      <DrawerList tabs={tabs} handleMenuItemClick={handleMenuItemClick} />
    </SwipeableDrawer>
  );
};

