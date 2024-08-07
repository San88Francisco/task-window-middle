import { FC, MouseEvent, useState } from 'react';
import { Reorder } from 'framer-motion';
import { TabItem } from './TabItem';
import { TabType } from '../../types/TabType';
import { isMobileDevice } from '../../utils/divece';

type TabGroupProps = {
  tabs: TabType[];
  onReorder: (tabs: TabType[]) => void;
  onClick: (value: string) => void;
  onContextMenu: (event: MouseEvent, value: string) => void;
  onDoubleClick: (value: string) => void;
};

export const TabGroup: FC<TabGroupProps> = ({
  tabs,
  onReorder,
  onClick,
  onContextMenu,
  onDoubleClick,
}) => {
  const [isHeld, setIsHeld] = useState(false);
  console.log('✌️isHeld --->', isHeld);

  const handleHoldChange = (held: boolean) => {
    setIsHeld(held);
  };

  return (
    <Reorder.Group
      values={tabs}
      onReorder={onReorder as (newTabs: TabType[]) => void}
      axis="x"
      style={{ display: 'flex' }}
    >
      {tabs.map(tab => (
        <Reorder.Item
          key={tab.value}
          value={tab}
          dragListener={!isMobileDevice() || isHeld}
          whileDrag={{
            backgroundColor: 'rgba(127, 133, 141, 1)',
            color: 'rgba(255, 255, 255, 1)',
            position: 'relative',
            top: 2,
            left: 5,
          }}
          style={{
            color: 'rgba(127, 133, 141, 1)',
            backgroundColor: !!tab.selected ? 'rgba(244, 247, 249, 1)' : 'inherit',
          }}
        >
          <TabItem
            label={tab.label}
            value={tab.value}
            isActive={!!tab.selected}
            pinned={!!tab.pinned}
            onClick={onClick}
            onContextMenu={onContextMenu}
            onDoubleClick={onDoubleClick}
            onHoldChange={handleHoldChange}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
