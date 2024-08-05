import { FC, useState, useCallback, useEffect, MouseEvent, useRef, TouchEvent } from 'react';
import { Box } from '@mui/material';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { tabStyles, focusStyles } from '../style/style';

type TypeProps = {
  label: string;
  value: string;
  isActive: boolean;
  pinned: boolean;
  onClick: (value: string) => void;
  onContextMenu: (event: MouseEvent, value: string) => void;
  onDoubleClick: (value: string) => void;
  onHoldChange: (held: boolean) => void;
};

const TabItem: FC<TypeProps> = ({
  label,
  value,
  isActive,
  pinned,
  onClick,
  onContextMenu,
  onDoubleClick,
  onHoldChange,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickRef = useRef<number | null>(null); // Додано реф для останнього кліку

  useEffect(() => {
    const handleMouseUp = () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
        holdTimeoutRef.current = null;
      }
      if (isPressed) {
        setIsPressed(false);
        onHoldChange(false); // Скидання стану утримання
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isPressed, onHoldChange]);

  const handleMouseDown = useCallback(() => {
    setIsPressed(true);
    holdTimeoutRef.current = setTimeout(() => {
      console.log('Item held');
      setIsPressed(false);
      onHoldChange(true); // Встановлюємо стан утримання
    }, 2000);
  }, [onHoldChange]);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      handleMouseDown(); // Використовуємо ту ж саму логіку для touch
    },
    [handleMouseDown],
  );

  const handleMouseUp = useCallback(() => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (isPressed) {
      setIsPressed(false);
      onHoldChange(false); // Скидання стану утримання
    }
  }, [isPressed, onHoldChange]);

  const handleClick = useCallback(() => {
    const now = Date.now();
    const clickInterval = 300;
    if (lastClickRef.current && now - lastClickRef.current < clickInterval) {
      onDoubleClick(value); // Обробка подвійного кліку
      lastClickRef.current = null;
    } else {
      lastClickRef.current = now;
      onClick(value); // Одиночний клік
    }
  }, [onClick, onDoubleClick, value]);

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      onContextMenu(event, value);
    },
    [onContextMenu, value],
  );

  return (
    <Box
      sx={{
        ...tabStyles({ isActive, isPressed, focusStyles }),
        userSelect: 'none',
        backgroundColor: isPressed ? 'black' : 'initial',
        transition: 'background-color 0.3s ease',
      }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseUp}
    >
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          className="label"
          sx={{
            flex: '1 1 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}
        >
          {label}
        </Box>
        <Box
          className="deleteIcon"
          sx={{
            display: 'none',
            position: 'absolute',
            right: 0,
            cursor: 'pointer',
            alignItems: 'center',
            width: '30px',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <HighlightOffIcon sx={{ color: '#d32f2f' }} />
        </Box>
      </Box>
      {pinned && (
        <Box component="span" sx={{ ml: '5px' }}>
          <BookmarkTwoToneIcon sx={{ fontSize: 20 }} />
        </Box>
      )}
    </Box>
  );
};

export default TabItem;
