import{r as k,d as f,o as B,e as V,h as r,f as i,w as p,i as w,t as S,g as P,u as z,a as C,b as $,m as H,l as R,q as j,s as q}from"./index-ec6168c3.js";import{_ as T}from"./_plugin-vue_export-helper-c27b6911.js";const E={class:"article-item"},F={class:"item-inner"},K={class:"user-info"},L={class:"time"},O={class:"check-title"},U={class:"info"},W={__name:"ArticleItem",props:{data:{type:Object},articleArray:{type:Array}},setup(l){const o=l,D=k();return D.value=o.data.id,(h,c)=>{const y=f("router-link"),n=f("el-divider"),I=f("el-checkbox");return B(),V("div",E,[r("div",F,[r("div",K,[i(y,{to:"/",class:"a-link"},{default:p(()=>[w(S(l.data.nickname),1)]),_:1}),i(n,{direction:"vertical"}),r("div",L,S(l.data.time),1)]),r("div",O,[i(I,{class:"check",modelValue:l.articleArray[l.data.id],"onUpdate:modelValue":c[0]||(c[0]=b=>l.articleArray[l.data.id]=b)},null,8,["modelValue"]),i(y,{to:`/article/${l.data.id}`,class:"title",target:"_blank"},{default:p(()=>[w(S(l.data.title),1)]),_:1},8,["to"])]),r("div",U,S(l.data.info),1)])])}}},Y=T(W,[["__scopeId","data-v-9437c0ce"]]);const G={class:"article-bar"},J={class:"article-list"},Q={__name:"ArticleView",setup(l){const{proxy:o}=P(),D=z();C(),$();const h=k([]),c=k(!0);H(()=>[...h.value],(a,e)=>{a.some(s=>s===!0)?c.value=!1:c.value=!0});const y=async function(){let a=h.value;for(var e=0;e<a.length;++e)a[e]===!0&&await o.indexdb.deleteByKey(e);D.go(0)},n=k({}),I=()=>{n.value.pageNo=1,n.value.pageSize=10,o.indexdb.getAllDB().then(a=>{n.value.size=a.length,b()})},b=()=>{o.indexdb.getAllByPage(n.value.pageNo,n.value.pageSize).then(a=>{n.value.array=a})};R(()=>{o.indexdb.openDB().then(a=>{o.indexdb.db=a,M(),I()})});const M=()=>{if(localStorage.getItem("articleInfo"))return;let e=[],s=new Date().getTime(),x=new Date(2020,0,1).getTime();for(var t=0;t<21;++t){let u={},A=x+Math.floor(Math.random()*(s-x)),d=new Date(A),m=d.getDate(),_=d.getMonth()+1,N=d.getFullYear();d.getDay();let g=d.getHours(),v=d.getMinutes();_=_<10?"0"+_:_,m=m<10?"0"+m:m,g=g<10?"0"+g:g,v=v<10?"0"+v:v,u.time=N+"-"+_+"-"+m+" "+g+":"+v,u.timeStamp=A,e.push(u)}e.sort((u,A)=>u.timeStamp-A.timeStamp);for(var t=0;t<20;++t)e[t].id=t,e[t].nickname="name"+t.toString(),e[t].title="title"+t.toString(),e[t].data="article"+t.toString(),e[t].info="info"+t.toString(),o.indexdb.updateDB(e[t]);e[20].data=`<p>😊</p><p><br></p><pre><code >#include&lt;iostream&gt;
using std::cout;

int main(){
    cout&lt;&lt;"hello world!"&lt;&lt;endl;
    return 0;
}</code></pre><p><br></p>`,e[20].id=20,e[20].nickname="hello",e[20].title="Hello World!",e[20].info="hello world!coding!",o.indexdb.updateDB(e[20]),localStorage.setItem("articleInfo",!0)};return(a,e)=>{const s=f("el-button"),x=f("Pagination");return B(),V("div",{class:"body-contain",style:j({width:q(o).globalParam.bodywidth+"px"})},[r("div",G,[i(s,{type:"info"},{default:p(()=>[w("最新")]),_:1}),i(s,{type:"info",disabled:c.value,onClick:y},{default:p(()=>[w("删除")]),_:1},8,["disabled"])]),r("div",J,[i(x,{dataSource:n.value,onLoadData:b},{default:p(({data:t})=>[i(Y,{data:t,articleArray:h.value},null,8,["data","articleArray"])]),_:1},8,["dataSource"])])],4)}}},ee=T(Q,[["__scopeId","data-v-200403ae"]]);export{ee as default};
