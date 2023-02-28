"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9100],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>h});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),d=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=d(e.components);return n.createElement(c.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=d(r),p=a,h=m["".concat(c,".").concat(p)]||m[p]||u[p]||l;return r?n.createElement(h,o(o({ref:t},s),{},{components:r})):n.createElement(h,o({ref:t},s))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=p;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[m]="string"==typeof e?e:a,o[1]=i;for(var d=2;d<l;d++)o[d]=r[d];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},2463:(e,t,r)=>{r.d(t,{Ps:()=>O,nU:()=>k,aD:()=>A,W5:()=>S,p4:()=>I,ej:()=>T});var n=r(7294);const a="entryField_LQuR",l="name_R6gP",o="header_odoB";var i=r(2949);const c={badge:"badge_JMXK"};function d(e){let{name:t,color:r}=e;const a="dark"===(0,i.I)().colorMode,l=a?`${r}CC`:`${r}44`,o=a?"white":r;return n.createElement("span",{style:{backgroundColor:l,color:o},className:c.badge},t)}var s=r(9960);const m=()=>n.createElement(d,{name:"Required",color:"#ff3838"}),u=()=>n.createElement(d,{name:"Inherited",color:"#a83dff"}),p=()=>n.createElement(d,{name:"Optional",color:"#3191f7"}),h=()=>n.createElement(d,{name:"List",color:"#20bf7c"}),f=()=>n.createElement(d,{name:"Deprecated",color:"#fa9d2a"}),b=()=>n.createElement(d,{name:"Colored",color:"#ff8e42"}),y=()=>n.createElement(d,{name:"Regex",color:"#f731d6"}),E=()=>n.createElement(d,{name:"Placeholders",color:"#00b300"}),k=e=>n.createElement("div",{className:a},n.createElement("div",{className:o},n.createElement("h2",{className:l},e.name),e.required&&n.createElement(m,null),e.inherited&&n.createElement(u,null),e.optional&&n.createElement(p,null),e.multiple&&n.createElement(h,null),e.deprecated&&n.createElement(f,null),e.colored&&n.createElement(b,null),e.regex&&n.createElement(y,null),e.placeholders&&n.createElement(E,null)),n.createElement("div",{className:""},e.children,e.colored&&n.createElement(x,null),e.regex&&n.createElement(j,null),e.placeholders&&n.createElement(P,null),e.duration&&n.createElement(_,null))),w=()=>n.createElement(k,{name:"Criteria",inherited:!0,multiple:!0},"A list of facts that must be met by the player before this entry can be triggered."),g=()=>n.createElement(k,{name:"Modifiers",inherited:!0,multiple:!0},"A list of facts that will be modified for the player when this entry is triggered."),v=()=>n.createElement(k,{name:"Triggers",inherited:!0,multiple:!0},"A list of entries that will be triggered after this entry is triggered."),O=()=>n.createElement("div",null,n.createElement(w,null),n.createElement(g,null),n.createElement(v,null)),S=()=>n.createElement("div",null,n.createElement(k,{name:"Comment",optional:!0,inherited:!0},"A comment to keep track of what this fact is used for.")),A=()=>n.createElement("div",null,n.createElement(v,null)),T=()=>n.createElement("div",null,n.createElement(k,{name:"Display Name",required:!0,inherited:!0},"The display name of the speaker."),n.createElement(k,{name:"Sound",required:!0,inherited:!0},"The sound that will be played when the speaker speaks.")),x=()=>n.createElement("div",null,n.createElement("br",null),"Colors and formatting from the"," ",n.createElement(s.Z,{to:"https://docs.advntr.dev/minimessage/format.html"},n.createElement("code",null,"MiniMessage Adventure Api"))," ","can be used. So for example, you can use ",n.createElement("code",null,"<red>Some Text</red>")," for red text."),P=()=>n.createElement("div",null,n.createElement("br",null),"Placeholders from the"," ",n.createElement(s.Z,{to:"https://github.com/PlaceholderAPI/PlaceholderAPI/wiki"},n.createElement("code",null,"PlaceholderApi"))," ","can be used. So for example, you can use ",n.createElement("code",null,"%player_name%")," for the player name."),_=()=>n.createElement("div",null,n.createElement("br",null),"Durations can be specified in the following format: ",n.createElement("code",null,"1d 2h 3m 4s"),". The following units are supported: ",n.createElement("code",null,"d")," for days, ",n.createElement("code",null,"h")," for hours,",n.createElement("code",null,"m")," for minutes and ",n.createElement("code",null,"s")," for seconds."),j=()=>n.createElement("div",null,n.createElement("br",null),n.createElement(s.Z,{to:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions"},n.createElement("code",null,"Regular expressions"))," ","can be used to match a pattern. For example, ",n.createElement("code",null,"^.*$")," will match any string."),I=()=>n.createElement("div",null,n.createElement("br",null),"This fact can only be ",n.createElement("b",null,"read"),", not written to. Hence, it is only suitable for criteria.")},7628:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var n=r(7462),a=(r(7294),r(3905)),l=r(2463);const o={},i="Island Bank Withdraw Action",c={unversionedId:"adapters/SuperiorSkyblockAdapter/entries/action/island_bank_withdraw",id:"adapters/SuperiorSkyblockAdapter/entries/action/island_bank_withdraw",title:"Island Bank Withdraw Action",description:"The Island Bank Withdraw action allows you to withdraw money from the player's Island bank.",source:"@site/docs/adapters/SuperiorSkyblockAdapter/entries/action/island_bank_withdraw.mdx",sourceDirName:"adapters/SuperiorSkyblockAdapter/entries/action",slug:"/adapters/SuperiorSkyblockAdapter/entries/action/island_bank_withdraw",permalink:"/TypeWriter/adapters/SuperiorSkyblockAdapter/entries/action/island_bank_withdraw",draft:!1,editUrl:"https://github.com/gabber235/TypeWriter/tree/main/documentation/docs/adapters/SuperiorSkyblockAdapter/entries/action/island_bank_withdraw.mdx",tags:[],version:"current",frontMatter:{},sidebar:"adapters",previous:{title:"Island Bank Deposit Action",permalink:"/TypeWriter/adapters/SuperiorSkyblockAdapter/entries/action/island_bank_deposit"},next:{title:"Island Disband Action",permalink:"/TypeWriter/adapters/SuperiorSkyblockAdapter/entries/action/island_disband"}},d={},s=[{value:"How could this be used?",id:"how-could-this-be-used",level:2},{value:"Fields",id:"fields",level:2}],m={toc:s},u="wrapper";function p(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"island-bank-withdraw-action"},"Island Bank Withdraw Action"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"Island Bank Withdraw")," action allows you to withdraw money from the player's Island bank."),(0,a.kt)("h2",{id:"how-could-this-be-used"},"How could this be used?"),(0,a.kt)("p",null,"This could be used to allow players to buy items from a shop."),(0,a.kt)("h2",{id:"fields"},"Fields"),(0,a.kt)(l.Ps,{mdxType:"ActionsField"}),(0,a.kt)(l.nU,{name:"Amount",required:!0,mdxType:"EntryField"},"The amount to withdraw from the player's Island bank."))}p.isMDXComponent=!0}}]);