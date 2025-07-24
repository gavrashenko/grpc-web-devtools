// Copyright (c) 2019 SafetyCulture Pty Ltd. All Rights Reserved.

// Inject the script file instead of inline code to comply with CSP
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
script.onload = function() {
  this.remove();
};
(document.head || document.documentElement).appendChild(script);

var port;
var reconnectTimer;
var isConnecting = false;

function setupPortIfNeeded() {
  if ((!port || port.disconnected) && chrome && chrome.runtime && !isConnecting) {
    isConnecting = true;
    
    try {
      port = chrome.runtime.connect(null, { name: "content" });
      port.postMessage({ action: "init" });
      
      port.onDisconnect.addListener(() => {
        console.warn("Content script disconnected from background");
        port = null;
        isConnecting = false;
        
        // Clear any existing reconnect timer
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
        }
        
        // Attempt to reconnect after a short delay
        reconnectTimer = setTimeout(() => {
          setupPortIfNeeded();
        }, 1000);
      });
      
      // Add error handling
      if (chrome.runtime.lastError) {
        console.error("Connection error:", chrome.runtime.lastError);
        port = null;
        isConnecting = false;
        return;
      }
      
      console.log("Content script connected successfully");
      isConnecting = false;
      
    } catch (error) {
      console.error("Failed to connect content script:", error);
      port = null;
      isConnecting = false;
      
      // Retry connection after delay
      reconnectTimer = setTimeout(() => {
        setupPortIfNeeded();
      }, 2000);
    }
  }
}

function sendGRPCNetworkCall(data) {
  setupPortIfNeeded();
  if (port && !port.disconnected) {
    try {
      port.postMessage({
        action: "gRPCNetworkCall",
        target: "panel",
        data,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      // Reset port and try to reconnect
      port = null;
      setupPortIfNeeded();
    }
  } else {
    console.warn("Port not available, attempting to reconnect...");
    setupPortIfNeeded();
  }
}

function handleMessageEvent(event) {
  if (event.source != window) return;
  if (event.data.type && event.data.type == "__GRPCWEB_DEVTOOLS__") {
    sendGRPCNetworkCall(event.data);
  }
}

// Initialize connection immediately
setupPortIfNeeded();

window.addEventListener("message", handleMessageEvent, false);
