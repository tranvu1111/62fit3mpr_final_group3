export const ADD_NOTE = "ADD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const ADD_LABEL = "ADD_LABEL";
export const UPDATE_LABEL = "UPDATE_LABEL";
export const DELETE_LABEL = "DELETE_LABEL";
export const RESTORE_NOTE = "RESTORE_NOTE";
export const DELETE_FOREVER = "DELETE_FOREVER";
export const EMPTY_TRASH = "EMPTY_TRASH";

export const addNote = (noteContent) => ({ type: ADD_NOTE, payload: noteContent });
export const updateNote = (note) => ({ type: UPDATE_NOTE, payload: note });
export const deleteNote = (note) => ({ type: DELETE_NOTE, payload: note });
export const addLabel = (label) => ({ type: ADD_LABEL, payload: label });
export const updateLabel = (label) => ({ type: UPDATE_LABEL, payload: label });
export const deleteLabel = (label) => ({ type: DELETE_LABEL, payload: label });
export const restoreNote = (note) => ({ type: RESTORE_NOTE, payload: note });
export const deleteForever = (note) => ({ type: DELETE_FOREVER, payload: note });
export const emptyTrash = () => ({ type: EMPTY_TRASH });
