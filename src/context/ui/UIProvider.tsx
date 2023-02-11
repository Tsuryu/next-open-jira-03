import { FC, PropsWithChildren, useReducer } from 'react';

import { UIState } from './interfaces';
import { UIContext } from './UIContext';
import { UIReducer } from './UIReducer';

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const openSidebar = () => {
    dispatch({
      type: 'UI - Open Sidebar',
      payload: {}
    });
  };

  const closeSidebar = () => {
    dispatch({
      type: 'UI - Close Sidebar',
      payload: {}
    });
  };

  const setIsAddingEntry = (isAddingEntry: boolean) => {
    dispatch({
      type: 'UI - Is Adding entry',
      payload: isAddingEntry
    });
  };

  const startDraging = () => {
    dispatch({ type: 'UI - Start dragging' });
  };

  const endDraging = () => {
    dispatch({ type: 'UI - End dragging' });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UIContext.Provider value={{ ...state, closeSidebar, openSidebar, setIsAddingEntry, startDraging, endDraging }}>
      {children}
    </UIContext.Provider>
  );
};
