import { FC, MouseEvent } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type PropsType = {
  open: boolean;
  handleMenuClick: (event: MouseEvent<HTMLElement>) => void;
};

export const ViewMoreBtn: FC<PropsType> = ({ open, handleMenuClick }) => {
  return (
    <>
      <Tooltip title="View more" sx={{ width: 60, height: 60 }}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
