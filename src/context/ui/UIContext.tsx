import { createContext } from 'react';

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  startDraging: () => void;
  endDraging: () => void;
}

export const UIContext = createContext<ContextProps>({} as ContextProps);
