import { FC } from 'react';
import { Box } from '@mui/material';
import { TabPanel } from '../components/Tabs/TabPanel';
import { ToFaster } from '../components/ToFasten';
import { TabsSection } from '../components/Tabs/TabsSection';
import { ContextMenu } from '../components/ContextMenu';
import { useTabsState } from '../hook/useTabsState';
import { useContextMenu } from '../hook/useContextMenu';
import { useTabsHandlers } from '../hook/useTabsHandlers';

const Windows: FC = () => {
  const { tabs, setTabs, activeTab, setActiveTab } = useTabsState();

  const {
    anchorEl,
    contextMenuTab,
    menuAnchorEl,
    handleContextMenu,
    handleMenuClick,
    handleMenuClose,
    handleClose,
  } = useContextMenu();

  const { handleTabClick, handlePin, handleReorder, handleMenuItemClick, handleDoubleClick } =
    useTabsHandlers(setActiveTab, tabs, setTabs, contextMenuTab, handleClose);

  const pinnedTabs = tabs.filter(tab => tab.pinned);
  const unpinnedTabs = tabs.filter(tab => !tab.pinned);

  return (
    <>
      <Box display="flex">
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
    </>
  );
};

export default Windows;
