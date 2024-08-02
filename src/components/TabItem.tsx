import { FC, useState, useCallback, useEffect, MouseEvent, useRef } from 'react';
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
  const lastClickRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseUp = () => setIsPressed(false);

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (lastClickRef.current && now - lastClickRef.current < 300) {
      onDoubleClick(value);
      lastClickRef.current = null;
    } else {
      lastClickRef.current = now;
      onClick(value);
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
      sx={tabStyles({ isActive, isPressed, focusStyles })}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
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
          onClick={handleDelete}
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
