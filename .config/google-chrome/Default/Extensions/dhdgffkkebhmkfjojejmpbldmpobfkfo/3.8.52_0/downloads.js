Registry.require(["prepare","helper","i18n","xmlhttprequest","permission"],function(){var p=Registry.prepare(),g=Registry.get("helper"),d=Registry.get("permission"),q=Registry.get("i18n"),y=Registry.get("xmlhttprequest").run,h="default",r=[],f=null,s=!1,k={},t=!1,l=$.Deferred,u=function(a){var c=l();c.resolve(a);return c.promise()},e={DEFAULT:"default",OFF:"off",NATIVE:"native",CHROME:"chrome",NOT_ENABLED:"not_enabled",NOT_WHITELISTED:"not_whitelisted",NOT_PERMITTED:"not_permitted",NOT_SUPPORTED:"not_supported",
NOT_SUCCEEDED:"not_succeeded"},v=function(){var a=l();Registry.vendor(["saveas/filesaver"],function(){v=u;a.resolve()});return a.promise()},m=function(){return null!==f?u(f):d.has(d.permDownloads).then(function(a){f=a;console.log("downs: permission to use chrome.downloads ->",a);return m()})},z=function(a,c){if(this[a])this[a]("function"==typeof c?c():c)},n=function(a,c){this[a]&&(z.apply(this,arguments),this[a]=null)},B=function(a,c,b){f&&!t&&p.DOWNLOAD.SUPPORTED&&(chrome.downloads.onChanged.addListener(A),
t=!0);b={filename:a.name,body:a.data};["url","method","saveAs","headers"].forEach(function(c){b[c]=a[c]});chrome.downloads.download(b,function(b){k[b]={callbacks:c,url:a.url,name:a.name}})},C=function(a,c,b){void 0===c&&(c={});void 0===b&&(b={});var e=function(){return n.apply(c,arguments)};a.responseType="blob";a.method=a.method||"GET";y(a,{onload:function(b){var c=b.responseHeaders?b.responseHeaders.split("\n"):null,d=null,h;for(h in c){var f=c[h].split(":"),g=f.shift()||"",f=f.join(":")||"";"content-type"==
g.trim().toLowerCase()&&(d=f.trim())}b=new Blob([b.response],{type:a.overrideMimeType||d||"binary/octet-stream"});saveAs(b,a.name);e("onload",{})},ondone:function(){e("ondone",{})},onerror:b.onerror,ontimeout:b.ontimeout,onprogress:b.onprogress})},A=function(a){var c=k[a.id];if(c){var b=c.callbacks,d=function(){return n.apply(b,arguments)};a.error?(console.warn("downs: download of",c.name,"("+c.url+")","failed",a.error),d("onerror",{error:e.NOT_SUCCEEDED,details:a.error})):a.endTime&&(console.debug("downs: download of",
c.name,"("+c.url+")","finished"),d("onload",{}),d("ondone",{}),delete k[a.id])}},w=function(a){var c=!1;g.each(r,function(b,d){if(b&&b.length)try{var e;if("/"===b[0])b=b.replace(/^\//g,"").replace(/\/$/g,""),"$"!==b[b.length-1]&&(console.log("downs: patching $ into",b),b+="$"),e=RegExp(b,"i");else if("."===b[0]){var f=[g.escapeForRegExp(b),"$"].join("");e=RegExp(f,"i")}else console.warn("downs: invalid file extension:",'"'+b+'"','starts neither with "." nor with "/"');if(e&&-1!==a.search(e))return console.log("downs:",
b,"matched @",a),c=!0}catch(h){console.warn("downs: can't process",b,h)}});return c},x=function(){return d.has(d.permDownloads).then(function(a){var c=l();s||a?c.resolve({permission:a,asked:!1}):d.ask(d.permDownloads,q.getMessage("Browser_API_Downloads"),q.getMessage("Click_here_to_allow_TM_to_start_downloads")).done(function(a){c.resolve({permission:a,asked:!0})});s=!0;return c.promise()})};Registry.register("downloads","52",{start:function(a,c,b){var d=this,f=arguments,g=function(){return n.apply(c,
arguments)};console.log("downs: start",a);h==e.OFF||h==e.DEFAULT?(console.log("downs: feature is not enabled"),g("onerror",{error:e.NOT_ENABLED})):a.name&&w(a.name)?h==e.CHROME?p.DOWNLOAD.SUPPORTED?m().done(function(a){a?B.apply(d,f):(console.log("downs: download permission is missing"),g("onerror",{error:e.NOT_PERMITTED}))}):(console.log("downs: this download mode is not supported"),g("onerror",{error:e.NOT_SUPPORTED})):(a.name=a.name||"File.download",v().done(function(){C.apply(d,f)})):(console.log("downs:",
a.name,"is not whitelisted"),g("onerror",{error:e.NOT_WHITELISTED}))},set_mode:function(a){h=a;h==e.CHROME&&m().done(function(a){a||x().done(function(a){a.permission&&a.asked&&window.location.reload()})})},set_whitelist:function(a){"Array"===g.toType(a)&&(r=a)},is_whitelisted:w,request_permission:x,remove_permission:function(){return d.remove(d.permDownloads)},staticVars:e})});
