import { useState, useCallback, useEffect, useRef, MouseEvent, TouchEvent } from 'react';

type UseTabItemProps = {
  value: string;
  onClick: (value: string) => void;
  onContextMenu: (event: MouseEvent, value: string) => void;
  onDoubleClick: (value: string) => void;
  onHoldChange: (held: boolean) => void;
};

export const useTabItem = ({
  value,
  onClick,
  onContextMenu,
  onDoubleClick,
  onHoldChange,
}: UseTabItemProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const holdTimeoutRef = useRef<number | null>(null);
  const lastClickRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
        holdTimeoutRef.current = null;
      }
      if (isPressed) {
        setIsPressed(false);
        onHoldChange(false);
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
    holdTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
      onHoldChange(true);
    }, 2000);
  }, [onHoldChange]);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      handleMouseDown();
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
      onHoldChange(false);
    }
  }, [isPressed, onHoldChange]);

  const handleClick = useCallback(() => {
    const now = Date.now();
    const clickInterval = 300;
    if (lastClickRef.current && now - lastClickRef.current < clickInterval) {
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

  return {
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleClick,
    handleContextMenu,
  };
};
