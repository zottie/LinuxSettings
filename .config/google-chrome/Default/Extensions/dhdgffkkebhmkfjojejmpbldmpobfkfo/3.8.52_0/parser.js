Registry.require(["helper","convert","compat"],function(){var t=Registry.get("convert"),f=Registry.get("helper"),h=Registry.get("compat"),p=function(a){var b=null;a=encodeURI(a);return b=(b=a.match(/[a-zA-Z0-9]/g))?b.join(""):f.filter(t.Base64.encode(a),/[a-zA-Z0-9]/g)},q=function(){this.uuid=null;this.observers=[];this.description=this.homepage=this.namespace=this.name=this.supportURL=this.updateURL=this.downloadURL=this.fileURL=this.icon64=this.icon=null;this.system=!1;this.enabled=!0;this.position=
0;this.grant=[];this.requires=[];this.includes=[];this.matches=[];this.excludes=[];this.resources=[];this.lastModified=this.lastUpdated=0;this.version=null;this.sync={imported:!1};this.options={comment:null,compatopts_for_requires:!0,compat_wrappedjsobject:!1,compat_metadata:!1,compat_foreach:!1,compat_arrayleft:!1,compat_prototypes:!1,compat_uW_gmonkey:!1,compat_forvarin:!1,noframes:null,awareOfChrome:!1,run_at:null,user_agent:"",override:{includes:!1,merge_includes:!0,use_includes:[],orig_includes:[],
matches:!1,merge_matches:!0,use_matches:[],orig_matches:[],excludes:!1,merge_excludes:!0,use_excludes:[],orig_excludes:[]}}},l={Script:q,getScriptId:p,processMetaHeader:function(a){var b={},c=["uso:hash","version","name"];a=a.replace(/\'/gi,"").replace(/\"/gi,"");a=a.replace(/\t/gi,"    ");a=a.replace(/\r/gi,"");for(var m in c)b[c[m]]=f.getStringBetweenTags(a,"@"+c[m],"\n").trim();return b},processHeader:function(a){var b=new q,c="name namespace version author copyright description".split(" "),m=
["iconURL","defaulticon","icon"],h=["icon64URL","icon64"],l=["homepageURL","homepage","website","source"];a=a.replace(/\'/g,"").replace(/\"/g,"");a=a.replace(/\t/g,"    ");a=a.replace(/\r/g,"\n");a=a.replace(/\n\n+/g,"\n");a=a.replace(/[^|\n][ \t]+\/\//g,"//");var e,k,r,g,d;a=a.split("\n");for(r in a){g=a[r].replace(/^[\t\s]*\/\//gi,"").replace(/^[\t\s]*/gi,"").replace(/\s\s+/gi," ");d=!1;for(k in c)-1!=g.search(RegExp("^@"+c[k]+"[\\t\\s]"))&&(b[c[k]]=b[c[k]]||f.getStringBetweenTags(g,"@"+c[k]).trim());
for(k in h)if(e=f.getStringBetweenTags(g,"@"+h[k]).trim(),""!=e){b.icon64=b.icon64||e;d=!0;break}if(!d){for(k in m)if(e=f.getStringBetweenTags(g,"@"+m[k]).trim(),""!=e){b.icon=b.icon||e;d=!0;break}if(!d){for(k in l)if(e=f.getStringBetweenTags(g,"@"+l[k]).trim(),""!=e){b.homepage=b.homepage||e;d=!0;break}if(!d){var n=function(a){return a.trim().replace(/ /gi,"%20").replace(/[\b\r\n]/gi,"")};f.each({include:"includes",match:"matches",exclude:"excludes"},function(a,c){var e=RegExp("^@"+c+"[\\t\\s]",
"i"),f=a||c;-1!=g.search(e)&&(d=n(g.replace(e,"")).trim(),""!==d&&b[f].push(d))});-1!=g.search(/^@require[\t\s]/)&&(d=n(g.replace(/^@require[\t\s]*/gi,"")).trim(),""!==d&&b.requires.push({url:d,loaded:!1,textContent:""}));if(-1!=g.search(/^@resource[\t\s]/)&&(d=g.replace(/^@resource[\t\s]*/gi,"").trim(),e=d.split(" "),2<=e.length)){var s=e.shift();e=n(e.join(" "));""!==s&&""!==e&&b.resources.push({name:s,url:e,loaded:!1})}-1!=g.search(/^@grant[\t\s]/)&&(d=g.replace(/^@grant/gi,"").replace(/[\b\r\n]/gi,
"").trim(),""!==d&&b.grant.push(d));f.each({"run-at":"run_at","user-agent":"user_agent"},function(a,c){var e=RegExp("^@"+c+"[\\t\\s]","i"),f=a||c;-1!=g.search(e)&&(d=g.replace(e,"").replace(/[\r\n]/gi,"").trim(),""!==d&&(b.options[f]=b.options[f]||d))});f.each({noframes:!1,nocompat:"awareOfChrome"},function(a,c){var d=a||c;-1!=g.search(RegExp("^@"+c+"[\\t\\s\\r\\n]?"))&&(b.options[d]=!0)});f.each({updateURL:!1,downloadURL:!1,supportURL:!1},function(a,c){var e=RegExp("^@"+c+"[\\t\\s]","i"),f=a||c;
-1!=g.search(e)&&(d=g.replace(e,"").replace(/[ \b\r\n]/gi,"").trim(),""!==d&&(b[f]=b[f]||d))})}}}}b.name&&(b.id=p(b.name));b.version||(b.version="0.0");return b},getHeaderTags:function(){return{start:"==UserScript==",stop:"==/UserScript=="}},getHeader:function(a){var b=f.getStringBetweenTags(a,"==UserScript==","==/UserScript==");if(!b||""==b)return null;var c=a.search("==UserScript=="),h=a.search("<html>");a=a.search("<body>");return 0<h&&h<c||0<a&&a<c?null:b},createScriptFromSrc:function(a){a=a.replace(/(\r\n|\n|\r)/gm,
"\n");var b=l.getHeader(a);if(!b)return{};var c=l.processHeader(b);c.textContent=a;c.header=b;c.options.awareOfChrome||(c.options.compat_wrappedjsobject=a!=h.unWrappedJsObjectify(a),c.options.compat_metadata=a!=h.unMetaDataify(a),c.options.compat_foreach=a!=h.unEachify(a),c.options.compat_arrayleft=a!=h.unArrayOnLeftSideify(a),c.options.compat_prototypes=h.findPrototypes(a));-1!=a.search("unsafeWindow.gmonkey")&&(c.options.compat_uW_gmonkey=!0);return c}};Registry.register("parser","52",
l)});
