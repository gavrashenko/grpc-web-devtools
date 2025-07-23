// Copyright (c) 2019 SafetyCulture Pty Ltd. All Rights Reserved.
// This script is injected into the page to intercept gRPC-Web calls

window.__GRPCWEB_DEVTOOLS__ = function (clients) {
  if (clients.constructor !== Array) {
    return
  }
  const postType = "__GRPCWEB_DEVTOOLS__";
  var StreamInterceptor = function (method, request, stream) {
    this._callbacks = {};
    const methodType = "server_streaming";
    const plainRequest = JSON.parse(JSON.stringify(request.toObject()));
    window.postMessage({
      type: postType,
      method,
      methodType,
      request: plainRequest,
      timestamp: Date.now(),
    });
    stream.on('data', response => {
      const plainResponse = JSON.parse(JSON.stringify(response.toObject()));
      window.postMessage({
        type: postType,
        method,
        methodType,
        response: plainResponse,
        timestamp: Date.now(),
      });
      if (!!this._callbacks['data']) {
        this._callbacks['data'](response);
      }
    });
    stream.on('status', status => {
      if (status.code === 0) {
        window.postMessage({
          type: postType,
          method,
          methodType,
          response: "EOF",
          timestamp: Date.now(),
        });
      }
      if (!!this._callbacks['status']) {
        this._callbacks['status'](status);
      }
    });
    stream.on('error', error => {
      if (error.code !== 0) {
        window.postMessage({
          type: postType,
          method,
          methodType,
          error: {
            code: error.code,
            message: error.message,
          },
          timestamp: Date.now(),
        });
      }
      if (!!this._callbacks['error']) {
        this._callbacks['error'](error);
      }
    });
    this._stream = stream;
  }
  StreamInterceptor.prototype.on = function (type, callback) {
    this._callbacks[type] = callback;
    return this;
  }
  StreamInterceptor.prototype.cancel = function () {
    this._stream.cancel()
  }
  clients.map(client => {
    client.client_.rpcCall_ = client.client_.rpcCall;
    client.client_.rpcCall2 = function (method, request, metadata, methodInfo, callback) {
      var posted = false;
      var newCallback = function (err, response) {
        if (!posted) {
          const plainRequest = JSON.parse(JSON.stringify(request.toObject()));
          const plainResponse = err ? undefined : JSON.parse(JSON.stringify(response.toObject()));
          window.postMessage({
            type: postType,
            method,
            methodType: "unary",
            request: plainRequest,
            response: plainResponse,
            error: err || undefined,
            timestamp: Date.now(),
          }, "*")
          posted = true;
        }
        callback(err, response)
      }
      return this.rpcCall_(method, request, metadata, methodInfo, newCallback);
    }
    client.client_.rpcCall = client.client_.rpcCall2;
    client.client_.unaryCall = function (method, request, metadata, methodInfo) {
      return new Promise((resolve, reject) => {
        this.rpcCall2(method, request, metadata, methodInfo, function (error, response) {
          error ? reject(error) : resolve(response);
        });
      });
    };
    client.client_.serverStreaming_ = client.client_.serverStreaming;
    client.client_.serverStreaming2 = function (method, request, metadata, methodInfo) {
      var stream = client.client_.serverStreaming_(method, request, metadata, methodInfo);
      var si = new StreamInterceptor(method, request, stream);
      return si;
    }
    client.client_.serverStreaming = client.client_.serverStreaming2;
  })
}
