import { CSSObject } from '@mui/material/styles';
import { FocusStyles, TabStylesParams } from '../types/TabStyleType';

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

export const focusStyles: FocusStyles = {
  color: '#FFFFFF',
  backgroundColor: '#7F858D',
  transform: 'translate(7px, 3px)',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
};


export const tabStyles = ({
  isActive,
  isPressed,
  focusStyles,
}: TabStylesParams): CSSObject => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '10px',
  height: 50,
  position: 'relative',
  borderTop: isActive ? '4px solid #1976d2' : '2px solid transparent',
  fontFamily: 'Poppins',
  overflow: 'hidden', 
  ...(isPressed ? focusStyles : null),

  '&:hover': isPressed ? null : { backgroundColor: '#e0e0e0' },
  '&:hover .deleteIcon': isPressed ? null : {
    display: 'flex',
  },
  '&:hover .label': isPressed ? null : {
    maxWidth: 'calc(100% - 40px)',
  },
  '&:active': isPressed ? focusStyles : null,
});




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