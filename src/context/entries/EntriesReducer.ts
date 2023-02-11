import { Entry } from '@/interfaces';
import { EntriesState } from './interfaces';

export type EntriesActionType =
  | {
      type: 'Entries - Add entry' | 'Entries - Entry Updated';
      payload: Entry;
    }
  | { type: 'Entries - Set entries'; payload: Entry[] }
  | { type: 'Entries - Delete entry'; payload: string };

export const EntriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case 'Entries - Add entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };
    case 'Entries - Entry Updated':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            return action.payload;
          }
          return entry;
        })
      };
    case 'Entries - Set entries':
      return {
        ...state,
        entries: [...action.payload]
      };
    case 'Entries - Delete entry':
      return {
        ...state,
        entries: state.entries.filter(({ _id }) => _id !== action.payload)
      };
    default:
      return state;
  }
};
