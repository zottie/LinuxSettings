window.requestFileSystem||(window.requestFileSystem=window.webkitRequestFileSystem);window.BlobBuilder||(window.BlobBuilder=window.WebKitBlobBuilder);
Registry.require("layout pingpong crcrc curtain layout/default/tabview layout/default/htmlutil helper convert i18n layout/default/layout_helper".split(" "),function(){var u=Registry.get("crcrc").cr,e=Registry.get("crcrc").crc,z=Registry.get("curtain"),x=Registry.get("helper"),L=Registry.get("layout/default/tabview"),y=Registry.get("layout/default/htmlutil"),p=Registry.get("i18n"),H=Registry.get("layout"),M=Registry.get("layout/default/layout_helper");H.render(function(){M.addStyle();M.addFont();var E=
null,B=null,C=!0,w="rank",A={},I=0,D="http://...",N=new Date,F=x.getUrlArgs(),H=function(b){var a=0,e=0,f=(new Date).getTime();b["uso:timestamp"]&&(a=b["uso:timestamp"],a=f-6048E5<a?1:f-2592E6<a?0.96:f-15552E6<a?0.9:f-62208E6<a?0.7:0);var f=b["uso:installs"],h=b["uso:fans"];5<h&&333<f&&(e=f/h,e=333>e?1:1E3>e?0.9:3E3>e?0.85:1E4>e?0.8:1E4/e*0.5);b=Number(b["uso:rating"]);return 0.25*a+0.35*(5E5<f?1:1E5<f?0.95:5E4<f?0.9:1E4<f?0.88:1E3<f?0.8:f/1E3*0.5)+0.15*e+0.25*(4<b?1:b/5)},R=function(b,a){b=parseFloat(b);
if(isNaN(b))return b;a||(a=0);var e=Math.pow(10,a);return Math.floor(b*e+(5<=b*e*10%10?1:0))/e},P=function(b){void 0==b&&(b="");var a={id:"new",name:b};b=[];var k=function(a,b,c,d,f){var m=e("div","settingsth",a.name,a.id,b),n=e("a","settingsth_a",a.name,a.id,b+"_a");n.setAttribute("name","settingsth_a"+a.name);var h=e("a","settingsth_a_up",a.name,a.id,b+"_a_up");h.setAttribute("name","settingsth_a_up"+a.name);var g=e("a","settingsth_a_down",a.name,a.id,b+"_a_down");g.setAttribute("name","settingsth_a_down"+
a.name);h.style.display="none";g.style.display="none";var l=function(){for(var b=document.getElementsByName("settingsth_a_up"+a.name),c=document.getElementsByName("settingsth_a_down"+a.name),d=0;d<b.length;d++)b[d].style.display="none";for(d=0;d<c.length;d++)c[d].style.display="none";C?h.style.display="":g.style.display=""},k=function(){l();z.hide()};b=function(){z.wait(p.getMessage("Please_wait___"));window.setTimeout(function(){w=d;G(E,w,C,k)},1)};var s=function(){z.wait(p.getMessage("Please_wait___"));
window.setTimeout(function(){C=!1;w=d;G(E,w,C,k)},1)},J=function(){z.wait(p.getMessage("Please_wait___"));window.setTimeout(function(){C=!0;w=d;G(E,w,C,k)},1)};m.inserted||(m.appendChild(n),m.appendChild(g),m.appendChild(h),n.addEventListener("click",b),h.addEventListener("click",s),g.addEventListener("click",J),n.textContent=c+" ",n.href="#",h.innerHTML="&#x25BE;",h.href="#",g.innerHTML="&#x25B4;",g.href="#");(f&&!w||d==w)&&window.setTimeout(l,1);return m},f=e("div","scripttable",a.name,a.id,"main"),
h=e("div","settingsth_fill",a.name,a.id,"thead_en"),d=e("div","settingsth_fill",a.name,a.id,"thead_fill1"),g=k(a,"thead_name",p.getMessage("Name"),"name"),l=e("div","settingsth_fill",a.name,a.id,"thead_fill"),s=k(a,"thead_score",p.getMessage("Rank"),"rank",!0),n=e("div","settingsth",a.name,a.id,"thead_sites");n.width="25%";n.textContent=p.getMessage("Sites");var m=k(a,"thead_installs",p.getMessage("Installs"),"installs"),J=k(a,"thead_rating",p.getMessage("Rating"),"rating"),c=k(a,"thead_fans",p.getMessage("Fans"),
"fans"),k=k(a,"thead_timestamp",p.getMessage("Last_Changed"),"timestamp");e("div","settingsth",a.name,a.id,"thead_homepage").textContent=p.getMessage("Homepage");if(!f.inserted){b=b.concat([h,d,l,g,s,n,m,J,c,k]);a=e("div","settingstr filler",a.name,a.id,"filler");for(h=0;h<b.length;h++)a.appendChild(b[h]);f.appendChild(a)}return f},S=function(b,a,k){var f=null,h=null,d=[],g=function(a){var b=null;a.scriptTab?B=b=P():(b=e("table","settingstable",a.name,a.id,"main"),a=e("tr","settingstr filler",a.name,
a.id,"filler"),b.appendChild(a));return b},l=null,s=null,n=function(b){for(var k in b){var c=b[k];void 0===c.id&&(c.id="item"+k);var q=e("tr","settingstr",c.name,c.id,"outer");if(c.divider)q=null;else{var p=u("td",c.name,c.id,"0");q.appendChild(p);var v=u("td",c.name,c.id,"1"),t=c.icon||c.icon64||c.image;t&&(v.setAttribute("class","imagetd"),c.id&&c.userscript?(t=y.createImage(t,c.name,c.id),t.oldvalue=c.enabled,v.appendChild(t)):v.appendChild(y.createImage(t,c.name,c.id)));t=e("td","settingstd",
c.name,c.id,"2");q.appendChild(t);if(c.main_menu_item){var r=u("span",c.name,c.id,"heading");r.inserted||(r.textContent=c.name,q=g(c),f=e("tbody","settingstbody",c.name,c.id,"tbody"),q.appendChild(f),h=u("div",c.name,c.id,"tab_content"),h.appendChild(q),a.appendTab(x.createUniqueId(c.name,c.id),r,h));q=null;n(c.items)}else if(c.sub_menu_item){var v=e("div","section"+(c.width?" section_width"+c.width:""),c.name,c.id),r=e("b","section_head",c.name,c.id,"head"),O=e("div","section_content",c.name,c.id,
"content");r.textContent=c.name;v.appendChild(r);v.appendChild(O);null==s&&(s=e("div","section_table","",""),t.appendChild(s),t.setAttribute("class","section_td"));s.appendChild(v);l=O;v=null;n(c.items)}else c.userscript?(d.push({item:c,tabv:a}),q=null):c.fireInfo?(r=e("span",c.name,c.id),r.innerHTML=c.value,N=new Date(c.versionDB),l?(l.appendChild(r),q=null):t.appendChild(r)):c.fireUpdate?(r=y.createButton(c.name,c.id,c.name,function(){Q(!1)}),c=y.createButton(c.fname,c.id,c.fname,function(){Q(!0)}),
l?(l.appendChild(r),l.appendChild(c),q=null):(t.appendChild(r),t.appendChild(c))):c.search?(D=c.value,u("div","search","box","").appendChild(y.createSearchBox(D)),q=null):c.version?(c=c.value,q=null,e("div","version","version","version").textContent="v"+c+" by Jan Biniok"):(r=u("span",c.name,c.id),r.textContent=c.name,t.setAttribute("colspan","2"),t.appendChild(r));q&&(v&&q.insertBefore(v,p),t&&q.appendChild(t,p),q.removeChild(p))}f&&q&&f.appendChild(q)}};n(b);E=d;window.setTimeout(function(){G(E,
null,null,k)},1)},T=function(b,a){if(b){var k=document.getElementById("fire"),f=e("div","","fire","main");if(k){var h=k.parentNode;h.removeChild(k);h.appendChild(f);document.body.setAttribute("class","main")}var k=e("div","head_container","fire","head_container"),h=e("div","tv_container","fire","tv_container"),d=u("a","head_link","fire","head_link");d.href="http://tampermonkey.net";d.target="_blank";var g=e("div","float margin4","fire","head1"),l=e("img","banner","fire");l.src=chrome.extension.getURL("images/icon128.png");
var s=e("div","float head margin4","fire","head2"),n=u("div","fire"),m=e("div","version","version","version");m.textContent=" by Jan Biniok";var p=u("div","search","box","");n.textContent="TamperFire";g.appendChild(l);s.appendChild(n);s.appendChild(m);d.appendChild(g);d.appendChild(s);k.appendChild(d);k.appendChild(p);f.appendChild(k);f.appendChild(h);var c=L.create("_main",h);window.setTimeout(function(){S(b,c,function(){a&&(console.log("fire: done! :)"),z.hide())})},10)}else console.log("fire: items is empty!")},
U={name:function(b,a){return b},rank:function(b,a){return b.rank-a.rank},installs:function(b,a){return b.installs-a.installs},fans:function(b,a){return b.fans-a.fans},timestamp:function(b,a){return a.timestamp-b.timestamp},rating:function(b,a){return b.rating-a.rating}},G=function(b,a,k,f){if(void 0===a||null===a)a="rank";if(void 0===k||null===k)k=!0;var h=A.fire_sort_cache_enabled?w+"_"+C.toString():"",d=[],g=0,l=A.fire_sort_cache_enabled?P(h):null,s=A.fire_sort_cache_enabled?l.inserted:!1,n,m,p,
c,q,u,v,t;A.fire_sort_cache_enabled&&B.setAttribute("style",x.staticVars.invisible_move);A.fire_sort_cache_enabled&&(B.parentNode.insertBefore(l,B),B=l,B.setAttribute("style",x.staticVars.visible_move));var r=null;s||(r=e("div","scripttbody","new",h,"tbody"),B&&B.appendChild(r));v=function(){if(A.fire_sort_cache_enabled){for(var a=0;a<g;a++)r.__appendChild(d[a].tr);window.setTimeout(t,100)}else{var b=e("div","","dummy","dummy");r.appendChild(b);var c=0,f=function(){for(var a=0,e=(new Date).getTime()+
15E3;(new Date).getTime()<e&&a<g;){for(a=c;a<g&&c+100>a;a++)r.__insertBefore(d[a].tr,b);c=a}a<g?(console.log("puhhhhh: sorting is hard work..."),window.setTimeout(f,1)):(r.removeChild(b),window.setTimeout(t,100))};f()}};t=function(){d=[];window.setTimeout(function(){f&&f()},100)};window.setTimeout(s||0==b.length?t:function(){for(var f=0;f<b.length;f++){u=b[f].tabv;m=b[f].item;m.id+=h;n=e("tr","scripttr",m.name,m.id,"outer");if(A.fire_sort_cache_enabled||!n.inserted){p=e("td","scripttd",m.name,m.id,
"1");c=e("td","scripttd",m.name,m.id,"2");if(q=m.icon||m.icon64||m.image)p.setAttribute("class","scripttd imagetd"),p.appendChild(y.createImage(q,m.name,m.id));n.appendChild(p);n.appendChild(c);V(u,m,n)}g++;d.push({tr:n,installs:m["uso:installs"],fans:m["uso:fans"],timestamp:m["uso:timestamp"],rating:m["uso:rating"],rank:m.rank})}d=d.sort(U[a]);k&&(d=d.reverse());window.setTimeout(v,100)},100)},W=function(b,a,k){var f=u("div",b.name,b.id,"script_editor_h");f.textContent="USO";var h=u("div",b.name,
b.id,"script_editor_c"),d=e("tr","editor_container p100100",b.name,b.id,"container"),g=e("tr","",b.name,b.id,"container_menu"),l=e("table","editor_container_o p100100",b.name,b.id,"container_o"),s=e("td","editor_outer",b.name,b.id,"script_info"),n=e("td","editor_100 editor_border",b.name,b.id,"script_info");l.appendChild(g);l.appendChild(d);h.appendChild(l);l=e("td","editormenu",b.name,b.id,"editormenu");s.appendChild(n);d.appendChild(s);g.appendChild(l);k=y.createButton(b.name,"close_script",p.getMessage("Close"),
k);d=y.createButton(b.name,"save",p.getMessage("Install"),function(){sendMessage({method:"installScript",url:"http://userscripts.org/scripts/source/"+b["uso:script"]+".user.js"},function(a){a.found||alert(p.getMessage("Unable_to_get_UserScript__Sry_"))})});l.appendChild(d);l.appendChild(k);a.appendTab("script_editor_tab"+x.createUniqueId(b.name,b.id),f,h);return{onShow:function(){var a=document.createElement("iframe");a.setAttribute("class","script_iframe");a.setAttribute("src","http://greasefire.userscripts.org/scripts/show/"+
b["uso:script"]);n.innerHTML="";n.appendChild(a)},onClose:function(){}}},X=function(b,a,k,f,h){k=e("div","",a.name,a.id,"script_tab_head");var d=x.decodeHtml(a.name),g=e("div","heading",a.name,"heading"),l=e("img","nameNicon64",a.name,"heading_icon"),s=a.icon64?a.icon64:a.icon;l.src=s;var n=e("div","nameNname64",a.name,"heading_name");n.textContent=d;s&&g.appendChild(l);g.appendChild(n);d=e("div","author",a.name,"author");a.author?d.textContent="by "+x.decodeHtml(a.author):a.copyright&&(d.innerHTML=
"&copy; ",d.textContent+=x.decodeHtml(a.copyright));var l=e("table","noborder p100100",a.name,"table"),s=e("tr","script_tab_head",a.name,"tr1"),n=e("tr","details",a.name,"tr2"),m=e("td","",a.name,"td1"),p=e("td","",a.name,"td2");g.appendChild(d);k.appendChild(g);m.appendChild(k);s.appendChild(m);n.appendChild(p);l.appendChild(s);l.appendChild(n);f.appendChild(l);f=L.create("_details"+x.createUniqueId(a.name,a.id),p,{tv:"tv tv_alt",tv_table:"tv_table tv_table_alt",tr_tabs:"tr_tabs tr_tabs_alt",tr_content:"tr_content tr_content_alt",
td_content:"td_content td_content_alt",td_tabs:"td_tabs td_tabs_alt",tv_tabs_align:"tv_tabs_align tv_tabs_align_alt",tv_tabs_fill:"tv_tabs_fill tv_tabs_fill_alt",tv_tabs_table:"tv_tabs_table tv_tabs_table_alt",tv_contents:"tv_contents tv_contents_alt",tv_tab_selected:"tv_tab tv_selected tv_tab_alt tv_selected_alt",tv_tab_close:"",tv_tab:"tv_tab tv_tab_alt",tv_content:"tv_content tv_content_alt"});var c=W(a,f,h),q=function(a){var c=!1;"keydown"==a.type&&(27==a.keyCode&&(b.isSelected()&&window.setTimeout(h,
100),c=!0),c&&a.stopPropagation())};return{onShow:function(){if(c.onShow)c.onShow();window.addEventListener("keydown",q,!1)},onClose:function(){if(c.onClose&&c.onClose())return!0;window.removeEventListener("keydown",q,!1)}}},V=function(b,a,k){var f,h,d=e("span","clickable",a.name,a.id,"sname"),g=e("span","",a.name,a.id,"sname_name"),l,p=a.homepage?a.homepage:a.namespace&&0==a.namespace.search("http://")?a.namespace:null;l=u("a",a.name,a.id,"sname_name_a");l.inserted||(l.setAttribute("target","_blank"),
g.appendChild(l));var n=x.decodeHtml(a.name);l.textContent=35<n.length?n.substr(0,35)+"...":n;d.appendChild(g);var g=[],m=function(a,b,c,d){d||(d="scripttd");a=e("td",d,a.name,a.id,c);b&&a.appendChild(b);return a},y=function(){h.onClose&&h.onClose()||f&&f.hide()},c=u("span",a.name,a.id,"srank"),q=u("span",a.name,a.id,"sinstalls"),z=u("span",a.name,a.id,"srating"),v=u("span",a.name,a.id,"sfans"),t=u("span",a.name,a.id,"stimestamp"),r=u("span",a.name,a.id,"shomepage"),w=u("a",a.name,a.id,"shomepage_a");
a.rank=H(a);c.textContent=R(100*a.rank,1);q.textContent=a["uso:installs"];z.textContent=a["uso:rating"];v.textContent=a["uso:fans"];var A=function(a,b){var c=a.getTime(),d=b.getTime(),d=Math.abs(c-d),c=Math.round(d/36E5),d=Math.round(d/864E5);return 48>=c?c+" h":d+" d"};0!=a["uso:timestamp"]&&(t.textContent=A(N,new Date(a["uso:timestamp"])));r.appendChild(w);w.inserted||(w.setAttribute("href",p),w.setAttribute("target","_blank"),r.appendChild(l));d=m(a,d,"script_td2","scripttd scripttd_name clickable");
d.addEventListener("click",function(c){if(!f){var d=e("div","",a.name,a.id,"details_h");d.textContent=25<n.length?n.substr(0,25)+"...":n;var g=u("div",a.name,a.id,"details_c");f=b.insertTab(null,"details_"+x.createUniqueId(a.name,a.id),d,g,null,y);h=X(f,a,k,g,y)}if(h.onShow)h.onShow();f.show();1!=c.button&&f.select()});d.title=a.description?n+"\n\n"+x.decodeHtml(a.description):n;g.push(d);g.push(m(a,c,"script_td3"));g.push(m(a,Y(a),"script_td4"));g.push(m(a,q,"script_td5"));g.push(m(a,z,"script_td6"));
g.push(m(a,v,"script_td7"));g.push(m(a,t,"script_td8"));g.push(m(a,r,"script_td9"));for(d=g.length;10>d;d++)g.push(e("td","scripttd",a.name,a.id,"script_filler_"+d));k.appendChild(e("td","scripttd",a.name,a.id,"script_prefiller_2"));for(d=0;d<g.length;d++)k.appendChild(g[d]);return g},Y=function(b){var a=u("span",b.name,b.id,"site_images",!0),k=function(a){0!=a.search("http")&&(a="http://"+a);a=a.split("/");if(3>a.length)return null;a=a[2].split(".");if(2>a.length)return null;for(var b=a[a.length-
1],d=a[a.length-2],c=[],f=a.length-3;0<=f&&-1==a[f].search("\\*");f--)c.push(a[f]);return{tld:b,dom:d,predom:c.reverse()}};if(b.includes)for(var f=0,h=0;h<b.includes.length;h++){var d=b.includes[h];if(-1!=d.search(/htt(ps|p):\/\/(\*\/\*|\*)*$/)||"*"==d){d=y.createImage(chrome.extension.getURL("images/web.png"),b.name,b.id,b.includes[h],b.includes[h]);a.appendChild(d);break}d=k(d);if(null!=d){for(var g=!1,l=0;l<h;l++){var p=k(b.includes[l]);if(null!=p&&p.dom==d.dom){g=!0;break}}if(!g){g="com";l="";
"*"!=d.tld&&"tld"!=d.tld&&(g=d.tld);d.predom.length&&(l=d.predom.join(".")+".");d=("http://"+l+d.dom+"."+g+"/favicon.ico").replace(/\*/g,"");if(0==d.search("http://userscripts.org/")||0==d.search("http://userscripts.com/"))d="http://userscripts.org/images/script_icon.png";d=y.createImage(d,b.name,b.id,b.includes[h],b.includes[h]);a.appendChild(d);f++}if(7<f){b=e("span",b.name,b.id,"tbc");b.textContent="...";a.appendChild(b);break}}}return a},K=function(b,a){try{sendMessage({method:"getFireItems",
tabid:b,url:a},function(f){try{var h=!0;A=f.options||A;if(f.progress){var d=f.progress.action+"... ";d&&""!=d||(d="");var g="";f.progress.state&&f.progress.state.of&&(g=" "+Math.round(100*f.progress.state.n/f.progress.state.of)+"%");var k=""!=d||""!=g?d+g:p.getMessage("Please_wait___");z.wait(k);window.setTimeout(function(){K(b,a)},2E3);h=!1}f.scripts&&T(f.scripts,h);f.image&&(e("img","banner","fire").src=f.image);f=null}catch(s){throw console.log(s),s;}}),z.wait(null)}catch(k){console.log("mSo: "+
k.message)}},Q=function(b,a){try{var e=function(){K(I,D)};sendMessage({method:"startFireUpdate",force:b},function(a){!1===a.suc?(z.hide(),alert(p.getMessage("TamperFire_is_up_to_date_"))):window.setTimeout(e,1E3)});z.wait(p.getMessage("Please_wait___"))}catch(f){console.log("mSo: "+f.message)}};chrome.extension.onMessage.addListener(function(b,a,e){if("confirm"==b.method)x.confirm(b.msg,function(a){e({confirm:a})});else if("showMsg"==b.method)alert(b.msg),e({});else return!1;return!0});I=F.tab?F.tab:
void 0;D=decodeURIComponent(function(b){return F.url?F.url:b}(encodeURI(D)));K(I,D)})});
