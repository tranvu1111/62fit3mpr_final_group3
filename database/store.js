import { createStore } from "redux";
import rootReducer from "./reducers";
import { NOTES, LABELS, TRASH, COLORS } from "./sample-data";

const initialState = {
  notes: NOTES,
  labels: LABELS,
  trash: TRASH,
  colors: COLORS,
};

const store = createStore(rootReducer, initialState);

export default store;
