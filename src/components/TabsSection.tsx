import { FC, MouseEvent } from 'react';
import { Box } from '@mui/material';
import TabGroup from './TabGroup';
import { TabType } from '../types/TabType';
import { tabSectionStyles } from '../style/style';

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
    <Box sx={tabSectionStyles}>
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
