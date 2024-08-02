import { FC, useState, useCallback, useEffect, MouseEvent } from 'react';
import { Box } from '@mui/material';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';

type TypeProps = {
  label: string;
  value: string;
  isActive: boolean;
  pinned: boolean;
  onClick: (value: string) => void;
  onContextMenu: (event: MouseEvent, value: string) => void;
  onDoubleClick: (value: string) => void;
};

const TabItem: FC<TypeProps> = ({
  label,
  value,
  isActive,
  pinned,
  onClick,
  onContextMenu,
  onDoubleClick,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [lastClick, setLastClick] = useState<number | null>(null);

  const focusStyles = {
    color: '#FFFFFF',
    backgroundColor: '#7F858D',
    transform: 'translate(7px, 3px)',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
  };

  const hoverStyles = {
    backgroundColor: '#e0e0e0',
  };

  const getTabStyles = () => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '10px',
    height: 50,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    position: 'relative',
    borderTop: isActive ? '4px solid #1976d2' : '2px solid transparent',
    fontFamily: 'Poppins',
    ...(isPressed ? focusStyles : null),
    '&:hover': !isPressed ? hoverStyles : null,
    '&:active': focusStyles,
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
    const now = Date.now();
    if (lastClick && now - lastClick < 300) {
      onDoubleClick(value);
      setLastClick(null);
    } else {
      setLastClick(now);
      onClick(value);
    }
  }, [onClick, onDoubleClick, lastClick, value]);

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
        <Box component="span" sx={{ ml: '5px' }}>
          <BookmarkTwoToneIcon sx={{ fontSize: 20 }} />
        </Box>
      )}
    </Box>
  );
};

export default TabItem;
