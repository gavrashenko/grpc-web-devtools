/* global chrome */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';
import App from './App';
import './index.css';
import networkReducer, { networkLog, clearLog } from './state/network';
import toolbarReducer from './state/toolbar';
import clipboardReducer from './state/clipboard';

var port, tabId, reconnectTimer;

// Setup port for communication with the background script
function setupConnection() {
  if (chrome) {
    try {
      tabId = chrome.devtools.inspectedWindow.tabId;
      port = chrome.runtime.connect(null, { name: "panel" });
      port.postMessage({ tabId, action: "init" });
      port.onMessage.addListener(_onMessageRecived);
      
      // Handle disconnection and attempt reconnection
      port.onDisconnect.addListener(() => {
        console.warn("DevTools panel disconnected, attempting to reconnect...");
        port = null;
        
        // Clear any existing reconnect timer
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
        }
        
        // Attempt to reconnect after a short delay
        reconnectTimer = setTimeout(() => {
          setupConnection();
        }, 1000);
      });
      
      chrome.tabs.onUpdated.addListener(_onTabUpdated);
      console.log("DevTools panel connected successfully");

    } catch (error) {
      console.warn("not running app in chrome extension panel")
    }
  }
}

// Initialize connection
setupConnection();

const store = configureStore({
  reducer: {
    network: networkReducer,
    toolbar: toolbarReducer,
    clipboard: clipboardReducer,
  }
});

function _onMessageRecived({ action, data }) {
  if (action === "gRPCNetworkCall") {
    store.dispatch(networkLog(data));
  }
}

function _onTabUpdated(tId, { status }) {
  if (tId === tabId && status === "loading") {
    store.dispatch(clearLog());
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
