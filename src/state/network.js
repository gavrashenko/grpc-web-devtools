// Copyright (c) 2019 SafetyCulture Pty Ltd. All Rights Reserved.

import { createSlice } from "redux-starter-kit";
import Fuse from 'fuse.js';
import { setFilterValue, toggleExactMatch } from "./toolbar";

var options = {
  shouldSort: false,
  threshold: 0.1,
  distance: 10000,
  keys: [
    'method',
  ]
};
var fuse = new Fuse(null, options);

const networkSlice = createSlice({
  slice: 'network',
  initialState: {
    preserveLog: false,
    selectedIdx: null,
    selectedEntry: null,
    log: [
    ],
    _filterValue: '',
    _logBak: [],
    _exactMatch: false,
  },
  reducers: {
    networkLog(state, action) {
      const { log, _filterValue, _logBak } = state;
      const { payload, } = action;
      if (payload.method) {
        const parts = payload.method.split('/')
        payload.endpoint = parts.pop() || parts.pop();
      }
      if (_filterValue.length > 0) {
        _logBak.push(payload);
        if (state._exactMatch) {
          state.log = _logBak.filter(entry => {
            if (!entry.method && !entry.endpoint) return false;
            
            // Check exact match against method or endpoint
            const method = entry.method || '';
            const endpoint = entry.endpoint || '';
            
            // For exact match, the filter value should exactly match the endpoint or be the exact method name
            return endpoint === _filterValue || method === _filterValue || 
                   method.endsWith('/' + _filterValue) || // matches /Service/MethodName when searching for MethodName
                   endpoint.toLowerCase() === _filterValue.toLowerCase() ||
                   method.toLowerCase() === _filterValue.toLowerCase();
          });
        } else {
          fuse.setCollection(_logBak);
          state.log = fuse.search(_filterValue);
        }
      } else {
        log.push(payload);
      }
    },
    selectLogEntry(state, action) {
      const { payload: idx } = action;
      const entry = state.log[idx];
      if (entry) {
        state.selectedIdx = idx;
        state.selectedEntry = entry;
      }
    },
    clearLog(state, action) {
      const { payload: { force } = {} } = action;
      if (state.preserveLog && !force) {
        return;
      }
      state.selectedIdx = null;
      state.selectedEntry = null;
      state.log = [];
      state._logBak = [];
    },
    setPreserveLog(state, action) {
      const { payload } = action;
      state.preserveLog = payload;
    },
  },
  extraReducers: {
    [setFilterValue]: (state, action) => {
      const { payload: filterValue = '' } = action;
      
      state._filterValue = filterValue;
      if (filterValue.length === 0) {
        state.log = state._logBak;
        state._logBak = [];
        return;
      }

      if (state._logBak.length === 0 && state.log.length !== 0) {
        state._logBak = state.log;
      }

      if (state._exactMatch) {
        // Use exact match filtering - match exact method names or endpoint names
        state.log = state._logBak.filter(entry => {
          if (!entry.method && !entry.endpoint) return false;
          
          // Check exact match against method or endpoint
          const method = entry.method || '';
          const endpoint = entry.endpoint || '';
          
          // For exact match, the filter value should exactly match the endpoint or be the exact method name
          return endpoint === filterValue || method === filterValue || 
                 method.endsWith('/' + filterValue) || // matches /Service/MethodName when searching for MethodName
                 endpoint.toLowerCase() === filterValue.toLowerCase() ||
                 method.toLowerCase() === filterValue.toLowerCase();
        });
      } else {
        // Use fuzzy search
        fuse.setCollection(state._logBak);
        state.log = fuse.search(filterValue);
      }
    },
    [toggleExactMatch]: (state, action) => {
      state._exactMatch = !state._exactMatch;
      
      // Re-apply current filter with new match mode
      const filterValue = state._filterValue;
      if (filterValue.length === 0) {
        return;
      }

      if (state._logBak.length === 0 && state.log.length !== 0) {
        state._logBak = state.log;
      }

      if (state._exactMatch) {
        // Use exact match filtering - match exact method names or endpoint names
        state.log = state._logBak.filter(entry => {
          if (!entry.method && !entry.endpoint) return false;
          
          // Check exact match against method or endpoint
          const method = entry.method || '';
          const endpoint = entry.endpoint || '';
          
          // For exact match, the filter value should exactly match the endpoint or be the exact method name
          return endpoint === filterValue || method === filterValue || 
                 method.endsWith('/' + filterValue) || // matches /Service/MethodName when searching for MethodName
                 endpoint.toLowerCase() === filterValue.toLowerCase() ||
                 method.toLowerCase() === filterValue.toLowerCase();
        });
      } else {
        // Use fuzzy search
        fuse.setCollection(state._logBak);
        state.log = fuse.search(filterValue);
      }
    },
  },
});

const { actions, reducer } = networkSlice;
export const { networkLog, selectLogEntry, clearLog, setPreserveLog } = actions;

export default reducer
