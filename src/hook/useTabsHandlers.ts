import { useCallback } from 'react';
import { TabType } from '../types/TabType';

export const useTabsHandlers = (
  setActiveTab: (value: string) => void,
  _tabs: TabType[],
  setTabs: React.Dispatch<React.SetStateAction<TabType[]>>,
  contextMenuTab: string | null,
  handleClose: () => void
) => {
  const handleTabClick = useCallback((value: string) => setActiveTab(value), []);

  const handlePin = useCallback(() => {
    if (contextMenuTab) {
      setTabs(prevTabs => {
        const updatedTabs = prevTabs.map(tab =>
          tab.value === contextMenuTab ? { ...tab, pinned: !tab.pinned } : tab,
        );
        return sortTabs(updatedTabs);
      });
      handleClose();
    }
  }, [contextMenuTab]);


  const handleReorder = useCallback((newTabs: TabType[]) => setTabs(sortTabs(newTabs)), [setTabs]);

  const handleMenuItemClick = useCallback((value: string) => {
    setTabs(prevTabs => {
      const selectedTab = prevTabs.find(tab => tab.value === value);
      if (!selectedTab) return prevTabs;

      const updatedTabs = prevTabs.filter(tab => tab.value !== value);
      return sortTabs([selectedTab, ...updatedTabs]);
    });
  }, []);

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

  return {
    handleTabClick,
    handlePin,
    handleReorder,
    handleMenuItemClick,
    handleDoubleClick,
    sortTabs,
  };
};
