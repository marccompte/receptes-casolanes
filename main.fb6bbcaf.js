parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"MCF2":[function(require,module,exports) {
var define;
var global = arguments[3];
var i,t=arguments[3];!function(t){function n(i,t,n,e,s){this._listener=t,this._isOnce=n,this.context=e,this._signal=i,this._priority=s||0}function e(i,t){if("function"!=typeof i)throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",t))}function s(){this._bindings=[],this._prevParams=null;var i=this;this.dispatch=function(){s.prototype.dispatch.apply(i,arguments)}}n.prototype={active:!0,params:null,execute:function(i){var t,n;return this.active&&this._listener&&(n=this.params?this.params.concat(i):i,t=this._listener.apply(this.context,n),this._isOnce&&this.detach()),t},detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null},isBound:function(){return!!this._signal&&!!this._listener},isOnce:function(){return this._isOnce},getListener:function(){return this._listener},getSignal:function(){return this._signal},_destroy:function(){delete this._signal,delete this._listener,delete this.context},toString:function(){return"[SignalBinding isOnce:"+this._isOnce+", isBound:"+this.isBound()+", active:"+this.active+"]"}},s.prototype={VERSION:"1.0.0",memorize:!1,_shouldPropagate:!0,active:!0,_registerListener:function(i,t,e,s){var r,o=this._indexOfListener(i,e);if(-1!==o){if((r=this._bindings[o]).isOnce()!==t)throw new Error("You cannot add"+(t?"":"Once")+"() then add"+(t?"Once":"")+"() the same listener without removing the relationship first.")}else r=new n(this,i,t,e,s),this._addBinding(r);return this.memorize&&this._prevParams&&r.execute(this._prevParams),r},_addBinding:function(i){var t=this._bindings.length;do{--t}while(this._bindings[t]&&i._priority<=this._bindings[t]._priority);this._bindings.splice(t+1,0,i)},_indexOfListener:function(i,t){for(var n,e=this._bindings.length;e--;)if((n=this._bindings[e])._listener===i&&n.context===t)return e;return-1},has:function(i,t){return-1!==this._indexOfListener(i,t)},add:function(i,t,n){return e(i,"add"),this._registerListener(i,!1,t,n)},addOnce:function(i,t,n){return e(i,"addOnce"),this._registerListener(i,!0,t,n)},remove:function(i,t){e(i,"remove");var n=this._indexOfListener(i,t);return-1!==n&&(this._bindings[n]._destroy(),this._bindings.splice(n,1)),i},removeAll:function(){for(var i=this._bindings.length;i--;)this._bindings[i]._destroy();this._bindings.length=0},getNumListeners:function(){return this._bindings.length},halt:function(){this._shouldPropagate=!1},dispatch:function(i){if(this.active){var t,n=Array.prototype.slice.call(arguments),e=this._bindings.length;if(this.memorize&&(this._prevParams=n),e){t=this._bindings.slice(),this._shouldPropagate=!0;do{e--}while(t[e]&&this._shouldPropagate&&!1!==t[e].execute(n))}}},forget:function(){this._prevParams=null},dispose:function(){this.removeAll(),delete this._bindings,delete this._prevParams},toString:function(){return"[Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"}};var r=s;r.Signal=s,"function"==typeof i&&i.amd?i(function(){return r}):"undefined"!=typeof module&&module.exports?module.exports=r:t.signals=r}(this);
},{}],"uM0g":[function(require,module,exports) {
var define;
var e;!function(){var t=function(e){var t,r,n;function s(e,t){if(e.indexOf)return e.indexOf(t);for(var r=e.length;r--;)if(e[r]===t)return r;return-1}function i(e,t){var r=s(e,t);-1!==r&&e.splice(r,1)}function a(e,t){return"[object "+t+"]"===Object.prototype.toString.call(e)}function o(e){return a(e,"RegExp")}function u(e){return a(e,"Array")}function h(e){return"function"==typeof e}function c(e){return null===e||"null"===e?null:"true"===e||"false"!==e&&(e===n||"undefined"===e?n:""===e||isNaN(e)?e:parseFloat(e))}function p(e,t){for(var r,n,s,i,a=(e||"").replace("?","").split("&"),o=-1,h={};n=a[++o];)r=n.indexOf("="),i=n.substring(0,r),s=decodeURIComponent(n.substring(r+1)),!1!==t&&(s=c(s)),i in h?u(h[i])?h[i].push(s):h[i]=[h[i],s]:h[i]=s;return h}function l(){this.bypassed=new e.Signal,this.routed=new e.Signal,this._routes=[],this._prevRoutes=[],this._piped=[],this.resetState()}function d(t,r,n,s){var i=o(t),a=s.patternLexer;this._router=s,this._pattern=t,this._paramsIds=i?null:a.getParamIds(t),this._optionalParamsIds=i?null:a.getOptionalParamsIds(t),this._matchRegexp=i?t:a.compilePattern(t,s.ignoreCase),this.matched=new e.Signal,this.switched=new e.Signal,r&&this.matched.add(r),this._priority=n||0}return r=""===/t(.+)?/.exec("t")[1],l.prototype={greedy:!1,greedyEnabled:!0,ignoreCase:!0,ignoreState:!1,shouldTypecast:!1,normalizeFn:null,resetState:function(){this._prevRoutes.length=0,this._prevMatchedRequest=null,this._prevBypassedRequest=null},create:function(){return new l},addRoute:function(e,t,r){var n=new d(e,t,r,this);return this._sortedInsert(n),n},removeRoute:function(e){i(this._routes,e),e._destroy()},removeAllRoutes:function(){for(var e=this.getNumRoutes();e--;)this._routes[e]._destroy();this._routes.length=0},parse:function(e,t){if(e=e||"",t=t||[],this.ignoreState||e!==this._prevMatchedRequest&&e!==this._prevBypassedRequest){var r,n=this._getMatchedRoutes(e),s=0,i=n.length;if(i)for(this._prevMatchedRequest=e,this._notifyPrevRoutes(n,e),this._prevRoutes=n;s<i;)(r=n[s]).route.matched.dispatch.apply(r.route.matched,t.concat(r.params)),r.isFirst=!s,this.routed.dispatch.apply(this.routed,t.concat([e,r])),s+=1;else this._prevBypassedRequest=e,this.bypassed.dispatch.apply(this.bypassed,t.concat([e]));this._pipeParse(e,t)}},_notifyPrevRoutes:function(e,t){for(var r,n=0;r=this._prevRoutes[n++];)r.route.switched&&this._didSwitch(r.route,e)&&r.route.switched.dispatch(t)},_didSwitch:function(e,t){for(var r,n=0;r=t[n++];)if(r.route===e)return!1;return!0},_pipeParse:function(e,t){for(var r,n=0;r=this._piped[n++];)r.parse(e,t)},getNumRoutes:function(){return this._routes.length},_sortedInsert:function(e){var t=this._routes,r=t.length;do{--r}while(t[r]&&e._priority<=t[r]._priority);t.splice(r+1,0,e)},_getMatchedRoutes:function(e){for(var t,r=[],n=this._routes,s=n.length;(t=n[--s])&&((!r.length||this.greedy||t.greedy)&&t.match(e)&&r.push({route:t,params:t._getParamsArray(e)}),this.greedyEnabled||!r.length););return r},pipe:function(e){this._piped.push(e)},unpipe:function(e){i(this._piped,e)},toString:function(){return"[crossroads numRoutes:"+this.getNumRoutes()+"]"}},(t=new l).VERSION="0.12.2",t.NORM_AS_ARRAY=function(e,t){return[t.vals_]},t.NORM_AS_OBJECT=function(e,t){return[t]},d.prototype={greedy:!1,rules:void 0,match:function(e){return e=e||"",this._matchRegexp.test(e)&&this._validateParams(e)},_validateParams:function(e){var t,r=this.rules,n=this._getParamsObject(e);for(t in r)if("normalize_"!==t&&r.hasOwnProperty(t)&&!this._isValidParam(e,t,n))return!1;return!0},_isValidParam:function(e,t,r){var n=this.rules[t],i=r[t],a=!1,c=0===t.indexOf("?");return null==i&&this._optionalParamsIds&&-1!==s(this._optionalParamsIds,t)?a=!0:o(n)?(c&&(i=r[t+"_"]),a=n.test(i)):u(n)?(c&&(i=r[t+"_"]),a=this._isValidArrayRule(n,i)):h(n)&&(a=n(i,e,r)),a},_isValidArrayRule:function(e,t){if(!this._router.ignoreCase)return-1!==s(e,t);"string"==typeof t&&(t=t.toLowerCase());for(var r,n=e.length;n--;)if(("string"==typeof(r=e[n])?r.toLowerCase():r)===t)return!0;return!1},_getParamsObject:function(e){for(var t,n,i=this._router.shouldTypecast,a=this._router.patternLexer.getParamValues(e,this._matchRegexp,i),o={},u=a.length;u--;)n=a[u],this._paramsIds&&(0===(t=this._paramsIds[u]).indexOf("?")&&n&&(o[t+"_"]=n,n=p(n,i),a[u]=n),r&&""===n&&-1!==s(this._optionalParamsIds,t)&&(n=void 0,a[u]=n),o[t]=n),o[u]=n;return o.request_=i?c(e):e,o.vals_=a,o},_getParamsArray:function(e){var t=this.rules?this.rules.normalize_:null;return(t=t||this._router.normalizeFn)&&h(t)?t(e,this._getParamsObject(e)):this._getParamsObject(e).vals_},interpolate:function(e){var t=this._router.patternLexer.interpolate(this._pattern,e);if(!this._validateParams(t))throw new Error("Generated string doesn't validate against `Route.rules`.");return t},dispose:function(){this._router.removeRoute(this)},_destroy:function(){this.matched.dispose(),this.switched.dispose(),this.matched=this.switched=this._pattern=this._matchRegexp=null},toString:function(){return'[Route pattern:"'+this._pattern+'", numListeners:'+this.matched.getNumListeners()+"]"}},l.prototype.patternLexer=function(){var e=/[\\.+*?\^$\[\](){}\/'#]/g,t=/^\/|\/$/g,r=/\/$/g,n=/(?:\{|:)([^}:]+)(?:\}|:)/g,s={OS:{rgx:/([:}]|\w(?=\/))\/?(:|(?:\{\?))/g,save:"$1{{id}}$2",res:"\\/?"},RS:{rgx:/([:}])\/?(\{)/g,save:"$1{{id}}$2",res:"\\/"},RQ:{rgx:/\{\?([^}]+)\}/g,res:"\\?([^#]+)"},OQ:{rgx:/:\?([^:]+):/g,res:"(?:\\?([^#]*))?"},OR:{rgx:/:([^:]+)\*:/g,res:"(.*)?"},RR:{rgx:/\{([^}]+)\*\}/g,res:"(.+)"},RP:{rgx:/\{([^}]+)\}/g,res:"([^\\/?]+)"},OP:{rgx:/:([^:]+):/g,res:"([^\\/?]+)?/?"}},i=1,a=2,o=3,h=i;function p(e,t){var r,n=[];for(e.lastIndex=0;r=e.exec(t);)n.push(r[1]);return n}function l(e,t,r){var n,i;for(i in s)s.hasOwnProperty(i)&&(n=s[i],e=e.replace(n[t],n[r]));return e}return function(){var e,t;for(e in s)s.hasOwnProperty(e)&&((t=s[e]).id="__CR_"+e+"__",t.save="save"in t?t.save.replace("{{id}}",t.id):t.id,t.rRestore=new RegExp(t.id,"g"))}(),{strict:function(){h=a},loose:function(){h=i},legacy:function(){h=o},getParamIds:function(e){return p(n,e)},getOptionalParamsIds:function(e){return p(s.OP.rgx,e)},getParamValues:function(e,t,r){var n=t.exec(e);return n&&(n.shift(),r&&(n=function(e){for(var t=e.length,r=[];t--;)r[t]=c(e[t]);return r}(n))),n},compilePattern:function(n,s){return(n=n||"")&&(h===i?n=n.replace(t,""):h===o&&(n=n.replace(r,"")),n=l(n,"rgx","save"),n=l(n=n.replace(e,"\\$&"),"rRestore","res"),h===i&&(n="\\/?"+n)),h!==a&&(n+="\\/?"),new RegExp("^"+n+"$",s?"i":"")},interpolate:function(e,t){if(t=t||{},"string"!=typeof e)throw new Error("Route pattern should be a string.");return s.OS.trail||(s.OS.trail=new RegExp("(?:"+s.OS.id+")+$")),e.replace(s.OS.rgx,s.OS.save).replace(n,function(e,r){var n;if(r="?"===r.substr(0,1)?r.substr(1):r,null!=t[r]){if("object"==typeof t[r]){var s,i=[];for(var a in t[r])if(u(s=t[r][a]))for(var o in s)"[]"==a.slice(-2)?i.push(encodeURI(a.slice(0,-2))+"[]="+encodeURI(s[o])):i.push(encodeURI(a+"="+s[o]));else i.push(encodeURI(a+"="+s));n="?"+i.join("&")}else n=String(t[r]);if(-1===e.indexOf("*")&&-1!==n.indexOf("/"))throw new Error('Invalid value "'+n+'" for segment "'+e+'".')}else{if(-1!==e.indexOf("{"))throw new Error("The segment "+e+" is required.");n=""}return n}).replace(s.OS.trail,"").replace(s.OS.rRestore,"/")}}}(),t};"function"==typeof e&&e.amd?e(["signals"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("signals")):window.crossroads=t(window.signals)}();
},{"signals":"MCF2"}],"d6sW":[function(require,module,exports) {
var e=require("crossroads"),t=null,i={};$(document).ready(function(){if(n.init(),"undefined"==typeof Worker)alert("Navegador no suportat.");else{t=new Worker("/db.50ec2a83.js");e.addRoute("/recepta/{id}",function(e){n.show(e)}),e.addRoute("/",function(){n.home()});e.routed.add(console.log,console),e.parse(document.location.pathname),t.onmessage=function(e){var t=e.data.data;switch(e.data.type){case"add_menu":var i=$("<li>",{html:'<a class="dropdown-trigger" href="#!" data-target="dropdown'+t.idx+'">'+t.title+"</a>"}).addClass("loading").appendTo($("#nav"));setTimeout(function(){i.removeClass("loading")},100);$("<ul>",{id:"dropdown"+t.idx}).addClass("dropdown-content dropdown-nested").appendTo($("body"));n.menu[t.title]={recipes:[]};break;case"add_recipe":n.menu[t.menu.title].recipes.push(t.recipe),n.receptes[t.recipe.id]=t.recipe;var r=$("<a>",{href:"/recepta/"+t.recipe.id+"?r="+Math.random()}).addClass("dropdown-trigger sub").data("target","dropdown"+t.menu.idx).data("hover","hover").data("alignment","left").html(t.recipe.Titol[0]);i=$("<li>").append(r).appendTo($("#dropdown"+t.menu.idx));break;case"finish":n.finish(),$(".dropdown-trigger").dropdown({constrain_width:!1,closeOnClick:!1,coverTrigger:!1,hover:!0});break;case"finished_recipe":n.receptes[t.id]=t,n.show(t.id)}}}});var n={menu:{},receptes:[],content:null,page:"home",init:function(){this.content=$("#content")},home:function(){t.postMessage({type:"init"}),this.page="home";var e=$("#home.template").html();this.content.html(e)},show:function(e){this.page=parseInt(e),$("body").removeClass("home");var i=$(".template#recipe");if(e in n.receptes){i.find(".recipe-title").html(n.receptes[e].Titol[0]);var r="";Object.keys(n.receptes[e].Ingredients).forEach(function(t){"titol"===t?r+="<h6>"+n.receptes[e].Ingredients[t]+"</h6>":"persones"===t||"persona"===t?""!==n.receptes[e].Ingredients[t]&&(r+="<i>(per "+n.receptes[e].Ingredients[t]+" persones)</i>"):r+="<li>"+n.receptes[e].Ingredients[t]+"</li>"}),i.find(".recipe-ingredients ul").html(r);var o=n.receptes[e].Elaboracio.map(function(e){return":"===e[e.length-1]?"<h6>"+e+"</h6>":"<li>"+e+"</li>"});i.find(".recipe-description ol").html(o.join(""));var a=i.html();this.content.html(a),t.postMessage({type:"init"})}else t.postMessage({type:"get_recipe",data:{id:e}})},finish:function(){if($("body").hasClass("home"))this.receptes.forEach(function(e){n.other(e)});else{var e=this.receptes[this.page].Categories.categoria;this.menu[e].recipes.forEach(function(e){e.id!==this.page&&n.other(e)}.bind(this))}},other:function(e){var t=$(".template#recipe-thumb");t.find(".card-title").html(e.Titol[0]),t.find("a").attr("href","/recepta/"+e.id+"?r="+Math.random());e.Ingredients.persones;delete e.Ingredients.persones;var i=Object.keys(e.Ingredients).join(", ");i=i[0].toUpperCase()+i.substring(1)+".",t.find(".ingredients").html(i);var n=t.html();$("#recipe-list").append(n)}};String.prototype.width=function(e){var t=e||"21px arial",i=$("<div></div>").text(this).css({position:"absolute",float:"left","white-space":"nowrap",visibility:"hidden",font:t}).appendTo($("body")),n=i.width();return i.remove(),n};
},{"crossroads":"uM0g","./db.js":[["db.50ec2a83.js","f9V3"],"db.50ec2a83.js.map","f9V3"]}]},{},["d6sW"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map