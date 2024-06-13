import { combineReducers } from "redux";
import {
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  ADD_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
  RESTORE_NOTE,
  DELETE_FOREVER,
  EMPTY_TRASH,
} from "./actions";
import { id } from "date-fns/locale";

const notesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          id: Date.now().toString() + Math.random(),
          content: action.payload.content,
          color: null,
          labelIds: [],
          updateAt: new Date().toISOString(),
          isBookmarked: false,
          folderId: null,
        },
      ];
    case UPDATE_NOTE:
      return state.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    case DELETE_NOTE:
      return state.filter((note) => note.id !== action.payload.id);
    case RESTORE_NOTE:
      return [...state, action.payload];
    default:
      return state;
  }
};

const labelsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_LABEL:
      return [...state, action.payload];
    case UPDATE_LABEL:
      return state.map((label) =>
        label.id === action.payload.id ? action.payload : label
      );
    case DELETE_LABEL:
      return state.filter((label) => label.id !== action.payload.id);
    default:
      return state;
  }
};

const trashReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_NOTE:
      return state.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    case DELETE_NOTE:
      return [...state, action.payload];
    case DELETE_FOREVER:
      return state.filter((note) => note.id !== action.payload.id);
    case EMPTY_TRASH:
      return [];
    case RESTORE_NOTE:
      return state.filter((note) => note.id !== action.payload.id);
    default:
      return state;
  }
};

const colorsReducer = (state = [], action) => {
  return state;
};

const rootReducer = combineReducers({
  notes: notesReducer,
  labels: labelsReducer,
  trash: trashReducer,
  colors: colorsReducer,
});

export default rootReducer;
