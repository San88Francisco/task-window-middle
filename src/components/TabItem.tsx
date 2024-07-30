import React from 'react';
import { Box } from '@mui/material';

interface TabItemProps {
  label: string;
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
}

const tabStyles = {
  display: 'flex',
  cursor: 'pointer',
  padding: '10px',
  borderBottom: '2px solid transparent',
};

const activeTabStyles = {
  ...tabStyles,
  borderBottom: '2px solid #1976d2',
};

const TabItem: React.FC<TabItemProps> = ({ label, value, isActive, onClick }) => (
  <Box style={isActive ? activeTabStyles : tabStyles} onClick={() => onClick(value)}>
    {label}
  </Box>
);

export default TabItem;
