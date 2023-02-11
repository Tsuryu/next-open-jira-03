import { UIState } from './interfaces';

export type UIActionType =
  | {
      type: 'UI - Open Sidebar' | 'UI - Close Sidebar';
      payload: any;
    }
  | {
      type: 'UI - Is Adding entry';
      payload: boolean;
    }
  | {
      type: 'UI - Start dragging' | 'UI - End dragging';
    };

export const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state,
        sidemenuOpen: true
      };
    case 'UI - Close Sidebar':
      return {
        ...state,
        sidemenuOpen: false
      };
    case 'UI - Is Adding entry':
      return {
        ...state,
        isAddingEntry: action.payload
      };
    case 'UI - Start dragging':
      return {
        ...state,
        isDragging: true
      };
    case 'UI - End dragging':
      return {
        ...state,
        isDragging: false
      };
    default:
      return state;
  }
};
