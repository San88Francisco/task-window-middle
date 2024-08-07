import { CSSObject } from '@mui/material/styles';
import { TabStylesParams } from '../types/TabStyleType';
import { TargetAndTransition } from 'framer-motion';


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
    borderTop: isActive ? '3px solid' : 'none',
    borderColor: 'rgba(70, 144, 226, 1)',
    '&:hover ': {
      backgroundColor: 'rgba(244, 247, 249, 1)',
      color: 'rgba(52, 52, 52, 1)',
    },
    '&:hover .deleteIcon': {
      display: 'flex',
    },
    '&:hover .label': {
      maxWidth: 'calc(100% - 35%)',
    },

  };
};

export const tabPanelStyles = {
  height: '100vh',
  padding: '20px',
  border: '15px solid rgba(244, 247, 249, 1)',
};

export const tabSectionStyles = {
  display: 'flex',
  width: '100%',
  overflowX: 'auto',
  cursor: 'pointer',
  position: 'relative',
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

export const whileDragStyles = (isHeld: boolean): TargetAndTransition => {
  return {
    backgroundColor: 'colorBlue50',
    borderRadius: '0 0 5px 5px',
    position: 'relative',
    top: isHeld ? 5 : 0,
  };
};

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

export const drawerPaperStyles = {
  width: 'auto',
  height: '85vh',
  overflowY: 'auto',
}

export const drawerBoxStyles = {
  margin: '10px auto',
  width: 100,
  height: 5,
  backgroundColor: 'rgba(127, 133, 141, 0.2)',
  borderRadius: 10,
}

export const viewMoreBtnStyles = {
  width: 50,
  height: 50,
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundColor: 'rgba(244, 247, 249, 0.4)',
  color: 'rgba(52, 52, 52, 1)',
  borderRadius: 0,
}