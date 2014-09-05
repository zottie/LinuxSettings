(function(){Registry.require(["prepare"],function(){var h=Registry.prepare(),r=!1,g=!1,p=[],l=!0,f=$.Deferred,n=function(a){var b=f();b.resolve(a);return b.promise()},s=function(){var a=[h.CONSTANTS.STORAGE.VERSION,h.CONSTANTS.STORAGE.TYPE],b={};a.forEach(function(a){b[a]=!0});return{keys:a,has:function(a){return!!b[a]}}}(),z=function(){return window.openDatabase("tmStorage","1.0","TM Storage",31457280)},B=function(a){return a},u=function(a,b){if(!a)return b;var c=a[0];a=a.substring(1);switch(c){case "b":return"true"==
a;case "n":return Number(a);case "o":try{return JSON.parse(a)}catch(d){console.error("Storage: getValue ERROR: "+d.message)}return b;default:return a}},v=function(a){var b=(typeof a)[0];switch(b){case "o":try{a=b+JSON.stringify(a)}catch(c){console.error("Storage: setValue ERROR: "+c.message);return}break;default:a=b+a}return a},q=function(a,b){var c=f(),d=Array.prototype.slice.call(arguments,2),e;"string"==typeof a?a==h.DB.USE&&"clean"==b?console.warn("Storage: can't clean currently active storage"):
e=k.implementations[a][b]:e=a[b];if(e)if(d=e.apply(this,d),"object"===typeof d&&d.then)d.then(function(){c.resolve.apply(this,arguments)},function(a){c.reject()});else return d;else c.resolve();return c.promise()},w=function(a,b){var c=f(),d=[];Object.getOwnPropertyNames(b).forEach(function(c){void 0!==b[c]&&d.push(q(a,"setValue",c,b[c]))});$.when.apply($,d).done(function(){c.resolve()});return c.promise()},x=function(a,b){var c={};b.forEach(function(b){c[b]=q(a,"getValue",b)});return c},k={implementations:{localStorage:function(){var a=
{setValue:function(a,c){var d=f();g&&console.log("localStorage: setValue -> "+a);var e=v(c);l&&localStorage.setItem(a,e);d.resolve();return d.promise()},getValue:function(a,c){g&&console.log("Storage: getValue -> "+a);return u(localStorage.getItem(a,c),c)},deleteAll:function(){var b=f();g&&console.log("localStorage: deleteAll()");l&&a.listValues().forEach(function(a){s.has(a)||localStorage.removeItem(a)});b.resolve();return b.promise()},deleteValue:function(a){var c=f();g&&console.log("localStorage: deleteValue -> "+
a);l&&localStorage.removeItem(a);c.resolve();return c.promise()},listValues:function(){g&&console.log("localStorage: listValues");for(var a=[],c=0;c<localStorage.length;c++)a.push(B(localStorage.key(c)));return a}};return{options:{},methods:a}}(),sql:function(){var a=null,b=null,c=function(){var a=f();b.db.transaction(function(c){c.executeSql("CREATE TABLE IF NOT EXISTS config(ID INTEGER PRIMARY KEY ASC, name TEXT, value TEXT)",[],a.resolve,b.onError)});return a.promise()},d=function(){var a=f();
b={db:z(),onSuccess:function(a,b){g&&console.log("webSQL: localDB Success ")},onError:function(a,b){console.error("webSQL: localDB Error ",b)}};c().done(a.resolve);return a.promise()},e={setValue:function(m,c){var d=f();g&&console.log("Storage: setValue -> "+m);var e=v(c);l&&(a[m]?b.db.transaction(function(a){a.executeSql("UPDATE config SET value=? WHERE name=?",[e,m],function(){chrome.runtime.lastError&&console.log(chrome.runtime.lastError);d.resolve()},b.onError)}):b.db.transaction(function(a){a.executeSql("INSERT INTO config(name, value) VALUES (?,?)",
[m,e],function(){chrome.runtime.lastError&&console.log(chrome.runtime.lastError);d.resolve()},b.onError)}));a[m]=e;l||d.resolve();return d.promise()},getValue:function(b,c){g&&console.log("webSQL: getValue -> "+b);return u(a[b],c)},deleteAll:function(){var m=f();g&&console.log("webSQL: deleteAll()");var d=x(e,s.keys);a=d;l?b.db.transaction(function(a){a.executeSql("DROP TABLE config",[],function(){c().done(function(){w(e,d).done(m.resolve)})},b.onError)}):m.resolve();return m.promise()},deleteValue:function(c){var d=
f();g&&console.log("webSQL: deleteValue -> "+c);delete a[c];l?b.db.transaction(function(a){a.executeSql("DELETE FROM config WHERE name=?",[c],d.resolve,b.onError)}):d.resolve();return d.promise()},listValues:function(){g&&console.log("webSQL: listValues");var b=[];Object.getOwnPropertyNames(a).forEach(function(a){b.push(a)});return b},isWorking:function(){return n()}};return{init:function(){var c=f(),e=function(b,t){a={};if(t)for(var d=0;d<t.rows.length;d++)a[t.rows.item(d).name]=t.rows.item(d).value;
c.resolve()},A=function(){a?c.resolve():b.db.transaction(function(a){a.executeSql("SELECT * FROM config",[],e,b.onError)})};b?A():d().done(A);return c.promise()},clean:function(){a=null;return n()},options:{},methods:e}}(),chromeStorage:function(){var a=null,b=!1,c=!1,d=function(b,d){if(l&&c&&"local"==d)for(var e in b){var f=b[e];f.newValue?a[e]=f.newValue:delete a[e];g&&console.log("si: local storage key ",e," changed. Old value was ",f.oldValue,", new value is ",f.newValue,".",e,d)}},e={setValue:function(b,
c){var d=f();g&&console.log("chromeStorage: setValue -> "+b);a[b]=c;if(l){var e={};e[b]=c;chrome.storage.local.set(e,d.resolve)}else d.resolve();return d.promise()},getValue:function(b,c){g&&console.log("chromeStorage: getValue -> "+b);return void 0===a[b]?c:a[b]},deleteAll:function(){var b=f();g&&console.log("chromeStorage: deleteAll()");var c=x(e,s.keys);a=c;l?chrome.storage.local.clear(function(){w(e,c).done(b.resolve)}):b.resolve();return b.promise()},deleteValue:function(b){var c=f();g&&console.log("chromeStorage: deleteValue -> "+
b);delete a[b];l?chrome.storage.local.remove(b,c.resolve):c.resolve();return c.promise()},listValues:function(){g&&console.log("chromeStorage: listValues");var b=[];Object.getOwnPropertyNames(a).forEach(function(a){b.push(a)});return b},setTemporary:function(a){l=!a;c=!0},isSupported:function(){return n()},isWorking:function(){var a=f(),b=function(){console.warn("storage:",chrome.runtime.lastError?chrome.runtime.lastError.message:"storage set/get test failed!");chrome.runtime.lastError?a.reject():
a.resolve()},c=window.setTimeout(function(){c=null;b()},6E4);chrome.storage.local.set({foo:"bar"},function(){chrome.storage.local.get("foo",function(d){window.clearTimeout(c);c=null;if(!d||"bar"!==d.foo)return b();chrome.storage.local.remove("foo",a.resolve)})});return a.promise()}};return{init:function(){var c=f();a?c.resolve():chrome.storage.local.get(null,function(e){a={};for(var f in e)a[f]=e[f];b||(chrome.storage.onChanged.addListener(d),b=!0);c.resolve()});return c.promise()},clean:function(){var b=
f();a=null;b.resolve();return b.promise()},options:{},methods:e}}(),file:function(){var a=null,b=null,c=function(){var a=f(),c=function(b){console.warn("fileStorage: listFiles() error:",b);a.reject()};b.root.getDirectory("data",{create:!0},function(b){var d=b.createReader(),e=[],f=function(){d.readEntries(function(b){b.length?(e=e.concat(b),f()):a.resolve(e)},c)};f()},c);return a.promise()},d=function(a,c){var d=f(),e=function(b){console.warn("fileStorage: writeFileData(",a,") error:",b);d.reject()};
b.root.getDirectory("data",{create:!0},function(b){b.getFile(a,{create:!0},function(a){a.createWriter(function(a){a.onwriteend=function(b){a.onwriteend=function(a){d.resolve()};a.onerror=e;b=new Blob([c],{type:"text/plain"});a.write(b)};a.truncate(0)},e)},e)},e);return d.promise()},e=function(a){var c=f(),d=function(b){console.warn("fileStorage: getFileData(",a,") error:",b);c.reject()},e=function(a){var b=new FileReader;b.onloadend=function(){c.resolve(this.result)};b.onerror=d;b.onabort=d;b.readAsText(a)};
b.root.getDirectory("data",{create:!0},function(b){b.getFile(a,{},function(a){a.file(function(a){e(a)},d)},d)},d);return c.promise()},m=function(a){var c=f(),d=function(b){console.warn("fileStorage: getFileData(",a,") error:",b);c.reject()};b.root.getDirectory("data",{create:!0},function(b){b.getFile(a,{create:!1},function(a){a.remove(c.resolve,d)},d)},d);return c.promise()},h=function(){var a=f(),c=function(b){console.warn("fileStorage: removeDir() error:",b);a.reject()};b.root.getDirectory("data",
{create:!0},function(b){b.removeRecursively(a.resolve,c)},c);return a.promise()},k=function(){var b=f();a={};var d=[];c().done(function(c){c.forEach(function(b){"string"!==typeof b&&(b=b.name);d.push(e(b).always(function(c){a[b]=c}))});$.when.apply($,d).always(function(){b.resolve()})}).fail(b.resolve);return b.promise()},y={isSupported:function(){var a=f();window.File&&window.FileReader&&window.FileList&&window.Blob?a.resolve():a.reject();return a.promise()},isWorking:function(){return n()},setValue:function(b,
c){var e=f();g&&console.log("fileStorage: setValue -> "+b);var m=v(c);a[b]=m;l?d(b,m).always(e.resolve):e.resolve();return e.promise()},getValue:function(b,c){g&&console.log("fileStorage: getValue -> "+b);return u(a[b],c)},deleteAll:function(){var b=f();g&&console.log("fileStorage: deleteAll()");var c=x(y,s.keys);a=c;l?h().always(function(){w(y,c).always(b.resolve)}):b.resolve();return b.promise()},deleteValue:function(b){var c=f();g&&console.log("fileStorage: deleteValue -> "+b);delete a[b];l?m(b).always(c.resolve):
c.resolve();return c.promise()},listValues:function(){g&&console.log("fileStorage: listValues");var b=[];Object.getOwnPropertyNames(a).forEach(function(a){b.push(a)});return b}};return{init:function(){var c=f();a?c.resolve():(window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem,window.requestFileSystem(window.PERSISTENT,31457280,function(a){b=a;k().done(c.resolve)},function(a){a&&console.warn("fileStorage: ",a);c.reject()}));return c.promise()},clean:function(){a=null;
return n()},options:{},methods:y}}()},migrate:function(a,b,c){var d=f(),e=k.implementations[a],m=k.implementations[b];c=c||{};e&&m?(g&&console.log("Migration: from",a,"to",b),q(a,"init").then(function(){return q(b,"init")}).then(function(){var a=f(),b=[];e.methods.listValues().forEach(function(a){var d=e.methods.getValue(a);c.drop&&b.push(e.methods.deleteValue(a));g&&console.log("Migration: copy value of "+a);b.push(m.methods.setValue(a,d))});$.when.apply($,b).done(function(){a.resolve()});return a.promise()}).then(function(){return q(b,
"clean")}).then(function(){return q(a,"clean")}).done(function(){d.resolve()}).fail(function(){d.reject()})):(console.error("Migration: unknown storage implementation(s) ",a,b),d.reject());return d.promise()},isSupported:function(){return n()},isWorking:function(){return n()},setTemporary:function(a){l=!a},init:function(){r&&console.log("Storage: use "+h.DB.USE);Object.getOwnPropertyNames(k.implementations[h.DB.USE].methods).forEach(function(a){k.__defineGetter__(a,function(){return k.implementations[h.DB.USE].methods[a]})});
return k.implementations[h.DB.USE].init?k.implementations[h.DB.USE].init():n()},getValues:function(a,b){var c={};b||(b={});Object.getOwnPropertyNames(a).forEach(function(a){c[a]=k.implementations[h.DB.USE].getValue(a,b[a])});return c},factoryReset:function(){localStorage.removeItem(h.CONSTANTS.STORAGE.LEGACY_VERSION);return k.deleteAll()},isWiped:function(){if("localStorage"===h.DB.USE)return n(!1);var a=f(),b=k.getValue(h.CONSTANTS.STORAGE.VERSION),c=!1;localStorage.getItem(h.CONSTANTS.STORAGE.LEGACY_VERSION)&&
!b&&(k.listValues().length?console.warn("storage: unable to find version information"):c=!0);a.resolve(c);return a.promise()},setVersion:function(a,b){var c=f();l?(localStorage.setItem(h.CONSTANTS.STORAGE.LEGACY_VERSION,a),k.setValue(h.CONSTANTS.STORAGE.VERSION,a).then(function(){return b?k.setValue(h.CONSTANTS.STORAGE.SCHEMA,b):n()}).always(c.resolve)):c.resolve();return c.promise()},getVersion:function(a){var b=f(),c=k.getValue(h.CONSTANTS.STORAGE.VERSION)||k.getValue(h.CONSTANTS.STORAGE.LEGACY_VERSION)||
localStorage.getItem(h.CONSTANTS.STORAGE.LEGACY_VERSION);c?b.resolve(c):q("sql","init").then(function(b){c=k.implementations.sql.methods.getValue(h.CONSTANTS.STORAGE.LEGACY_VERSION)||a;return q("sql","clean")}).always(function(){r&&console.log("Storage: unable to determine ");b.resolve(c)});return b.promise()},getSchemaVersion:function(){return k.getValue(h.CONSTANTS.STORAGE.SCHEMA,"3.5")},debug:function(a,b){g|=b;r|=a},addClientListener:function(a,b,c,d,e){p.push({tabid:a,id:b,uuid:c,time:d,response:e})},
removeClientListeners:function(a,b,c){void 0===c&&(c=!0);var d=p;p=[];for(var e in d){var f=d[e];try{f.uuid==a&&f.id==b?(g&&console.log("Storage: send empty response "+a+" "+b),c&&f.response({})):p.push(f)}catch(h){r&&console.debug("Storage: listener clear for script "+a+" failed! Page reload?!")}}},notifyClientListeners:function(a,b,c){var d=p;p=[];for(var e in d){var f=d[e];try{a&&f.uuid==a?(g&&console.log("Storage: notify "+a),c&&c(f.response),p.push(f)):null!==b&&f.tabid==b?(g&&console.log("Storage: refresh/remove listeners of tab "+
b),c&&c(f.response)):p.push(f)}catch(h){console.log("Storage: listener notification for script "+a+" failed! Page reload?!")}}},recover:function(a,b){"string"===typeof a&&(a={method:a,storages:["sql","chromeStorage"]});var c={};a.storages.forEach(function(a){c[a]=!0});if("log"==a.method){var d=null,e,f,g=[{method:"sql",fn:function(a){console.debug("check sql storage for data...");try{f=z();if(chrome.runtime.lastError)return d=chrome.runtime.lastError,a();f.transaction(function(b){b.executeSql("CREATE TABLE IF NOT EXISTS config(ID INTEGER PRIMARY KEY ASC, name TEXT, value TEXT)",
[],function(){console.debug("sql table found/created");a()},function(b,c){d=c;a()})})}catch(b){d=b,window.setTimeout(a,1)}}},{method:"sql",fn:function(a){var b={};f.transaction(function(c){c.executeSql("SELECT * FROM config",[],function(c,d){if(d)for(var f=0;f<d.rows.length;f++)b[d.rows.item(f).name]=d.rows.item(f).value;e=b;window.setTimeout(a,1)},function(b,c){d=c;a()})})}},{method:"sql",fn:function(a){var b=e?Object.getOwnPropertyNames(e):[];e&&b.length?(console.debug("found values:"),b.forEach(function(a){console.debug("    ",
a,e[a]&&30<e[a].length?e[a].substr(0,30):e[a])})):(console.warn("no data found"),c.sql=!1);window.setTimeout(a,1)}},{method:"chromeStorage",fn:function(a){console.debug("check chromeStorage for data...");chrome.storage.local.get(null,function(b){e=b;a()})}},{method:"chromeStorage",fn:function(a){var b=e?Object.getOwnPropertyNames(e):[];e&&b.length?(console.debug("found values:"),b.forEach(function(a){console.debug("    ",a,e[a]&&30<e[a].length?e[a].substr(0,30):e[a])})):(console.warn("no data found"),
c.chromeStorage=!1,window.setTimeout(a,1))}}],h=0,k=function(){if(d)console.warn("error:",d);else for(;g[h];){if(c[g[h].method]){g[h].fn(k);h++;return}h++}b&&b()};k()}}};Registry.register("storage","52",function(){return k})})})();