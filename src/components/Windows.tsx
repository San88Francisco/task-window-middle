import React, { useState, useEffect, FC, useCallback } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import TabPanel from './TabPanel';
import { encodeTabOrder } from '../utils/encoding';
import { decodeTabOrder } from '../utils/decoding';
import { initialTabs } from '../utils/constants';
import TabGroup from './TabGroup';
import { TabType } from '../types/TabType';
import ToFaster from './ToFasten';

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
  }, [activeTab, tabs, searchParams, setSearchParams]);

  useEffect(() => {
    setTabs(prevTabs =>
      prevTabs.map(tab => ({
        ...tab,
        selected: tab.value === activeTab,
      })),
    );
  }, [activeTab]);

  const handleTabClick = useCallback((value: string) => setActiveTab(value), []);

  const handleContextMenu = useCallback((event: React.MouseEvent, value: string) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget as HTMLElement);
    setContextMenuTab(value);
  }, []);

  const handlePin = useCallback(() => {
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
  }, [contextMenuTab]);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleReorder = useCallback((newTabs: TabType[]) => setTabs(newTabs), []);

  const pinnedTabs = tabs.filter(tab => tab.pinned);
  const unpinnedTabs = tabs.filter(tab => !tab.pinned);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <TabGroup
          tabs={pinnedTabs}
          onReorder={newPinnedTabs => handleReorder([...newPinnedTabs, ...unpinnedTabs])}
          onClick={handleTabClick}
          onContextMenu={handleContextMenu}
        />
        <TabGroup
          tabs={unpinnedTabs}
          onReorder={newUnpinnedTabs => handleReorder([...pinnedTabs, ...newUnpinnedTabs])}
          onClick={handleTabClick}
          onContextMenu={handleContextMenu}
        />
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
