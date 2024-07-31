import { FC, useState, useCallback, useEffect, MouseEvent } from 'react';
import { Box } from '@mui/material';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';

interface TabItemProps {
  label: string;
  value: string;
  isActive: boolean;
  pinned: boolean;
  onClick: (value: string) => void;
  onContextMenu: (event: MouseEvent, value: string) => void;
}

const TabItem: FC<TabItemProps> = ({ label, value, isActive, pinned, onClick, onContextMenu }) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '10px',
    height: 50,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const focusStyles = {
    color: '#FFFFFF',
    backgroundColor: '#7F858D',
    position: 'relative',
    transform: 'translate(7px, 3px)',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
  };

  const getTabStyles = () => ({
    ...baseStyles,
    borderBottom: isActive ? '2px solid #1976d2' : '2px solid transparent',
    fontFamily: 'Poppins',
    ...(isPressed && focusStyles),
  });

  useEffect(() => {
    const handleMouseUp = () => setIsPressed(false);

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (event.button === 0) {
      setIsPressed(true);
    }
  }, []);

  const handleClick = useCallback(() => {
    onClick(value);
  }, [onClick, value]);

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      onContextMenu(event, value);
    },
    [onContextMenu, value],
  );

  return (
    <Box
      sx={getTabStyles()}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
    >
      {label}
      {pinned && (
        <Box component="span" sx={{ marginLeft: '8px' }}>
          <BookmarkTwoToneIcon sx={{ fontSize: 20 }} />
        </Box>
      )}
    </Box>
  );
};

export default TabItem;
