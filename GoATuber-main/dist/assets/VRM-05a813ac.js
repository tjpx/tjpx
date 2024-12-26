import{h as v,r as f,B as h,D as w,o as _,k as d,G as t,H as a,w as i,F as g,I as u,n as m,J as k,L,M as p}from"./index-38194ac9.js";import{e as R,E as B,d as C,_ as E,i as b,j as z}from"./el-loading-098b5aa1.js";const N=t("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg","data-v-ea893728":""},[t("path",{fill:"currentColor",d:"M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"})],-1),D=[N],A={style:{display:"flex","justify-content":"center","align-items":"baseline"}},I=t("h4",null,"嘴型控制",-1),T=t("br",null,null,-1),j={viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg","data-v-ea893728":"",style:{width:"1em",height:"1em"}},F=t("path",{fill:"currentColor",d:"M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592 0-42.944-14.08-76.736-42.24-101.376-28.16-25.344-65.472-37.312-111.232-37.312zm-12.672 406.208a54.272 54.272 0 0 0-38.72 14.784 49.408 49.408 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.848 54.848 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.968 51.968 0 0 0-15.488-38.016 55.936 55.936 0 0 0-39.424-14.784z"},null,-1),U=[F],G={class:"slider-demo-block"},H=v({__name:"VRMDrawer",setup(V){const e=f(!1),o=h();function s(){e.value=!0}function l(n){localStorage.setItem("vrmLipSync",n.toString())}return w(()=>{document.addEventListener("keydown",n=>{n.code==="ArrowLeft"&&(e.value=!1),n.code==="ArrowRight"&&(e.value=!0)})}),(n,c)=>{const y=B,x=C,S=E,M=R;return _(),d(g,null,[t("div",{class:"show_setting",onClick:s},D),a(M,{modelValue:e.value,"onUpdate:modelValue":c[1]||(c[1]=r=>e.value=r),direction:"ltr","show-close":"","with-header":!1,model:!1},{default:i(()=>[t("div",A,[I,a(y,{placement:"top"},{content:i(()=>[u("数值越小，嘴越容易张开。"),T,u("当模型说话嘴型奇怪时，请适当改变数值。")]),default:i(()=>[(_(),d("svg",j,U))]),_:1})]),t("div",G,[a(x,{modelValue:m(o).state.vrmSetting.lipSync,"onUpdate:modelValue":c[0]||(c[0]=r=>m(o).state.vrmSetting.lipSync=r),"show-input":"","input-size":"small",onChange:l},null,8,["modelValue"])]),a(S)]),_:1},8,["modelValue"])],64)}}});const J=v({__name:"VRM",setup(V){const e=f(null),o=h();return k(()=>{const s=b.service({fullscreen:!0});o.commit("setLoading",s)}),w(async()=>{const l=L().params.modelName;e&&(p.setup(e.value),await p.loadVrm("/model/"+l),setTimeout(()=>{o.commit("closeLoading")},1e3))}),(s,l)=>(_(),d(g,null,[a(H),t("canvas",{ref_key:"canvas",ref:e},null,512)],64))}});const K=z(J,[["__scopeId","data-v-43db175c"]]);export{K as default};