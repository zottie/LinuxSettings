(function(){Registry.require(["helper"],function(){var h={},f=null,k=Registry.get("helper"),g=function(b){var a=b,c=Array.prototype.slice.call(arguments,1);1==c.length&&"Array"===k.toType(c[0])&&(c=c[0]);for(var d=/_0[a-zA-Z]+0/,e=0;e<c.length;e++){if(-1==a.search(d)){console.log("getMessage(): wrong argument count!!!");break}a=a.replace(d," "+c[e])}return a.replace(/_/g," ")},m=function(b){var a=[arguments[0]],c=[],d=function(a){for(var b=0;b<a.length;b++)"Array"===k.toType(a[b])?d(a[b]):c.push(String(a[b]))};
d(Array.prototype.slice.call(arguments,1));c.length&&a.push(c);return(a=chrome.i18n.getMessage.apply(this,a))?a:Registry.isDevVersion("helper")?(console.warn("i18n:#"+g.apply(this,arguments).replace(/ /g,"#")+"#"),"#"+g.apply(this,arguments).replace(/ /g,"#")+"#"):g.apply(this,arguments)},p=function(b){if(f){var a=h[b];if(a){var c=Array.prototype.slice.call(arguments,1),d=a.message;1==c.length&&"Array"===k.toType(c[0])&&(c=c[0]);for(var e in a.placeholders)try{var l=Number(a.placeholders[e].content.replace(/^\$/,
""))-1,n;l<c.length?(n=c[l],d=d.replace("$"+e+"$",n)):console.log("i18n: invalid argument count on processing '"+d+"' with args "+JSON.stringify(c))}catch(p){console.log("i18n: error processing '"+d+"' with args "+JSON.stringify(c))}return d}return g.apply(this,arguments)}return m.apply(this,arguments)};Registry.register("i18n","52",{getMessage:function(b){return p.apply(this,arguments)},getOriginalMessage:m,getLocale:function(){return f},setLocale:function(b){"null"===b&&(b=null);
if(f==b)return!0;if(b){var a=Registry.getRaw("_locales/"+b+"/messages.json");if(a)try{return h=JSON.parse(a),f=b,!0}catch(c){console.log("i18n: parsing locale "+b+" failed!")}else console.log("i18n: retrieving locale "+b+" failed!");return!1}h={};f=null;return!0}})})})();