# gRPC-Web Dev Tools

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)


![gRPC-Web Dev Tools](screenshots/store_light_dark.png)
Now supports dark mode.

## Installation

### Chrome
  1. open the **Extension Management** page by navigating to `chrome://extensions`.
  1. enable **Developer Mode** by clicking the toggle switch next to "Developer mode".
  1. Click the **LOAD UNPACKED** button and select the extension `./build` directory.

## Usage

```javascript
const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
const client = new EchoServiceClient('http://myapi.com');
enableDevTools([
  client,
]);
```
> NOTE: Requires that your generated client(s) use `protoc-gen-grpc-web` >= 1.0.4
