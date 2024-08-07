import { FC, MouseEvent, useState } from 'react';
import { Reorder } from 'framer-motion';
import { TabItem } from './TabItem';
import { TabType } from '../../types/TabType';
import { whileDragStyles } from '../../style/style';
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
          whileDrag={whileDragStyles(isHeld)}
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
