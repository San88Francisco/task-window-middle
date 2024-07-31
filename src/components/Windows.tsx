import { useState, useEffect, FC, MouseEvent } from 'react';
import { Reorder } from 'framer-motion';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import TabItem from './TabItem';
import TabPanel from './TabPanel';
import ToFaster from './ToFasten';

type TabType = {
  label: string;
  value: string;
  pinned?: boolean;
  selected?: boolean;
};

const initialTabs: TabType[] = [
  { label: 'Item One', value: 'tab1', pinned: false },
  { label: 'Item Two', value: 'tab2', pinned: false },
  { label: 'Item Three', value: 'tab3', pinned: false },
  { label: 'Item Four', value: 'tab4', pinned: false },
  { label: 'Item Five', value: 'tab5', pinned: false },
  { label: 'Item Six', value: 'tab6', pinned: false },
  { label: 'Item Seven', value: 'tab7', pinned: false },
  { label: 'Item Eight', value: 'tab8', pinned: false },
  { label: 'Item Nine', value: 'tab9', pinned: false },
  { label: 'Item Ten', value: 'tab10', pinned: false },
  { label: 'Item Eleven', value: 'tab11', pinned: false },
  { label: 'Item Twelve', value: 'tab12', pinned: false },
  { label: 'Item Thirteen', value: 'tab13', pinned: false },
  { label: 'Item Fourteen', value: 'tab14', pinned: false },
  { label: 'Item Fifteen', value: 'tab15', pinned: false },
  { label: 'Item Sixteen', value: 'tab16', pinned: false },
  { label: 'Item Seventeen', value: 'tab17', pinned: false },
  { label: 'Item Eighteen', value: 'tab18', pinned: false },
  { label: 'Item Nineteen', value: 'tab19', pinned: false },
  { label: 'Item Twenty', value: 'tab20', pinned: false },
];

const base64Encode = (data: string): string => btoa(unescape(encodeURIComponent(data)));
const base64Decode = (data: string): string => decodeURIComponent(escape(atob(data)));

const encodeTabOrder = (tabs: TabType[]): string => {
  const bitFieldsStr = tabs
    .map(tab => (tab.selected ? 1 : 0) | (tab.pinned ? 2 : 0))
    .map(num => num.toString(2).padStart(2, '0'))
    .join('');

  const indicesStr = tabs
    .map(tab => initialTabs.findIndex(t => t.value === tab.value))
    .map(index => '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[index])
    .join('');

  return base64Encode(bitFieldsStr + indicesStr);
};

const decodeTabOrder = (encodedOrder: string): TabType[] => {
  const decoded = base64Decode(encodedOrder);

  const length = initialTabs.length;
  const bitFieldsStr = decoded.slice(0, length * 2);
  const indicesStr = decoded.slice(length * 2);

  const bitFields = Array.from({ length: length }, (_, i) =>
    parseInt(bitFieldsStr.slice(i * 2, i * 2 + 2), 2),
  );

  const indices = Array.from(indicesStr).map(char =>
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(char),
  );

  const tabs = initialTabs.slice();

  indices.forEach((index, i) => {
    if (index < tabs.length) {
      tabs[index] = {
        ...tabs[index],
        selected: (bitFields[i] & 1) === 1,
        pinned: (bitFields[i] & 2) === 2,
      };
    }
  });

  return indices.map(index => tabs[index]);
};

const Windows: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabs, setTabs] = useState<TabType[]>(() => {
    const savedTabOrder = searchParams.get('tabOrder');
    return savedTabOrder ? decodeTabOrder(savedTabOrder) : initialTabs;
  });

  const tabFromParams = searchParams.get('tab');
  const initialActiveTab = tabFromParams || tabs.find(tab => tab.selected)?.value || tabs[0]?.value;
  const [activeTab, setActiveTab] = useState<string>(initialActiveTab);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [contextMenuTab, setContextMenuTab] = useState<string | null>(null);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', activeTab);
    newParams.set('tabOrder', encodeTabOrder(tabs));
    setSearchParams(newParams);
  }, [activeTab, tabs, setSearchParams]);

  useEffect(() => {
    setTabs(prevTabs =>
      prevTabs.map(tab => ({
        ...tab,
        selected: tab.value === activeTab,
      })),
    );
  }, [activeTab]);

  const handleTabClick = (value: string) => setActiveTab(value);

  const handleContextMenu = (event: MouseEvent, value: string) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget as HTMLElement);
    setContextMenuTab(value);
  };

  const handlePin = () => {
    if (contextMenuTab) {
      setTabs(prevTabs => {
        const updatedTabs = prevTabs.map(tab =>
          tab.value === contextMenuTab ? { ...tab, pinned: !tab.pinned } : tab,
        );
        const pinnedTabs = updatedTabs.filter(tab => tab.pinned);
        const unpinnedTabs = updatedTabs.filter(tab => !tab.pinned);
        return [...pinnedTabs, ...unpinnedTabs];
      });
      setAnchorEl(null);
    }
  };

  const handleClose = () => setAnchorEl(null);

  const handleReorder = (newTabs: TabType[]) => setTabs(newTabs);

  const pinnedTabs = tabs.filter(tab => tab.pinned);
  const unpinnedTabs = tabs.filter(tab => !tab.pinned);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Reorder.Group
          values={pinnedTabs}
          onReorder={newPinnedTabs => handleReorder([...newPinnedTabs, ...unpinnedTabs])}
          axis="x"
          style={{ display: 'flex' }}
        >
          {pinnedTabs.map(tab => (
            <Reorder.Item key={tab.value} value={tab}>
              <TabItem
                label={tab.label}
                value={tab.value}
                isActive={activeTab === tab.value}
                pinned={!!tab.pinned}
                onClick={handleTabClick}
                onContextMenu={handleContextMenu}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <Reorder.Group
          values={unpinnedTabs}
          onReorder={newUnpinnedTabs => handleReorder([...pinnedTabs, ...newUnpinnedTabs])}
          axis="x"
          style={{ display: 'flex' }}
        >
          {unpinnedTabs.map(tab => (
            <Reorder.Item key={tab.value} value={tab}>
              <TabItem
                label={tab.label}
                value={tab.value}
                isActive={activeTab === tab.value}
                pinned={!!tab.pinned}
                onClick={handleTabClick}
                onContextMenu={handleContextMenu}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </Box>
      {tabs.map(tab => (
        <TabPanel key={tab.value} value={tab.value} activeValue={activeTab}>
          {tab.label}
        </TabPanel>
      ))}
      <ToFaster anchorEl={anchorEl} onClose={handleClose} onPin={handlePin} />
    </Box>
  );
};

export default Windows;
