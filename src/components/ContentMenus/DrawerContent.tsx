import { FC } from 'react';
import { SwipeableDrawer } from '@mui/material';
import DrawerList from './DrawerList';
import { TabType } from '../../types/TabType';

interface DrawerContentProps {
  state: { bottom: boolean };
  toggleDrawer: any;
  tabs: TabType[];
  handleMenuItemClick: (value: string) => void;
}

const DrawerContent: FC<DrawerContentProps> = ({
  state,
  toggleDrawer,
  tabs,
  handleMenuItemClick,
}) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={state.bottom}
      onClose={toggleDrawer('bottom', false)}
      onOpen={toggleDrawer('bottom', true)}
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

export default DrawerContent;
