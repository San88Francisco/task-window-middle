import { useState, useEffect, useCallback, FC } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import TabPanel from './TabPanel';
import ToFaster from './ToFasten';
import TabsSection from './TabsSection';
import ContextMenu from './ContextMenu';
import ActionButtons from './AddBtn';
import { encodeTabOrder } from '../utils/encoding';
import { decodeTabOrder } from '../utils/decoding';
import { initialTabs } from '../utils/constants';
import { TabType } from '../types/TabType';

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
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

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
        return sortTabs(updatedTabs);
      });
      setAnchorEl(null);
    }
  }, [contextMenuTab]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setMenuAnchorEl(null);
  }, []);

  const handleReorder = useCallback((newTabs: TabType[]) => setTabs(sortTabs(newTabs)), []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuItemClick = (value: string) => {
    setTabs(prevTabs => {
      const selectedTab = prevTabs.find(tab => tab.value === value);
      if (!selectedTab) return prevTabs;

      const updatedTabs = prevTabs.filter(tab => tab.value !== value);
      return sortTabs([selectedTab, ...updatedTabs]);
    });
  };

  const handleDoubleClick = useCallback((value: string) => {
    setTabs(prevTabs => {
      const tabToMove = prevTabs.find(tab => tab.value === value);
      if (!tabToMove) return prevTabs;

      const updatedTabs = prevTabs.filter(tab => tab.value !== value);
      return sortTabs([tabToMove, ...updatedTabs]);
    });
  }, []);

  const sortTabs = (tabs: TabType[]) => {
    const pinnedTabs = tabs.filter(tab => tab.pinned);
    const unpinnedTabs = tabs.filter(tab => !tab.pinned);
    return [...pinnedTabs, ...unpinnedTabs];
  };

  const pinnedTabs = tabs.filter(tab => tab.pinned);
  const unpinnedTabs = tabs.filter(tab => !tab.pinned);

  return (
    <Box>
      <Box display="flex">
        <ActionButtons />
        <TabsSection
          pinnedTabs={pinnedTabs}
          unpinnedTabs={unpinnedTabs}
          handleReorder={handleReorder}
          handleTabClick={handleTabClick}
          handleContextMenu={handleContextMenu}
          handleDoubleClick={handleDoubleClick}
        />
        <ContextMenu
          anchorEl={menuAnchorEl}
          open={!!menuAnchorEl}
          tabs={tabs}
          handleMenuItemClick={handleMenuItemClick}
          handleMenuClose={handleMenuClose}
          handleMenuClick={handleMenuClick}
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
