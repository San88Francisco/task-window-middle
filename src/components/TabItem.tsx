import { FC, MouseEvent } from 'react';
import { Box, Typography } from '@mui/material';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { itemBoxStyles, itemPStyles, itemSpanStyles, tabStyles } from '../style/style';
import { useTabItem } from '../hook/useTabItem';

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
  const { handleMouseDown, handleMouseUp, handleTouchStart, handleClick, handleContextMenu } =
    useTabItem({ value, onClick, onContextMenu, onDoubleClick, onHoldChange });

  return (
    <Box
      sx={tabStyles({ isActive })}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseUp}
    >
      <Box sx={itemBoxStyles}>
        <Typography component="p" className="label" sx={itemPStyles}>
          {label}
        </Typography>
        <Typography component="span" className="deleteIcon" sx={itemSpanStyles}>
          <HighlightOffIcon sx={{ color: '#d32f2f' }} />
        </Typography>
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
