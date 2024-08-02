import { FC, MouseEvent } from 'react';
import { Box } from '@mui/material';
import TabGroup from './TabGroup';
import { TabType } from '../types/TabType';

type TypeProps = {
  pinnedTabs: TabType[];
  unpinnedTabs: TabType[];
  handleReorder: (newTabs: TabType[]) => void;
  handleTabClick: (value: string) => void;
  handleContextMenu: (event: MouseEvent, value: string) => void;
  handleDoubleClick: (value: string) => void;
};

const TabsSection: FC<TypeProps> = ({
  pinnedTabs,
  unpinnedTabs,
  handleReorder,
  handleTabClick,
  handleContextMenu,
  handleDoubleClick,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        overflowX: 'auto',
        cursor: 'pointer',
        position: 'relative',
        pb: 0.6,
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(127, 133, 141, 0.2)',
          borderRadius: '4px',
          transition: 'all .3s ease',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(127, 133, 141, 0.4)',
        },
      }}
    >
      <TabGroup
        tabs={pinnedTabs}
        onReorder={newPinnedTabs => handleReorder([...newPinnedTabs, ...unpinnedTabs])}
        onClick={handleTabClick}
        onContextMenu={handleContextMenu}
        onDoubleClick={handleDoubleClick}
      />
      <TabGroup
        tabs={unpinnedTabs}
        onReorder={newUnpinnedTabs => handleReorder([...pinnedTabs, ...newUnpinnedTabs])}
        onClick={handleTabClick}
        onContextMenu={handleContextMenu}
        onDoubleClick={handleDoubleClick}
      />
    </Box>
  );
};

export default TabsSection;
