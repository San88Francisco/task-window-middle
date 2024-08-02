export type FocusStyles = {
  color: string;
  backgroundColor: string;
  transform: string;
  boxShadow: string;
};

export type TabStylesParams = {
  isActive: boolean;
  isPressed: boolean;
  focusStyles: FocusStyles;
};
