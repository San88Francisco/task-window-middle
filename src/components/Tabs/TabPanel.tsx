import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { tabPanelStyles } from '../../style/style';

type TypeProps = {
  value: string;
  activeValue: string;
  children: ReactNode;
};

export const TabPanel: FC<TypeProps> = ({ value, activeValue, children }) => {
  if (value !== activeValue) return null;

  return <Box style={tabPanelStyles}>{children}</Box>;
};
