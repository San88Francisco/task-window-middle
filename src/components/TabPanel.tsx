import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  value: string;
  activeValue: string;
  children: ReactNode;
}

const tabPanelStyles = {
  padding: '20px',
  border: '1px solid #ddd',
  borderTop: 'none',
};

const TabPanel: FC<TabPanelProps> = ({ value, activeValue, children }) => {
  if (value !== activeValue) return null;

  return <Box style={tabPanelStyles}>{children}</Box>;
};

export default TabPanel;
