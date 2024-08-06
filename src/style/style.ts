import { CSSObject } from '@mui/material/styles';
import { TabStylesParams } from '../types/TabStyleType';
import { lightBlue } from '@mui/material/colors';

const colorBlue50 = lightBlue[50];
export const colorBlue100 = lightBlue[100];
export const colorBlueA400 = lightBlue.A400;

export const contextMenuStyles = {
  maxHeight: 48 * 10.5,
  width: 200,
  borderRadius: 8,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
}

export const contextMenuItemsStyles = {
  fontSize: '16px',
  fontWeight: '400',
  color: '#333',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#000',
  },
  '&:focus': {
    backgroundColor: '#e0e0e0',
    color: '#000',
  },
}

export const tabStyles = ({ isActive }: TabStylesParams): CSSObject => {
  return {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '10px',
    height: 50,
    position: 'relative',
    fontFamily: 'Poppins',
    overflow: 'hidden',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: colorBlue100,
      borderRadius: '0 0 5px 5px',
    },
    borderTop: isActive ? '4px solid' : 'none',
    borderColor: colorBlueA400,
    '&:hover .deleteIcon': {
      display: 'flex',
    },
    '&:hover .label': {
      maxWidth: 'calc(100% - 40px)',
    },
  };
};

export const tabPanelStyles = {
  padding: '20px',
  border: '1px solid #ddd',
  borderTop: 'none',
};

export const tabSectionStyles = {
  display: 'flex',
  width: '100%',
  overflowX: 'auto',
  cursor: 'pointer',
  position: 'relative',
  pb: 0.6,
  '&::-webkit-scrollbar': {
    height: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(127, 133, 141, 0.2)',
    borderRadius: '4px',
    transition: 'all .3s ease',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(127, 133, 141, 0.4)',
  },
}

export const menuStyles = {
  '& .MuiMenu-list': {
    p: 0,
  },
};

export const menuItemStyles = {
  p: 1,
  border: '2px solid rgba(174, 182, 206, 0.2)',
  borderRadius: 1
}

export const whileDragStyles = {
  backgroundColor: colorBlue50,
  borderRadius: '0 0 5px 5px',
}

export const itemBoxStyles = {
  flexGrow: 1,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
}

export const itemPStyles = {
  flex: '1 1 0',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
}

export const itemSpanStyles = {
  display: 'none',
  position: 'absolute',
  right: 0,
  cursor: 'pointer',
  alignItems: 'center',
  width: '30px',
  height: '100%',
  justifyContent: 'center',
}