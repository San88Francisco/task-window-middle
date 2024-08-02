import { FC, MouseEvent } from 'react';
import { Reorder } from 'framer-motion';
import TabItem from './TabItem';
import { TabType } from '../types/TabType';

type TabGroupProps = {
  tabs: TabType[];
  onReorder: (tabs: TabType[]) => void;
  onClick: (value: string) => void;
  onContextMenu: (event: MouseEvent, value: string) => void;
  onDoubleClick: (value: string) => void;
};

const TabGroup: FC<TabGroupProps> = ({
  tabs,
  onReorder,
  onClick,
  onContextMenu,
  onDoubleClick,
}) => (
  <Reorder.Group
    values={tabs}
    onReorder={onReorder as (newTabs: TabType[]) => void}
    axis="x"
    style={{ display: 'flex' }}
  >
    {tabs.map(tab => (
      <Reorder.Item key={tab.value} value={tab}>
        <TabItem
          label={tab.label}
          value={tab.value}
          isActive={tab.selected || false}
          pinned={!!tab.pinned}
          onClick={onClick}
          onContextMenu={onContextMenu}
          onDoubleClick={onDoubleClick}
        />
      </Reorder.Item>
    ))}
  </Reorder.Group>
);

export default TabGroup;
