(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{30:function(e,t,a){e.exports=a(47)},39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var n,r,l=a(0),o=a.n(l),c=a(13),i=a.n(c),s=a(7),u=a(12),d=a(2),b=a(3),p=a(5),m=a(4),h=a(6),g=(a(39),a(27)),f=(a(40),a(21)),v=a.n(f),E=(a(41),function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r))))._renderContent=function(e){if(e){var t=a.props.clipboardIsEnabled,n=e.method,r=e.request,l=e.response,c=e.error,i=window.matchMedia("(prefers-color-scheme: dark)").matches?"twilight":"rjv-default",s={method:n};return r&&(s.request=r),l&&(s.response=l),c&&(s.error=c),o.a.createElement(v.a,{name:"grpc",theme:i,style:{backgroundColor:"transparent"},enableClipboard:t,src:s})}},a}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.props.entry;return o.a.createElement("div",{className:"widget vbox details-data"},this._renderContent(e))}}]),t}(l.Component)),O=Object(s.b)(function(e){return{entry:e.network.selectedEntry,clipboardIsEnabled:e.clipboard.clipboardIsEnabled}})(E),j=(a(42),function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=0===navigator.platform.indexOf("Mac")?"\u2318":"Ctrl";return o.a.createElement("div",{className:"network-empty"},o.a.createElement("div",{className:"content"},o.a.createElement("div",null,"Recording gRPC network activity..."),o.a.createElement("div",null,"Perform a request or hit ",o.a.createElement("strong",null,e," R")," to record the reload"),o.a.createElement("div",null,o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/SafetyCulture/grpc-web-devtools"},"Learn more"))))}}]),t}(l.PureComponent)),L=a(22),y=a(26),C=a(23),k=a(24),w=a.n(k),x=Object(u.b)({slice:"toolbar",initialState:{filterIsOpen:!0,filterIsEnabled:!1,filterValue:""},reducers:{toggleFilter:function(e){e.filterIsOpen=!e.filterIsOpen},setFilterValue:function(e,t){var a=t.payload;e.filterValue=a,e.filterIsEnabled=!!(e.filterValue&&e.filterValue.length>0)}}}),N=x.actions,_=x.reducer,I=N.toggleFilter,F=N.setFilterValue,P=_,B=new w.a(null,{shouldSort:!1,threshold:.1,distance:1e4,keys:["method"]}),M=Object(u.b)({slice:"network",initialState:{preserveLog:!1,selectedIdx:null,selectedEntry:null,log:[],_filterValue:"",_logBak:[]},reducers:{networkLog:function(e,t){var a=e.log,n=e._filterValue,r=e._logBak,l=t.payload;if(l.method){var o=l.method.split("/");l.endpoint=o.pop()||o.pop()}n.length>0?(r.push(l),B.setCollection(r),e.log=B.search(n)):a.push(l)},selectLogEntry:function(e,t){var a=t.payload,n=e.log[a];n&&(e.selectedIdx=a,e.selectedEntry=n)},clearLog:function(e,t){var a=t.payload,n=(a=void 0===a?{}:a).force;e.preserveLog&&!n||(e.selectedIdx=null,e.selectedEntry=null,e.log=[],e._logBak=[])},setPreserveLog:function(e,t){var a=t.payload;e.preserveLog=a}},extraReducers:Object(C.a)({},F,function(e,t){var a=t.payload,n=void 0===a?"":a;if(e._filterValue=n,0===n.length)return e.log=e._logBak,void(e._logBak=[]);0===e._logBak.length&&0!==e.log.length&&(e._logBak=e.log),B.setCollection(e._logBak),e.log=B.search(n)})}),V=M.actions,Z=M.reducer,S=V.networkLog,R=V.selectLogEntry,q=V.clearLog,T=V.setPreserveLog,z=Z,J=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return o.a.createElement("svg",{width:"14",viewBox:"0 0 14 14"},o.a.createElement("path",{d:"M7.935,10.205L6.242,11.899L12.517,12.517L11.899,6.242L10.205,7.935L3.752,1.483L1.483,3.752L7.935,10.205Z"}))}}]),t}(l.PureComponent),A=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return o.a.createElement("svg",{width:"14",viewBox:"0 0 14 14"},o.a.createElement("path",{d:"M7.935,3.795L6.242,2.101L12.517,1.483L11.899,7.758L10.205,6.065L3.752,12.517L1.483,10.248L7.935,3.795Z"}))}}]),t}(l.PureComponent),D=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return o.a.createElement("svg",{width:"14",viewBox:"0 0 14 14"},o.a.createElement("path",{d:"M2.403,4.875L0,4.875L4,0L8,4.875L5.597,4.875L5.597,14L2.403,14L2.403,4.875Z"}),o.a.createElement("path",{d:"M11.605,9.125L14,9.125L10,14L6,9.125L8.395,9.125L8.395,0L11.605,0L11.605,9.125Z"}))}}]),t}(l.PureComponent),W=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e,t=this.props,a=t.methodType,n=t.isRequest;return"server_streaming"===a&&(e=n?A:J),"unary"===a&&(e=D),e?o.a.createElement(e,null):null}}]),t}(l.Component),U=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.props,t=e.index,a=e.data,n=e.style,r=e.selectLogEntry,l=e.selectedIdx,c=a[t];return o.a.createElement("div",{className:"data-row ".concat((t+1)%2===0?"":"odd"," ").concat(t===l?"selected":""," ").concat(c.error?"error":""," "),style:n,onClick:function(){return r(t)}},o.a.createElement(W,{methodType:c.methodType,isRequest:!!c.request}),c.endpoint)}}]),t}(l.PureComponent),G={selectLogEntry:R},H=Object(s.b)(function(e){return{selectedIdx:e.network.selectedIdx}},G)(U),K=(a(44),function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.props.network;return o.a.createElement("div",{className:"widget vbox network-list"},o.a.createElement("div",{className:"widget vbox"},o.a.createElement("div",{className:"data-grid"},o.a.createElement("div",{className:"header-container"},o.a.createElement("table",{className:"header"},o.a.createElement("tbody",null,o.a.createElement("tr",null,o.a.createElement("th",null,o.a.createElement("div",null,"Name")))))),o.a.createElement("div",{className:"data-container"},o.a.createElement(L.a,{disableWidth:!0},function(t){var a=t.height;return o.a.createElement(y.a,{className:"data",itemCount:e.log.length,height:a,itemSize:21,itemData:e.log,overscanCount:50},H)})))))}}]),t}(l.Component)),Q=Object(s.b)(function(e){return{network:e.network}})(K),X=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"_renderContent",value:function(){return this.props.isEmpty?o.a.createElement(j,null):o.a.createElement(g.a,{className:"hbox flex-auto",sizes:[30,70],gutterSize:5,cursor:"ew-resize"},o.a.createElement(Q,null),o.a.createElement(O,null))}},{key:"render",value:function(){return o.a.createElement("div",{className:"vbox flex-auto"},o.a.createElement("div",{className:"shadow-split-widget hbox widget"},this._renderContent()))}}]),t}(l.Component),Y=Object(s.b)(function(e){return{isEmpty:0===e.network.log.length}})(X),$=a(28),ee=Object(u.b)({slice:"clipboard",initialState:{clipboardIsEnabled:!1},reducers:{toggleClipboard:function(e){e.clipboardIsEnabled=!e.clipboardIsEnabled}}}),te=ee.actions,ae=ee.reducer,ne=te.toggleClipboard,re=ae,le=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return o.a.createElement("svg",{width:"14",viewBox:"0 0 14 14"},o.a.createElement("path",{d:"M7.087,0.251C10.166,0.309 13.043,2.669 13.629,5.723C14.21,8.753 12.415,12.079 9.551,13.251C6.414,14.533 2.406,13.015 0.916,9.926C-0.625,6.728 0.865,2.415 4.148,0.881C5.011,0.478 5.959,0.269 6.913,0.251C7,0.25 7,0.25 7.087,0.251ZM3.166,4.415C1.773,6.497 2.43,9.67 4.651,10.984C6.129,11.858 8.086,11.816 9.546,10.861L9.622,10.809L3.191,4.378C3.182,4.39 3.174,4.402 3.166,4.415ZM6.957,2.375C6.192,2.386 5.435,2.584 4.764,2.951L11.043,9.247C12.539,6.573 10.667,2.533 7.179,2.378C7.105,2.376 7.031,2.375 6.957,2.375Z"}))}}]),t}(l.PureComponent),oe=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return o.a.createElement("svg",{width:"14",viewBox:"0 0 14 14"},o.a.createElement("path",{d:"M3.434,5.127L10.581,5.127L8.56,7.42L8.56,11.523L5.456,11.584L5.456,7.42L3.434,5.127Z",style:{fillOpacity:.4}}),o.a.createElement("path",{d:"M13.992,3.347L9.997,7.982L9.997,12.413C8.24,12.908 6.385,13.147 4.646,12.603L3.992,12.384L3.992,7.982L-0.005,3.347L-0.005,1.095L13.992,1.086C13.992,1.84 13.992,2.594 13.992,3.347ZM1.495,2.594L1.495,2.79L5.492,7.425L5.492,11.283C6.16,11.441 6.364,11.44 6.804,11.446C7.375,11.455 7.94,11.383 8.497,11.264L8.497,7.425L12.492,2.79L12.492,2.587C8.827,2.589 5.161,2.592 1.495,2.594Z"}))}}]),t}(l.PureComponent),ce=(a(45),function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r))))._onPreserveLogChanged=function(e){(0,a.props.setPreserveLog)(e.target.checked)},a._onEnableClipboardChanged=function(e){(0,a.props.toggleClipboard)(e.target.checked)},a._onFilterValueChanged=function(e){(0,a.props.setFilterValue)(e.target.value)},a}return Object(h.a)(t,e),Object(b.a)(t,[{key:"_renderButtons",value:function(){var e=this.props,t=e.clearLog,a=e.toggleFilter,n=e.toolbar,r=n.filterIsEnabled,l=n.filterIsOpen;return o.a.createElement(o.a.Fragment,null,o.a.createElement(se,{title:"Clear",onClick:function(){return t({force:!0})}},o.a.createElement(le,null)),o.a.createElement(se,{title:"Filter",onClick:function(){return a()},className:(l?"open ":"")+(r?"enabled":"")},o.a.createElement(oe,null)))}},{key:"_renderFilterToolbar",value:function(){var e=this.props.toolbar,t=e.filterIsOpen,a=e.filterValue;if(t)return o.a.createElement("div",{className:"toolbar"},o.a.createElement("div",{className:"toolbar-shadow"},o.a.createElement("span",{className:"toolbar-item text"},o.a.createElement("input",{type:"text",placeholder:"Filter",value:a,onChange:this._onFilterValueChanged}))))}},{key:"render",value:function(){var e=this.props,t=e.preserveLog,a=e.clipboardIsEnabled;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"toolbar"},o.a.createElement("div",{className:"toolbar-shadow"},this._renderButtons(),o.a.createElement(ie,null),o.a.createElement("span",{className:"toolbar-item checkbox",title:"Do not clear log on page reload / navigation"},o.a.createElement("input",{type:"checkbox",id:"ui-checkbox-preserve-log",checked:t,onChange:this._onPreserveLogChanged}),o.a.createElement("label",{htmlFor:"ui-checkbox-preserve-log"},"Preserve log")),o.a.createElement(ie,null),o.a.createElement("span",{className:"toolbar-item checkbox",title:"Enables clipboard for JSON tree (decreases rendering performance)"},o.a.createElement("input",{type:"checkbox",id:"ui-checkbox-clipboard-is-enabled",checked:a,onChange:this._onEnableClipboardChanged}),o.a.createElement("label",{htmlFor:"ui-checkbox-clipboard-is-enabled"},"Enable clipboard")))),this._renderFilterToolbar())}}]),t}(l.Component)),ie=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"toolbar-item toolbar-divider"})}}]),t}(l.Component),se=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.props,t=e.children,a=e.className,n=void 0===a?"":a,r=Object($.a)(e,["children","className"]);return o.a.createElement("button",Object.assign({className:"toolbar-button toolbar-item "+n},r),t)}}]),t}(l.Component),ue={setPreserveLog:T,clearLog:q,toggleFilter:I,setFilterValue:F,toggleClipboard:ne},de=Object(s.b)(function(e){return{preserveLog:e.network.preserveLog,toolbar:e.toolbar,clipboardIsEnabled:e.clipboard.clipboardIsEnabled}},ue)(ce),be=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"vbox flex-auto"},o.a.createElement("div",{className:"hbox widget"},o.a.createElement("div",{className:"vbox app-contents flex-auto"},o.a.createElement("div",{className:"vbox widget"},o.a.createElement("div",{className:"vbox flex-auto"},o.a.createElement("div",{className:"widget vbox"},o.a.createElement(de,null),o.a.createElement(Y,null)))))))}}]),t}(l.Component);a(46);if(chrome)try{r=chrome.devtools.inspectedWindow.tabId,(n=chrome.runtime.connect(null,{name:"panel"})).postMessage({tabId:r,action:"init"}),n.onMessage.addListener(function(e){var t=e.action,a=e.data;"gRPCNetworkCall"===t&&pe.dispatch(S(a))}),chrome.tabs.onUpdated.addListener(function(e,t){var a=t.status;e===r&&"loading"===a&&pe.dispatch(q())})}catch(me){console.warn("not running app in chrome extension panel")}var pe=Object(u.a)({reducer:{network:z,toolbar:P,clipboard:re}});i.a.render(o.a.createElement(s.a,{store:pe},o.a.createElement(be,null)),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.c89cf94d.chunk.js.map