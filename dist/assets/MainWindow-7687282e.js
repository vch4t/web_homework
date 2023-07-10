import{c as commonjsGlobal,g as getCurrentInstance,u as useRouter,a as useRoute,b as useStore,r as ref,d as resolveComponent,o as openBlock,e as createElementBlock,f as createVNode,w as withCtx,h as createBaseVNode,i as createTextVNode,t as toDisplayString,j as createBlock,k as createCommentVNode,n as nextTick,l as onMounted,m as watch,p as withDirectives,v as vShow,q as normalizeStyle,s as unref,x as pushScopeId,y as popScopeId,E as ElMessageBox}from"./index-ec6168c3.js";import{_ as _export_sfc}from"./_plugin-vue_export-helper-c27b6911.js";var md5={exports:{}};/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */(function(module){(function(){var ERROR="input is invalid type",WINDOW=typeof window=="object",root=WINDOW?window:{};root.JS_MD5_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&typeof self=="object",NODE_JS=!root.JS_MD5_NO_NODE_JS&&typeof process=="object"&&process.versions&&process.versions.node;NODE_JS?root=commonjsGlobal:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_MD5_NO_COMMON_JS&&!0&&module.exports,ARRAY_BUFFER=!root.JS_MD5_NO_ARRAY_BUFFER&&typeof ArrayBuffer<"u",HEX_CHARS="0123456789abcdef".split(""),EXTRA=[128,32768,8388608,-2147483648],SHIFT=[0,8,16,24],OUTPUT_TYPES=["hex","array","digest","buffer","arrayBuffer","base64"],BASE64_ENCODE_CHAR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),blocks=[],buffer8;if(ARRAY_BUFFER){var buffer=new ArrayBuffer(68);buffer8=new Uint8Array(buffer),blocks=new Uint32Array(buffer)}(root.JS_MD5_NO_NODE_JS||!Array.isArray)&&(Array.isArray=function(e){return Object.prototype.toString.call(e)==="[object Array]"}),ARRAY_BUFFER&&(root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW||!ArrayBuffer.isView)&&(ArrayBuffer.isView=function(e){return typeof e=="object"&&e.buffer&&e.buffer.constructor===ArrayBuffer});var createOutputMethod=function(e){return function(o){return new Md5(!0).update(o)[e]()}},createMethod=function(){var e=createOutputMethod("hex");NODE_JS&&(e=nodeWrap(e)),e.create=function(){return new Md5},e.update=function(t){return e.create().update(t)};for(var o=0;o<OUTPUT_TYPES.length;++o){var r=OUTPUT_TYPES[o];e[r]=createOutputMethod(r)}return e},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(e){if(typeof e=="string")return crypto.createHash("md5").update(e,"utf8").digest("hex");if(e==null)throw ERROR;return e.constructor===ArrayBuffer&&(e=new Uint8Array(e)),Array.isArray(e)||ArrayBuffer.isView(e)||e.constructor===Buffer?crypto.createHash("md5").update(new Buffer(e)).digest("hex"):method(e)};return nodeMethod};function Md5(e){if(e)blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks,this.buffer8=buffer8;else if(ARRAY_BUFFER){var o=new ArrayBuffer(68);this.buffer8=new Uint8Array(o),this.blocks=new Uint32Array(o)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Md5.prototype.update=function(e){if(!this.finalized){var o,r=typeof e;if(r!=="string"){if(r==="object"){if(e===null)throw ERROR;if(ARRAY_BUFFER&&e.constructor===ArrayBuffer)e=new Uint8Array(e);else if(!Array.isArray(e)&&(!ARRAY_BUFFER||!ArrayBuffer.isView(e)))throw ERROR}else throw ERROR;o=!0}for(var t,n=0,a,s=e.length,l=this.blocks,c=this.buffer8;n<s;){if(this.hashed&&(this.hashed=!1,l[0]=l[16],l[16]=l[1]=l[2]=l[3]=l[4]=l[5]=l[6]=l[7]=l[8]=l[9]=l[10]=l[11]=l[12]=l[13]=l[14]=l[15]=0),o)if(ARRAY_BUFFER)for(a=this.start;n<s&&a<64;++n)c[a++]=e[n];else for(a=this.start;n<s&&a<64;++n)l[a>>2]|=e[n]<<SHIFT[a++&3];else if(ARRAY_BUFFER)for(a=this.start;n<s&&a<64;++n)t=e.charCodeAt(n),t<128?c[a++]=t:t<2048?(c[a++]=192|t>>6,c[a++]=128|t&63):t<55296||t>=57344?(c[a++]=224|t>>12,c[a++]=128|t>>6&63,c[a++]=128|t&63):(t=65536+((t&1023)<<10|e.charCodeAt(++n)&1023),c[a++]=240|t>>18,c[a++]=128|t>>12&63,c[a++]=128|t>>6&63,c[a++]=128|t&63);else for(a=this.start;n<s&&a<64;++n)t=e.charCodeAt(n),t<128?l[a>>2]|=t<<SHIFT[a++&3]:t<2048?(l[a>>2]|=(192|t>>6)<<SHIFT[a++&3],l[a>>2]|=(128|t&63)<<SHIFT[a++&3]):t<55296||t>=57344?(l[a>>2]|=(224|t>>12)<<SHIFT[a++&3],l[a>>2]|=(128|t>>6&63)<<SHIFT[a++&3],l[a>>2]|=(128|t&63)<<SHIFT[a++&3]):(t=65536+((t&1023)<<10|e.charCodeAt(++n)&1023),l[a>>2]|=(240|t>>18)<<SHIFT[a++&3],l[a>>2]|=(128|t>>12&63)<<SHIFT[a++&3],l[a>>2]|=(128|t>>6&63)<<SHIFT[a++&3],l[a>>2]|=(128|t&63)<<SHIFT[a++&3]);this.lastByteIndex=a,this.bytes+=a-this.start,a>=64?(this.start=a-64,this.hash(),this.hashed=!0):this.start=a}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Md5.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var e=this.blocks,o=this.lastByteIndex;e[o>>2]|=EXTRA[o&3],o>=56&&(this.hashed||this.hash(),e[0]=e[16],e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),e[14]=this.bytes<<3,e[15]=this.hBytes<<3|this.bytes>>>29,this.hash()}},Md5.prototype.hash=function(){var e,o,r,t,n,a,s=this.blocks;this.first?(e=s[0]-680876937,e=(e<<7|e>>>25)-271733879<<0,t=(-1732584194^e&2004318071)+s[1]-117830708,t=(t<<12|t>>>20)+e<<0,r=(-271733879^t&(e^-271733879))+s[2]-1126478375,r=(r<<17|r>>>15)+t<<0,o=(e^r&(t^e))+s[3]-1316259209,o=(o<<22|o>>>10)+r<<0):(e=this.h0,o=this.h1,r=this.h2,t=this.h3,e+=(t^o&(r^t))+s[0]-680876936,e=(e<<7|e>>>25)+o<<0,t+=(r^e&(o^r))+s[1]-389564586,t=(t<<12|t>>>20)+e<<0,r+=(o^t&(e^o))+s[2]+606105819,r=(r<<17|r>>>15)+t<<0,o+=(e^r&(t^e))+s[3]-1044525330,o=(o<<22|o>>>10)+r<<0),e+=(t^o&(r^t))+s[4]-176418897,e=(e<<7|e>>>25)+o<<0,t+=(r^e&(o^r))+s[5]+1200080426,t=(t<<12|t>>>20)+e<<0,r+=(o^t&(e^o))+s[6]-1473231341,r=(r<<17|r>>>15)+t<<0,o+=(e^r&(t^e))+s[7]-45705983,o=(o<<22|o>>>10)+r<<0,e+=(t^o&(r^t))+s[8]+1770035416,e=(e<<7|e>>>25)+o<<0,t+=(r^e&(o^r))+s[9]-1958414417,t=(t<<12|t>>>20)+e<<0,r+=(o^t&(e^o))+s[10]-42063,r=(r<<17|r>>>15)+t<<0,o+=(e^r&(t^e))+s[11]-1990404162,o=(o<<22|o>>>10)+r<<0,e+=(t^o&(r^t))+s[12]+1804603682,e=(e<<7|e>>>25)+o<<0,t+=(r^e&(o^r))+s[13]-40341101,t=(t<<12|t>>>20)+e<<0,r+=(o^t&(e^o))+s[14]-1502002290,r=(r<<17|r>>>15)+t<<0,o+=(e^r&(t^e))+s[15]+1236535329,o=(o<<22|o>>>10)+r<<0,e+=(r^t&(o^r))+s[1]-165796510,e=(e<<5|e>>>27)+o<<0,t+=(o^r&(e^o))+s[6]-1069501632,t=(t<<9|t>>>23)+e<<0,r+=(e^o&(t^e))+s[11]+643717713,r=(r<<14|r>>>18)+t<<0,o+=(t^e&(r^t))+s[0]-373897302,o=(o<<20|o>>>12)+r<<0,e+=(r^t&(o^r))+s[5]-701558691,e=(e<<5|e>>>27)+o<<0,t+=(o^r&(e^o))+s[10]+38016083,t=(t<<9|t>>>23)+e<<0,r+=(e^o&(t^e))+s[15]-660478335,r=(r<<14|r>>>18)+t<<0,o+=(t^e&(r^t))+s[4]-405537848,o=(o<<20|o>>>12)+r<<0,e+=(r^t&(o^r))+s[9]+568446438,e=(e<<5|e>>>27)+o<<0,t+=(o^r&(e^o))+s[14]-1019803690,t=(t<<9|t>>>23)+e<<0,r+=(e^o&(t^e))+s[3]-187363961,r=(r<<14|r>>>18)+t<<0,o+=(t^e&(r^t))+s[8]+1163531501,o=(o<<20|o>>>12)+r<<0,e+=(r^t&(o^r))+s[13]-1444681467,e=(e<<5|e>>>27)+o<<0,t+=(o^r&(e^o))+s[2]-51403784,t=(t<<9|t>>>23)+e<<0,r+=(e^o&(t^e))+s[7]+1735328473,r=(r<<14|r>>>18)+t<<0,o+=(t^e&(r^t))+s[12]-1926607734,o=(o<<20|o>>>12)+r<<0,n=o^r,e+=(n^t)+s[5]-378558,e=(e<<4|e>>>28)+o<<0,t+=(n^e)+s[8]-2022574463,t=(t<<11|t>>>21)+e<<0,a=t^e,r+=(a^o)+s[11]+1839030562,r=(r<<16|r>>>16)+t<<0,o+=(a^r)+s[14]-35309556,o=(o<<23|o>>>9)+r<<0,n=o^r,e+=(n^t)+s[1]-1530992060,e=(e<<4|e>>>28)+o<<0,t+=(n^e)+s[4]+1272893353,t=(t<<11|t>>>21)+e<<0,a=t^e,r+=(a^o)+s[7]-155497632,r=(r<<16|r>>>16)+t<<0,o+=(a^r)+s[10]-1094730640,o=(o<<23|o>>>9)+r<<0,n=o^r,e+=(n^t)+s[13]+681279174,e=(e<<4|e>>>28)+o<<0,t+=(n^e)+s[0]-358537222,t=(t<<11|t>>>21)+e<<0,a=t^e,r+=(a^o)+s[3]-722521979,r=(r<<16|r>>>16)+t<<0,o+=(a^r)+s[6]+76029189,o=(o<<23|o>>>9)+r<<0,n=o^r,e+=(n^t)+s[9]-640364487,e=(e<<4|e>>>28)+o<<0,t+=(n^e)+s[12]-421815835,t=(t<<11|t>>>21)+e<<0,a=t^e,r+=(a^o)+s[15]+530742520,r=(r<<16|r>>>16)+t<<0,o+=(a^r)+s[2]-995338651,o=(o<<23|o>>>9)+r<<0,e+=(r^(o|~t))+s[0]-198630844,e=(e<<6|e>>>26)+o<<0,t+=(o^(e|~r))+s[7]+1126891415,t=(t<<10|t>>>22)+e<<0,r+=(e^(t|~o))+s[14]-1416354905,r=(r<<15|r>>>17)+t<<0,o+=(t^(r|~e))+s[5]-57434055,o=(o<<21|o>>>11)+r<<0,e+=(r^(o|~t))+s[12]+1700485571,e=(e<<6|e>>>26)+o<<0,t+=(o^(e|~r))+s[3]-1894986606,t=(t<<10|t>>>22)+e<<0,r+=(e^(t|~o))+s[10]-1051523,r=(r<<15|r>>>17)+t<<0,o+=(t^(r|~e))+s[1]-2054922799,o=(o<<21|o>>>11)+r<<0,e+=(r^(o|~t))+s[8]+1873313359,e=(e<<6|e>>>26)+o<<0,t+=(o^(e|~r))+s[15]-30611744,t=(t<<10|t>>>22)+e<<0,r+=(e^(t|~o))+s[6]-1560198380,r=(r<<15|r>>>17)+t<<0,o+=(t^(r|~e))+s[13]+1309151649,o=(o<<21|o>>>11)+r<<0,e+=(r^(o|~t))+s[4]-145523070,e=(e<<6|e>>>26)+o<<0,t+=(o^(e|~r))+s[11]-1120210379,t=(t<<10|t>>>22)+e<<0,r+=(e^(t|~o))+s[2]+718787259,r=(r<<15|r>>>17)+t<<0,o+=(t^(r|~e))+s[9]-343485551,o=(o<<21|o>>>11)+r<<0,this.first?(this.h0=e+1732584193<<0,this.h1=o-271733879<<0,this.h2=r-1732584194<<0,this.h3=t+271733878<<0,this.first=!1):(this.h0=this.h0+e<<0,this.h1=this.h1+o<<0,this.h2=this.h2+r<<0,this.h3=this.h3+t<<0)},Md5.prototype.hex=function(){this.finalize();var e=this.h0,o=this.h1,r=this.h2,t=this.h3;return HEX_CHARS[e>>4&15]+HEX_CHARS[e&15]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[o>>4&15]+HEX_CHARS[o&15]+HEX_CHARS[o>>12&15]+HEX_CHARS[o>>8&15]+HEX_CHARS[o>>20&15]+HEX_CHARS[o>>16&15]+HEX_CHARS[o>>28&15]+HEX_CHARS[o>>24&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[r&15]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[t&15]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]},Md5.prototype.toString=Md5.prototype.hex,Md5.prototype.digest=function(){this.finalize();var e=this.h0,o=this.h1,r=this.h2,t=this.h3;return[e&255,e>>8&255,e>>16&255,e>>24&255,o&255,o>>8&255,o>>16&255,o>>24&255,r&255,r>>8&255,r>>16&255,r>>24&255,t&255,t>>8&255,t>>16&255,t>>24&255]},Md5.prototype.array=Md5.prototype.digest,Md5.prototype.arrayBuffer=function(){this.finalize();var e=new ArrayBuffer(16),o=new Uint32Array(e);return o[0]=this.h0,o[1]=this.h1,o[2]=this.h2,o[3]=this.h3,e},Md5.prototype.buffer=Md5.prototype.arrayBuffer,Md5.prototype.base64=function(){for(var e,o,r,t="",n=this.array(),a=0;a<15;)e=n[a++],o=n[a++],r=n[a++],t+=BASE64_ENCODE_CHAR[e>>>2]+BASE64_ENCODE_CHAR[(e<<4|o>>>4)&63]+BASE64_ENCODE_CHAR[(o<<2|r>>>6)&63]+BASE64_ENCODE_CHAR[r&63];return e=n[a],t+=BASE64_ENCODE_CHAR[e>>>2]+BASE64_ENCODE_CHAR[e<<4&63]+"==",t};var exports=createMethod();COMMON_JS?module.exports=exports:root.md5=exports})()})(md5);const LoginView_vue_vue_type_style_index_0_scoped_5e9419c8_lang="",_hoisted_1$1={class:"checkbox"},_hoisted_2$1={class:"dialog-footer"},formLabelWidth="60px",formDialogWidth="400px",_sfc_main$1={__name:"LoginView",setup(e,{expose:o}){const{proxy:r}=getCurrentInstance();useRouter(),useRoute();const t=useStore(),n=ref();o({showLogin:p=>{n.value=p,u(p)}});const s=ref({}),l=ref(),_={nickname:[{required:!0,message:"请输入昵称"},{max:20,message:"昵称太长,只支持20以内字符"}],account:[{required:!0,message:"请输入帐号"},{max:20,message:"账号太长,只支持20以内字符"},{pattern:/^\w+$/,message:"只支持数字及字母下划线！"}],password:[{required:!0,message:"请输入密码"},{max:20,message:"密码太长,只支持20以内字符"},{pattern:/^\w+$/,message:"只支持数字及字母下划线！"}],repassword:[{required:!0,message:"请再次输入密码"},{validator:(p,i,h)=>{i!==s.value.password?h(new Error(p.message)):h()},message:"两次密码不一致，请重新输入"}]},x=ref(!1),m=ref(""),u=p=>{x.value=!0,p===1?m.value="登录":m.value="注册",nextTick(()=>{if(l.value.resetFields(),s.value={},n.value===1){const i=r.VueCookies.get("loginInfo");i&&(s.value=i)}})},f=()=>{r.globalParam.isDebug===0||l.value.validate(p=>{if(p)if(n.value===0){const i={nickname:s.value.nickname,account:s.value.account};r.VueCookies.set(s.value.account,i,-1),r.Message.success("注册成功，请登录"),x.value=!1}else{if(s.value.remember){const h={account:s.value.account,password:s.value.password,remember:s.value.remember};r.VueCookies.set("loginInfo",h,"30D")}else r.VueCookies.remove("loginInfo");if(!r.VueCookies.get(s.value.account))return r.Message.error("登录失败，未注册");r.Message.success("登录成功"),x.value=!1;const i={showAvater:!0,account:s.value.account,nickname:r.VueCookies.get(s.value.account).nickname,remember:s.value.remember};r.VueCookies.set("lastLogin",i,"30D"),t.commit("updateLoginUserInfo",i)}})};return(p,i)=>{const h=resolveComponent("el-input"),v=resolveComponent("el-form-item"),C=resolveComponent("el-checkbox"),y=resolveComponent("el-form"),b=resolveComponent("el-button"),w=resolveComponent("el-dialog");return openBlock(),createElementBlock("div",null,[createVNode(w,{modelValue:x.value,"onUpdate:modelValue":i[7]||(i[7]=d=>x.value=d),title:m.value,width:formDialogWidth,draggable:""},{footer:withCtx(()=>[createBaseVNode("div",_hoisted_2$1,[createVNode(b,{type:"primary",onClick:f},{default:withCtx(()=>[createTextVNode(toDisplayString(m.value),1)]),_:1}),createVNode(b,{onClick:i[6]||(i[6]=d=>x.value=!1)},{default:withCtx(()=>[createTextVNode("取消")]),_:1})])]),default:withCtx(()=>[createVNode(y,{model:s.value,rules:_,ref_key:"formDataRef",ref:l},{default:withCtx(()=>[n.value===0?(openBlock(),createBlock(v,{key:0,label:"昵称:","label-width":formLabelWidth,prop:"nickname"},{default:withCtx(()=>[createVNode(h,{modelValue:s.value.nickname,"onUpdate:modelValue":i[0]||(i[0]=d=>s.value.nickname=d),clearable:"",placeholder:"请输入昵称"},null,8,["modelValue"])]),_:1})):createCommentVNode("",!0),createVNode(v,{label:"账号:","label-width":formLabelWidth,prop:"account"},{default:withCtx(()=>[createVNode(h,{modelValue:s.value.account,"onUpdate:modelValue":i[1]||(i[1]=d=>s.value.account=d),clearable:"",placeholder:"请输入账号"},null,8,["modelValue"])]),_:1}),createVNode(v,{label:"密码:","label-width":formLabelWidth,prop:"password"},{default:withCtx(()=>[createVNode(h,{modelValue:s.value.password,"onUpdate:modelValue":i[2]||(i[2]=d=>s.value.password=d),clearable:"",placeholder:"请输入密码","show-password":""},null,8,["modelValue"])]),_:1}),n.value===0?(openBlock(),createBlock(v,{key:1,label:"密码:","label-width":formLabelWidth,prop:"repassword"},{default:withCtx(()=>[createVNode(h,{modelValue:s.value.repassword,"onUpdate:modelValue":i[3]||(i[3]=d=>s.value.repassword=d),clearable:"",placeholder:"请再次输入密码","show-password":""},null,8,["modelValue"])]),_:1})):createCommentVNode("",!0),n.value===1?(openBlock(),createBlock(v,{key:2},{default:withCtx(()=>[createBaseVNode("div",_hoisted_1$1,[createVNode(C,{modelValue:s.value.remember,"onUpdate:modelValue":i[4]||(i[4]=d=>s.value.remember=d),prop:"remember"},{default:withCtx(()=>[createTextVNode("记住密码")]),_:1},8,["modelValue"]),createBaseVNode("a",{href:"javascript:void(0)",onClick:i[5]||(i[5]=d=>{n.value=0,u()})},"没有账号?")])]),_:1})):createCommentVNode("",!0)]),_:1},8,["model"])]),_:1},8,["modelValue","title"])])}}},LoginRegister=_export_sfc(_sfc_main$1,[["__scopeId","data-v-5e9419c8"]]),MainWindow_vue_vue_type_style_index_0_scoped_607f52f2_lang="",_withScopeId=e=>(pushScopeId("data-v-607f52f2"),e=e(),popScopeId(),e),_hoisted_1={class:"header"},_hoisted_2=_withScopeId(()=>createBaseVNode("div",{class:"menu-bar"},null,-1)),_hoisted_3={class:"user-info"},_hoisted_4={class:"body-cont"},_sfc_main={__name:"MainWindow",setup(e){const{proxy:o}=getCurrentInstance(),r=useRouter();useRoute();const t=useStore(),n=ref(!0),a=()=>{let u=document.documentElement.scrollTop;window.addEventListener("scroll",()=>{let f=document.documentElement.scrollTop;f>u?f>100&&(n.value=!1):n.value=!0,u=f})},s=ref(),l=u=>{s.value.showLogin(u)};onMounted(()=>{a(),c()});const c=()=>{let u=o.VueCookies.get("lastLogin");u?u.remember===!0&&(t.commit("updateLoginUserInfo",u),_.value=u):_.value.showAvater=!1},_=ref({});watch(()=>t.state.loginUserInfo,(u,f)=>{u!=null?_.value=u:_.value={}},{immediate:!0,deep:!0});const x=()=>{ElMessageBox.alert("昵称："+_.value.nickname+"<br>账号："+_.value.account,"个人信息",{confirmButtonText:"确定",draggable:!0,dangerouslyUseHTMLString:!0,type:"info"})},m=()=>{t.getters.getLoginUserInfo?r.push("/newPost"):l(1)};return(u,f)=>{const p=resolveComponent("router-link"),i=resolveComponent("el-button"),h=resolveComponent("el-dropdown-item"),v=resolveComponent("el-dropdown"),C=resolveComponent("el-button-group"),y=resolveComponent("router-view");return openBlock(),createElementBlock("div",null,[withDirectives(createBaseVNode("div",_hoisted_1,[createBaseVNode("div",{class:"head-cont",style:normalizeStyle({width:unref(o).globalParam.bodywidth+"px"})},[createVNode(p,{to:"/",class:"name"},{default:withCtx(()=>[createTextVNode("MyBBS")]),_:1}),_hoisted_2,createBaseVNode("div",_hoisted_3,[createVNode(i,{type:"primary",onClick:m},{default:withCtx(()=>[createTextVNode("发帖  +")]),_:1}),_.value.showAvater?(openBlock(),createBlock(v,{key:0},{dropdown:withCtx(()=>[createVNode(h,{onClick:x},{default:withCtx(()=>[createTextVNode("个人信息")]),_:1}),createVNode(h,{onClick:f[0]||(f[0]=b=>_.value.showAvater=!1)},{default:withCtx(()=>[createTextVNode("退出登录")]),_:1})]),default:withCtx(()=>[createVNode(i,{round:"",style:{"margin-left":"40px"}},{default:withCtx(()=>[createTextVNode(toDisplayString(_.value.nickname),1)]),_:1})]),_:1})):(openBlock(),createBlock(C,{key:1,style:{"margin-left":"10px"}},{default:withCtx(()=>[createVNode(i,{type:"primary",plain:"",onClick:f[1]||(f[1]=b=>l(1))},{default:withCtx(()=>[createTextVNode("登录")]),_:1}),createVNode(i,{type:"primary",plain:"",onClick:f[2]||(f[2]=b=>l(0))},{default:withCtx(()=>[createTextVNode("注册")]),_:1})]),_:1}))])],4)],512),[[vShow,n.value]]),createBaseVNode("div",_hoisted_4,[createVNode(y)]),createBaseVNode("div",null,[createVNode(LoginRegister,{ref_key:"loginRegisterRef",ref:s},null,512)])])}}},MainWindow=_export_sfc(_sfc_main,[["__scopeId","data-v-607f52f2"]]);export{MainWindow as default};
