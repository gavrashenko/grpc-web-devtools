// Copyright (c) 2019 SafetyCulture Pty Ltd. All Rights Reserved.

// Map of Panel connections. The 'tabId' is used as key.
// There are two connections/ports for every tabId
// 1) Port to the panel script
// 2) Port to the content script
//
// Example:
// connections[1].panel => pane port
// connections[1].content => content port
let connections = {};

// Keep service worker alive by setting up periodic pings
function keepAlive() {
  setInterval(() => {
    chrome.runtime.getPlatformInfo(() => {
      // This is just to keep the service worker active
    });
  }, 20000); // Ping every 20 seconds
}

// Initialize keep-alive mechanism
keepAlive();

chrome.runtime.onConnect.addListener(port => {
  if (port.name != "panel" && port.name != "content") {
    return;
  }

  console.log(`Background: ${port.name} connected`);

  const extensionListener = message => {
    const tabId = port.sender.tab && port.sender.tab.id >= 0 ? port.sender.tab.id : message.tabId;

    // The original connection event doesn't include the tab ID of the
    // DevTools page, so we need to send it explicitly (attached
    // to the 'init' event).
    if (message.action == "init") {
      if (!connections[tabId]) {
        connections[tabId] = {};
      }
      connections[tabId][port.name] = port;
      console.log(`Background: ${port.name} initialized for tab ${tabId}`);
      return;
    }

    // Other messages are relayed to specified target if any
    // and if the connection exists.
    if (message.target) {
      const conn = connections[tabId] && connections[tabId][message.target];
      if (conn) {
        try {
          conn.postMessage(message);
        } catch (error) {
          console.error(`Background: Failed to relay message to ${message.target}:`, error);
          // Clean up broken connection
          if (connections[tabId]) {
            delete connections[tabId][message.target];
            if (Object.keys(connections[tabId]).length === 0) {
              delete connections[tabId];
            }
          }
        }
      } else {
        console.warn(`Background: No connection found for target ${message.target} in tab ${tabId}`);
      }
    }
  };

  // Listen to messages sent from the panel script.
  port.onMessage.addListener(extensionListener);

  // Remove panel connection on disconnect.
  port.onDisconnect.addListener(function (disconnectedPort) {
    console.log(`Background: ${disconnectedPort.name} disconnected`);
    
    disconnectedPort.onMessage.removeListener(extensionListener);

    const tabs = Object.keys(connections);
    for (let i = 0, len = tabs.length; i < len; i++) {
      const tabId = tabs[i];
      if (connections[tabId] && connections[tabId][disconnectedPort.name] === disconnectedPort) {
        delete connections[tabId][disconnectedPort.name];

        // If there is no port associated to the tab, remove it
        // from the connections map.
        if (Object.keys(connections[tabId]).length === 0) {
          delete connections[tabId];
        }
        break;
      }
    }
  });
});

// Handle service worker startup
chrome.runtime.onStartup.addListener(() => {
  console.log("Background: Service worker started");
  connections = {}; // Reset connections on startup
});

// Handle extension installation/update
chrome.runtime.onInstalled.addListener(() => {
  console.log("Background: Extension installed/updated");
  connections = {}; // Reset connections on install/update
});
