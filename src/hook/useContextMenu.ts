import { useState, useCallback } from 'react';

export const useContextMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [contextMenuTab, setContextMenuTab] = useState<string | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleContextMenu = useCallback((event: React.MouseEvent, value: string) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget as HTMLElement);
    setContextMenuTab(value);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setMenuAnchorEl(null);
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return {
    anchorEl,
    contextMenuTab,
    menuAnchorEl,
    handleContextMenu,
    handleClose,
    handleMenuClick,
    handleMenuClose
  };
};
