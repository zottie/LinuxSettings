(function(){function l(b){function g(a,c,d){if(a.text){var p=s?0:a.text.length-1,e=s?a.text.length:-1;for(null!=d&&(p=d+f);p!=e;p+=f)if(d=a.text.charAt(p),n.test(d)&&b.getTokenAt(k(c,p+1)).type==l){var g=q[d];if(">"==g.charAt(1)==s)u.push(d);else{if(u.pop()!=g.charAt(0))return{pos:p,match:!1};if(!u.length)return{pos:p,match:!0}}}}}var a=b.getCursor(),e=b.getLineHandle(a.line),d=a.ch-1,c=0<=d&&q[e.text.charAt(d)]||q[e.text.charAt(++d)];if(!c)return null;for(var s=">"==c.charAt(1),f=s?1:-1,l=b.getTokenAt(k(a.line,
d+1)).type,u=[e.text.charAt(d)],n=/[(){}[\]]/,c=a.line,h,m=s?Math.min(c+100,b.lineCount()):Math.max(-1,c-100);c!=m&&!(h=c==a.line?g(e,c,d):g(b.getLineHandle(c),c));c+=f);return{from:k(a.line,d),to:h&&k(c,h.pos),match:h&&h.match}}function n(b,g){var a=l(b);if(a&&!(b.getLine(a.from.line).length>m||a.to&&b.getLine(a.to.line).length>m)){var e=a.match?"CodeMirror-matchingbracket":"CodeMirror-nonmatchingbracket",d=b.markText(a.from,k(a.from.line,a.from.ch+1),{className:e}),c=a.to&&b.markText(a.to,k(a.to.line,
a.to.ch+1),{className:e});t&&b.state.focused&&b.display.input.focus();a=function(){b.operation(function(){d.clear();c&&c.clear()})};if(g)setTimeout(a,800);else return a}}function r(b){b.operation(function(){f&&(f(),f=null);b.somethingSelected()||(f=n(b,!1))})}var t=/MSIE \d/.test(navigator.userAgent)&&(null==document.documentMode||8>document.documentMode),k=CodeMirror.Pos,m=1E3,q={"(":")>",")":"(<","[":"]>","]":"[<","{":"}>","}":"{<"},f=null;CodeMirror.defineOption("matchBrackets",!1,function(b,g){if(g)b.on("cursorActivity",
r);else b.off("cursorActivity",r)});CodeMirror.defineExtension("matchBrackets",function(){n(this,!0)});CodeMirror.defineExtension("findMatchingBracket",function(){return l(this)})})();
(function(){function l(b){function g(a,c,d){if(a.text){var e=f?0:a.text.length-1,g=f?a.text.length:-1;for(null!=d&&(e=d+l);e!=g;e+=l)if(d=a.text.charAt(e),r.test(d)&&b.getTokenAt(k(c,e+1)).type==n){var h=q[d];if(">"==h.charAt(1)==f)m.push(d);else{if(m.pop()!=h.charAt(0))return{pos:e,match:!1};if(!m.length)return{pos:e,match:!0}}}}}var a=b.getCursor(),e=b.getLineHandle(a.line),d=a.ch-1,c=0<=d&&q[e.text.charAt(d)]||q[e.text.charAt(++d)];if(!c)return null;for(var f=">"==c.charAt(1),l=f?1:-1,n=b.getTokenAt(k(a.line,
d+1)).type,m=[e.text.charAt(d)],r=/[(){}[\]]/,c=a.line,h,t=f?Math.min(c+100,b.lineCount()):Math.max(-1,c-100);c!=t&&!(h=c==a.line?g(e,c,d):g(b.getLineHandle(c),c));c+=l);return{from:k(a.line,d),to:h&&k(c,h.pos),match:h&&h.match}}function n(b,f){var a=l(b);if(a&&!(b.getLine(a.from.line).length>m||a.to&&b.getLine(a.to.line).length>m)){var e=a.match?"CodeMirror-matchingbracket":"CodeMirror-nonmatchingbracket",d=b.markText(a.from,k(a.from.line,a.from.ch+1),{className:e}),c=a.to&&b.markText(a.to,k(a.to.line,
a.to.ch+1),{className:e});t&&b.state.focused&&b.display.input.focus();a=function(){b.operation(function(){d.clear();c&&c.clear()})};if(f)setTimeout(a,800);else return a}}function r(b){b.operation(function(){f&&(f(),f=null);b.somethingSelected()||(f=n(b,!1))})}var t=/MSIE \d/.test(navigator.userAgent)&&(null==document.documentMode||8>document.documentMode),k=CodeMirror.Pos,m=1E3,q={"(":")>",")":"(<","[":"]>","]":"[<","{":"}>","}":"{<"},f=null;CodeMirror.defineOption("matchBrackets",!1,function(b,f){if(f)b.on("cursorActivity",
r);else b.off("cursorActivity",r)});CodeMirror.defineExtension("matchBrackets",function(){n(this,!0)});CodeMirror.defineExtension("findMatchingBracket",function(){return l(this)})})();