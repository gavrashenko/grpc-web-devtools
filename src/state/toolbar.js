// Copyright (c) 2019 SafetyCulture Pty Ltd. All Rights Reserved.

import { createSlice } from "redux-starter-kit";

const toolbarSlice = createSlice({
  slice: 'toolbar',
  initialState: {
    filterIsOpen: true,
    filterIsEnabled: false,
    filterValue: "",
    exactMatch: false,
  },
  reducers: {
    toggleFilter(state) {
      state.filterIsOpen = !state.filterIsOpen;
    },
    setFilterValue(state, action) {
      const { payload } = action;
      state.filterValue = payload;
      state.filterIsEnabled = !!(state.filterValue && state.filterValue.length > 0);
    },
    toggleExactMatch(state) {
      state.exactMatch = !state.exactMatch;
    }
  },

});

const { actions, reducer } = toolbarSlice;
export const { toggleFilter, setFilterValue, toggleExactMatch } = actions;

export default reducer
