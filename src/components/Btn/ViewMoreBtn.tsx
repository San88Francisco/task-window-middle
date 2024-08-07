import { FC, MouseEvent } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { viewMoreBtnStyles } from '../../style/style';

type PropsType = {
  open: boolean;
  handleMenuClick: (event: MouseEvent<HTMLElement>) => void;
};

export const ViewMoreBtn: FC<PropsType> = ({ open, handleMenuClick }) => {
  return (
    <Tooltip title="View more" sx={viewMoreBtnStyles}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </IconButton>
    </Tooltip>
  );
};
