import { useState, useEffect, FC } from 'react';
import { Reorder } from 'framer-motion';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import TabItem from './TabItem';
import TabPanel from './TabPanel';

interface Tab {
  label: string;
  value: string;
}

const initialTabs: Tab[] = [
  { label: 'Item One', value: 'tab1' },
  { label: 'Item Two', value: 'tab2' },
  { label: 'Item Three', value: 'tab3' },
  { label: 'Item Four', value: 'tab4' },
  { label: 'Item Five', value: 'tab5' },
];

const encodeTabOrder = (tabs: Tab[]): string => {
  return tabs.map(tab => initialTabs.findIndex(t => t.value === tab.value)).join('');
};

const decodeTabOrder = (encodedOrder: string): Tab[] => {
  const indices = encodedOrder.split('').map(Number);
  return indices.map(index => initialTabs[index]).filter((tab): tab is Tab => tab !== undefined);
};

const Windows: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const savedTabOrder = searchParams.get('tabOrder');
  const [tabs, setTabs] = useState<Tab[]>(
    savedTabOrder ? decodeTabOrder(savedTabOrder) : initialTabs,
  );

  const tabFromParams = searchParams.get('tab');
  const initialActiveTab = tabs.find(tab => tab.value === tabFromParams)?.value || tabs[0]?.value;

  const [activeTab, setActiveTab] = useState<string>(initialActiveTab);

  useEffect(() => {
    if (activeTab) {
      setSearchParams(params => {
        const newParams = new URLSearchParams(params);
        newParams.set('tab', activeTab);
        newParams.set('tabOrder', encodeTabOrder(tabs));
        return newParams;
      });
    }
  }, [activeTab, tabs, setSearchParams]);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Reorder.Group
        values={tabs}
        onReorder={newTabs => setTabs(newTabs)}
        axis="x"
        style={{ display: 'flex' }}
      >
        {tabs.map(tab => (
          <Reorder.Item key={tab.value} value={tab}>
            <TabItem
              label={tab.label}
              value={tab.value}
              isActive={activeTab === tab.value}
              onClick={handleTabClick}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
      {tabs.map(tab => (
        <TabPanel key={tab.value} value={tab.value} activeValue={activeTab}>
          {tab.label}
        </TabPanel>
      ))}
    </Box>
  );
};

export default Windows;
