import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ActionButtons = () => (
  <Tooltip title="Add" sx={{ width: 60, height: 60 }}>
    <IconButton>
      <AddIcon sx={{ fontSize: 30 }} />
    </IconButton>
  </Tooltip>
);

export default ActionButtons;
