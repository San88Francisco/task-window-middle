import { useState, MouseEvent, KeyboardEvent } from 'react';

const useDrawer = () => {
  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor: 'bottom', open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return { state, toggleDrawer, setState };
};

export default useDrawer;
