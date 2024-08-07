import { FC, MouseEvent, WheelEvent } from 'react';
import { Box } from '@mui/material';
import { TabGroup } from './TabGroup';
import { TabType } from '../../types/TabType';
import { tabSectionStyles } from '../../style/style';

type TypeProps = {
  pinnedTabs: TabType[];
  unpinnedTabs: TabType[];
  handleReorder: (newTabs: TabType[]) => void;
  handleTabClick: (value: string) => void;
  handleContextMenu: (event: MouseEvent, value: string) => void;
  handleDoubleClick: (value: string) => void;
};

export const TabsSection: FC<TypeProps> = ({
  pinnedTabs,
  unpinnedTabs,
  handleReorder,
  handleTabClick,
  handleContextMenu,
  handleDoubleClick,
}) => {
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (event.deltaY !== 0) {
      event.preventDefault();
      event.currentTarget.scrollLeft += event.deltaY;
    }
  };

  return (
    <Box sx={tabSectionStyles} onWheel={handleWheel}>
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
