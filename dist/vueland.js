!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("vue")):"function"==typeof define&&define.amd?define("vueland",["vue"],t):"object"==typeof exports?exports.vueland=t(require("vue")):e.vueland=t(e.Vue)}("undefined"!=typeof self?self:this,(function(e){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/dist/",o(o.s=7)}([function(t,o){t.exports=e},function(e,t,o){},function(e,t,o){},function(e,t,o){},function(e,t,o){},function(e,t,o){},function(e,t,o){},function(e,t,o){"use strict";o.r(t),o.d(t,"VueLand",(function(){return S}));var n={};o.r(n),o.d(n,"VButton",(function(){return d})),o.d(n,"VCard",(function(){return p})),o.d(n,"VCardTitle",(function(){return b})),o.d(n,"VCardSubtitle",(function(){return y})),o.d(n,"VCardContent",(function(){return m})),o.d(n,"VCardActions",(function(){return h})),o.d(n,"VOverlay",(function(){return j})),o.d(n,"VModal",(function(){return B})),o.d(n,"VField",(function(){return C}));o(1),o(2);var r=o(0);function l(e){return!!e&&!!e.match(/^(#|var\(--|(rgb|hsl)a?\()/)}function i(){return{color:String}}const u=e=>({setBackground:(t,o)=>(l(t)?o.style.push({"background-color":e.color,"border-color":e.color}):o.class[t]=!0,o),setTextColor:(e,t={})=>{if(l(e))t.style={...t.style,color:""+e,"caret-color":""+e};else if(e){const[o,n]=e.trim().split(" ",2);t.class={...t.class,[o+"--text"]:!0},n&&(t.class["text--"+n]=!0)}return t}});function a(){return{elevation:[String,Number]}}function c(e){const t=Object(r.computed)(()=>e.elevation);return{elevationClasses:Object(r.computed)(()=>({["elevation-"+e.elevation]:!!t.value}))}}const s={disabled:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},absolute:{type:Boolean,default:!1},left:{type:Boolean,default:!1},right:{type:Boolean,default:!1},text:{type:Boolean,default:!1},label:{type:String,default:""},...i(),...a(),absolute:Boolean,left:Boolean,right:Boolean,top:Boolean,bottom:Boolean,offsetX:[String,Number],offsetY:[String,Number]},d=Object(r.defineComponent)({name:"v-button",props:s,setup(e,{slots:t}){const{setTextColor:o,setBackground:n}=u(e),{elevationClasses:l}=c(e),{positionClasses:i}=(e=>({positionClasses:Object(r.computed)(()=>({"position--absolute":e.absolute,"to--left":e.left,"to--right":e.right,"to--top":e.top,"to--bottom":e.bottom}))}))(e),a=Object(r.computed)(()=>e.text||e.outlined),s=Object(r.computed)(()=>({"v-button":!0,"v-button--disabled":e.disabled,"v-button--text":e.text||e.outlined,"v-button--outlined":e.outlined,...l.value,...i.value})),d=()=>({class:{...s.value}}),f=a.value?o:n,v=e.color?f(e.color,d()):d(),p=[],b=e.label&&Object(r.h)("span",{class:{"v-button__label":!0}},e.label),y=t.default&&t.default();return b&&p.push(b),y&&p.push(y),()=>Object(r.h)("button",v,p)}});function f(e,t="div"){return Object(r.defineComponent)({name:name||e.replace(/__/g,"-"),setup:(o,{slots:n})=>()=>Object(r.h)(t,{class:{[e.trim()]:!0}},n.default&&n.default())})}o(3);const v={width:[String,Number],...i(),...a()},p=Object(r.defineComponent)({props:v,setup(e,{slots:t}){const{setBackground:o}=u(e),{elevationClasses:n}=c(e),l={class:Object(r.computed)(()=>({"v-card":!0,...n.value})).value,style:{maxWidth:e.width+"px"}};return()=>Object(r.h)("div",e.color&&o(e.color,l)||l,t.default&&t.default())}}),b=f("v-card__title"),y=f("v-card__subtitle"),m=f("v-card__content"),h=f("v-card__actions");o(4);const O={hide:Boolean,active:Boolean,...i()},j=Object(r.defineComponent)({name:"v-overlay",props:O,setup(e){const{setBackground:t}=u(e),o={class:Object(r.computed)(()=>({"v-overlay":!0,"v-overlay--hidden":e.hide,"v-overlay--active":e.active})).value,style:[],ref:"overlay"};return Object(r.h)("div",t(e.color,o))}});o(5);const g={width:{type:[String,Number],default:400},show:Boolean,overlay:Boolean,overlayOpacity:[Number,String],overlayColor:{type:String,default:()=>"white"},transition:String},B=Object(r.defineComponent)({name:"v-modal",props:g,setup(e,{slots:t,emit:o}){if(e.overlay){const t=function(e,t){const o=document,n=o.createElement("div");let l;setTimeout(()=>{l=!!t&&o.querySelector("."+t)});const i={active:!1,hide:!0,color:e.overlayColor},u=()=>j.setup(i),a=e=>Object(r.render)(e,n);a(u());const c=n.firstChild;return{createOverlay:function(){l.parentNode.insertBefore(c,l),setTimeout(()=>{i.active=!0,i.hide=!e.overlay,a(u())},40)},removeOverlay:function(){i.active=!1,a(u()),function(e,t,o,n=!1){const r=l=>{o(l),e.removeEventListener(t,r,n)};e.addEventListener(t,r,n)}(c,"transitionend",(function(){l.parentNode.removeChild(c)}))}}}(e,"v-modal");Object(r.watch)(()=>e.show,e=>{e&&t.createOverlay(),!e&&t.removeOverlay()})}const n=Object(r.h)("div",{class:{"v-modal__content":!0}},t.default&&t.default());let l=Object(r.h)("div",{class:{"v-modal":!0},"onUpdate:show":e=>o("update:show",e)},[n]);if(e.transition){const t=function(e,t){return()=>Object(r.createBlock)(r.Transition,{name:e.transition},{default:Object(r.withCtx)(()=>[Object(r.h)(t)])})}(e,l);l=t()}return()=>Object(r.withDirectives)(Object(r.h)(l),[[r.vShow,e.show]])}});o(6);const C=Object(r.defineComponent)({name:"v-field",props:{value:{type:[Object,Array,Number,String]},type:{type:String,default:"text"},placeholder:{type:String,default:""},required:{type:Boolean,default:!1},valid:{type:Boolean}},setup(e){const t=Object(r.reactive)({isDirty:!1}),o=Object(r.computed)(()=>({"v-field":!0,"v-field--required":e.required,"v-field--dirty":t.isDirty,"v-field--valid":t.isDirty&&e.required&&!!e.valid,"v-field--not-valid":t.isDirty&&e.required&&!e.valid})),n=()=>{t.isDirty=!0},l=()=>{console.log("blur")};return()=>Object(r.h)(Object(r.h)("input",{type:e.type,placeholder:e.placeholder,class:{...o.value},onFocus:n,onBlur:l}))}});class x{install(e){x.installed||(x.installed=!0,Object.keys(n).forEach(t=>{if(t&&n[t]){const o=n[t];e.component(t,o)}}))}}x.installed=!1;const S=new x;t.default=S}])}));
//# sourceMappingURL=vueland.js.map