(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{194:function(e,t,r){"use strict";r.r(t);r(26),r(16),r(25),r(42),r(43);var n=r(24),c=r(5);r(41);function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var l={data:function(){return{}},asyncData:function(e){return Object(c.a)(regeneratorRuntime.mark((function t(){var r,n,c,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.$axios,n=e.error,e.store,c=e.params,t.next=3,r.get("http://47.100.203.244:33669/api/docs/detail?id=".concat(c.id));case 3:if(200!=(o=t.sent).data.code){t.next=8;break}return t.abrupt("return",f({template:"qm-common"},o.data.data));case 8:n({statusCode:500,message:"内部服务器错误"});case 9:case"end":return t.stop()}}),t)})))()}},O=r(34),component=Object(O.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r(e.template,{tag:"component",attrs:{content:e.content}})],1)}),[],!1,null,null,null);t.default=component.exports}}]);