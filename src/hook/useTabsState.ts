import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { decodeTabOrder } from '../utils/decoding';
import { initialTabs } from '../utils/constants';
import { TabType } from '../types/TabType';
import { encodeTabOrder } from '../utils/encoding';

export const useTabsState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabs, setTabs] = useState<TabType[]>(() => {
    const savedTabOrder = searchParams.get('tabOrder');
    return savedTabOrder ? decodeTabOrder(savedTabOrder) : initialTabs;
  });

  const tabFromParams = searchParams.get('tab');
  const initialActiveTab = tabFromParams || tabs.find(tab => tab.selected)?.value || tabs[0]?.value;
  const [activeTab, setActiveTab] = useState<string>(initialActiveTab);

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

  return {
    tabs,
    setTabs,
    activeTab,
    setActiveTab
  };
};
