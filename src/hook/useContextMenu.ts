import { useState, useCallback, MouseEvent } from 'react';

export const useContextMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [contextMenuTab, setContextMenuTab] = useState<string | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  const handleContextMenu = useCallback((event: MouseEvent, value: string) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget as HTMLElement);
    setContextMenuTab(value);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setMenuAnchorEl(null);
  }, []);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
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
