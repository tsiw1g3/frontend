(this["webpackJsonpmoon-monografia_online"]=this["webpackJsonpmoon-monografia_online"]||[]).push([[0],{163:function(e,t,a){},184:function(e,t,a){},190:function(e,t,a){},192:function(e,t,a){},193:function(e,t,a){},194:function(e,t,a){},195:function(e,t,a){},196:function(e,t,a){},200:function(e,t,a){},201:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(13),s=a.n(c),o=(a(163),a(237)),i=a(239),l=a(27),u=a(17),d=a(14),j=a(22),b=a.n(j),m=a(36),h=a(11),p=a(132),O=a(133),x=a(143),g=a(140),f=a(21),v=a.n(f),N=a(2),S=Object(n.createContext)(),y=v.a.create({baseURL:"https://organizacao-de-defesas.herokuapp.com"}),w=function(e){Object(x.a)(a,e);var t=Object(g.a)(a);function a(){var e;return Object(p.a)(this,a),(e=t.call(this)).state={showLogin:!0,isAuth:!1,theUser:null},e.toggleNav=function(){var t=!e.state.showLogin;e.setState(Object(h.a)(Object(h.a)({},e.state),{},{showLogin:t}))},e.logoutUser=function(){localStorage.removeItem("loginToken"),e.setState(Object(h.a)(Object(h.a)({},e.state),{},{isAuth:!1}))},e.registerUser=function(){var e=Object(m.a)(b.a.mark((function e(t){var a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.post("usuario",{nome:t.nome,email:t.email,username:t.username,password:t.password,school:t.universidade,academic_title:"Bacharelado",status:"user"});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.loginUser=function(){var e=Object(m.a)(b.a.mark((function e(t){var a,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("username",t.username),a.append("password",t.password),e.next=5,v()({method:"post",url:"https://organizacao-de-defesas.herokuapp.com/login",data:a,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){return e})).catch((function(e){return 0}));case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.isLoggedIn=Object(m.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),e.state={loading:!0,data:[]},e.isLoggedIn(),e}return Object(O.a)(a,[{key:"render",value:function(){var e={rootState:this.state,toggleNav:this.toggleNav,isLoggedIn:this.isLoggedIn,registerUser:this.registerUser,loginUser:this.loginUser,logoutUser:this.logoutUser};return Object(N.jsx)(S.Provider,{value:e,children:this.props.children})}}]),a}(n.Component),I=(a(184),a(50)),C=a.n(I);var T=function(){var e=Object(n.useContext)(S),t=(e.toggleNav,e.registerUser,Object(n.useState)([])),a=Object(d.a)(t,2),r=a[0],c=a[1],s=Object(n.useState)(void 0),o=Object(d.a)(s,2),i=o[0],l=o[1];return Object(u.e)(),localStorage.getItem("loginToken"),localStorage.getItem("userId"),Object(n.useEffect)((function(){setTimeout((function(){var e=new FormData;v()({method:"get",url:"https://organizacao-de-defesas.herokuapp.com/banca",data:e,headers:{Accept:"application/json"}}).then((function(e){var t=e.data.data;if(t){t.forEach((function(e){e.data=new Date(e.data_realizacao)}));var a=new Date;t.sort((function(e,t){return e.data_realizacao<t.data_realizacao?-1:1})),(t=t.filter((function(e){return e.data>a}))).slice(0,5),c(t)}return l(!0),e}))}),0)}),[]),Object(N.jsx)(N.Fragment,{children:i?Object(N.jsxs)("div",{className:"container",children:[Object(N.jsx)("h3",{className:"left-btn",children:"Proximos eventos"}),Object(N.jsx)("div",{className:"user-list",children:r&&r.length>0?r.map((function(e){return Object(N.jsxs)("div",{className:"user",children:[Object(N.jsx)("span",{className:"user-id",children:e.id}),Object(N.jsx)("span",{className:"user-name",children:e.titulo_trabalho}),Object(N.jsxs)("div",{className:"user-right",children:[Object(N.jsx)("span",{className:"user-role",children:e.local}),Object(N.jsx)("span",{className:"user-role",children:e.data.toLocaleString("pt-BR",{year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})})]})]},e.id)})):Object(N.jsx)("p",{})})]}):Object(N.jsx)("div",{className:"center",children:Object(N.jsx)(C.a,{type:"spin",color:"#41616c",height:100,width:100})})})},_=a(43),k=(a(190),a(236)),z=a(19),A=a(31),q=a(233),F=a(238),U=a(235),D=a(95),L=a(234),R=a(244),E=a(18);var M=function(){var e=Object(u.e)();function t(e){var t=e.input,a=t.name,n=t.onChange,r=t.value,c=Object(_.a)(t,["name","onChange","value"]),s=e.meta,o=Object(_.a)(e,["input","meta"]),i=(s.submitError&&!s.dirtySinceLastSubmit||s.error)&&s.touched;return Object(N.jsx)(L.a,Object(h.a)(Object(h.a)({},o),{},{name:a,helperText:i?s.error||s.submitError:void 0,error:i,inputProps:c,onChange:n,value:""===r?null:r}))}function a(e){var t=e.input,a=t.name,n=t.onChange,r=t.value,c=Object(_.a)(t,["name","onChange","value"]),s=e.meta,o=Object(_.a)(e,["input","meta"]),i=(s.submitError&&!s.dirtySinceLastSubmit||s.error)&&s.touched;return Object(N.jsx)(R.a,Object(h.a)(Object(h.a)({},o),{},{name:a,helperText:i?s.error||s.submitError:void 0,error:i,inputProps:c,onChange:n,value:""===r?null:r}))}function n(e){var t=new FormData;return Object.keys(e).forEach((function(a){return t.append(a,e[a])})),t}var r=function(){var t=Object(m.a)(b.a.mark((function t(a){var r,c,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=new Date(a.hora),c=new Date(a.data_realizacao),s=localStorage.getItem("loginToken"),r.setHours(r.getHours()-3),r.setDate(c.getDate()),r.setMonth(c.getMonth()),r.setFullYear(c.getFullYear()),r=r.toISOString(),a.data_realizacao=r,t.next=11,v()({method:"post",url:"https://organizacao-de-defesas.herokuapp.com/banca",data:n(a),headers:{"Content-Type":"multipart/form-data",Authorization:s,Accept:"application/json"}}).then((function(t){e.push("dashboard")}));case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(N.jsx)(k.a,{className:"App",children:Object(N.jsxs)("div",{style:{padding:16,margin:"auto",maxWidth:2e3},children:[Object(N.jsx)(o.a,{}),Object(N.jsx)(z.b,{onSubmit:r,initialValues:{},validate:function(e){var t={};return e.titulo_trabalho||(t.titulo_trabalho="Required"),e.resumo||(t.resumo="Required"),e.abstract||(t.abstract="Required"),e.palavras_chave||(t.palavras_chave="Required"),e.data_realizacao||(t.data_realizacao="Required"),e.hora||(t.hora="Required"),e.local||(t.local="Required"),t},render:function(e){var n=e.handleSubmit,r=(e.reset,e.submitting);e.pristine,e.values;return Object(N.jsx)("form",{onSubmit:n,noValidate:!0,children:Object(N.jsx)(q.a,{style:{padding:16},children:Object(N.jsxs)(F.a,{container:!0,alignItems:"flex-start",spacing:2,children:[Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,{fullWidth:!0,required:!0,multiline:!0,name:"titulo_trabalho",component:A.TextField,type:"text",label:"Titulo"})}),Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,{fullWidth:!0,required:!0,multiline:!0,name:"resumo",component:A.TextField,type:"text",label:"Resumo"})}),Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,{name:"abstract",fullWidth:!0,multiline:!0,required:!0,component:A.TextField,label:"Abstract"})}),Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,{name:"palavras_chave",fullWidth:!0,required:!0,multiline:!0,component:A.TextField,label:"Palavras Chave (Separadas por v\xedrgula)"})}),Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,{name:"local",multiline:!0,fullWidth:!0,required:!0,component:A.TextField,label:"Local"})}),Object(N.jsxs)(E.a,{utils:D.a,children:[Object(N.jsx)(F.a,{item:!0,xs:6,children:Object(N.jsx)(z.a,{name:"data_realizacao",component:t,required:!0,fullWidth:!0,margin:"normal",label:"Data"})}),Object(N.jsx)(F.a,{item:!0,xs:6,children:Object(N.jsx)(z.a,{name:"hora",required:!0,component:a,fullWidth:!0,margin:"normal",label:"Hora"})})]}),Object(N.jsx)(F.a,{item:!0,style:{marginTop:16},children:Object(N.jsx)(U.a,{variant:"contained",color:"primary",type:"submit",disabled:r,children:"Adicionar"})})]})})})}})]})})},W=a(46);a(192);var P=function(){var e=Object(n.useContext)(S),t=(e.toggleNav,e.loginUser),a=(e.isLoggedIn,{userInfo:{username:"",password:""},errorMsg:"",successMsg:""}),r=Object(u.e)(),c=Object(n.useState)(a),s=Object(d.a)(c,2),o=s[0],i=s[1],l=function(e){i(Object(h.a)(Object(h.a)({},o),{},{userInfo:Object(h.a)(Object(h.a)({},o.userInfo),{},Object(W.a)({},e.target.name,e.target.value))}))},j=function(){var e=Object(m.a)(b.a.mark((function e(n){var c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,t(o.userInfo);case 3:(c=e.sent).data?(i(Object(h.a)({},a)),localStorage.setItem("userId",c.data.id),localStorage.setItem("loginToken",c.data.token),r.push("dashboard")):i(Object(h.a)(Object(h.a)({},o),{},{successMsg:""}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p="",O="";return o.errorMsg&&(O=Object(N.jsx)("div",{className:"error-msg",children:o.errorMsg})),o.successMsg&&(p=Object(N.jsx)("div",{className:"success-msg",children:o.successMsg})),Object(N.jsxs)("div",{className:"_loginRegister",children:[Object(N.jsx)("div",{className:"column",children:Object(N.jsx)("img",{width:"70%",height:"70%",alt:"Logo Ufba",src:"https://www.ufba.br/sites/portal.ufba.br/files/brasao_ufba.jpg"})}),Object(N.jsxs)("div",{className:"column right",children:[Object(N.jsx)("h1",{children:"Login"}),Object(N.jsxs)("form",{onSubmit:j,noValidate:!0,children:[Object(N.jsxs)("div",{className:"form-control",children:[Object(N.jsx)("label",{children:"Usu\xe1rio"}),Object(N.jsx)("input",{name:"username",type:"text",required:!0,placeholder:"Usu\xe1rio",value:o.userInfo.email,onChange:l})]}),Object(N.jsx)("p",{}),Object(N.jsxs)("div",{className:"form-control",children:[Object(N.jsx)("label",{children:"Senha"}),Object(N.jsx)("input",{name:"password",type:"password",required:!0,placeholder:"Digite sua senha",value:o.userInfo.password,onChange:l})]}),O,p,Object(N.jsx)("p",{}),Object(N.jsx)("div",{className:"form-control",children:Object(N.jsx)("button",{type:"submit",children:"Login"})})]})]})]})};var H=function(){var e=Object(n.useContext)(S),t=(e.toggleNav,e.registerUser),a=Object(n.useState)({userInfo:{academic_title:"",email:"",username:"",password:"",universidade:""},errorMsg:"",successMsg:""}),r=Object(d.a)(a,2),c=r[0],s=r[1],o=Object(u.e)(),i=function(){var e=Object(m.a)(b.a.mark((function e(a){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.next=3,t(c.userInfo);case 3:e.sent,o.push("login");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(e){s(Object(h.a)(Object(h.a)({},c),{},{userInfo:Object(h.a)(Object(h.a)({},c.userInfo),{},Object(W.a)({},e.target.name,e.target.value))}))},j="",p="";return c.errorMsg&&(p=Object(N.jsx)("div",{className:"error-msg",children:c.errorMsg})),c.successMsg&&(j=Object(N.jsx)("div",{className:"success-msg",children:c.successMsg})),Object(N.jsxs)("div",{className:"_loginRegister",children:[Object(N.jsx)("div",{className:"column",children:Object(N.jsx)("img",{width:"70%",height:"70%",alt:"Logo Ufba",src:"https://www.ufba.br/sites/portal.ufba.br/files/brasao_ufba.jpg"})}),Object(N.jsxs)("div",{className:"column right",children:[Object(N.jsx)("h1",{children:"Registre-se"}),Object(N.jsxs)("form",{onSubmit:i,noValidate:!0,children:[Object(N.jsxs)("div",{className:"form-control",children:[Object(N.jsx)("label",{children:"Nome Completo"}),Object(N.jsx)("input",{name:"academic_title",required:!0,type:"text",value:c.userInfo.academic_title,onChange:l,placeholder:"Insira seu nome"}),Object(N.jsx)("p",{})]}),Object(N.jsxs)("div",{className:"form-control",children:[Object(N.jsx)("label",{children:"Email"}),Object(N.jsx)("input",{name:"email",required:!0,type:"email",value:c.userInfo.email,onChange:l,placeholder:"Insira seu email"}),Object(N.jsx)("p",{})]}),Object(N.jsxs)("div",{className:"form-control",children:[Object(N.jsx)("label",{children:"Username"}),Object(N.jsx)("input",{name:"username",required:!0,type:"username",value:c.userInfo.username,onChange:l,placeholder:"Insira seu username"}),Object(N.jsx)("p",{})]}),Object(N.jsxs)("div",{className:"form-control",children:[Object(N.jsx)("label",{children:"Senha"}),Object(N.jsx)("input",{name:"password",required:!0,type:"password",value:c.userInfo.password,onChange:l,placeholder:"Insira sua senha"}),Object(N.jsx)("p",{})]}),Object(N.jsxs)("div",{className:"form-control",children:[Object(N.jsx)("label",{children:"Universidade"}),Object(N.jsx)("input",{name:"universidade",required:!0,type:"universidade",value:c.userInfo.universidade,onChange:l,placeholder:"Insira sua universidade"}),Object(N.jsx)("p",{})]}),p,j,Object(N.jsx)("div",{className:"form-control",children:Object(N.jsx)("button",{type:"submit",onClick:i,children:"Registrar"})})]})]})]})};a(193);var B=function(){var e=Object(n.useContext)(S),t=(e.toggleNav,e.registerUser,Object(n.useState)([])),a=Object(d.a)(t,2),r=a[0],c=a[1],s=Object(n.useState)(void 0),o=Object(d.a)(s,2),i=o[0],l=o[1],j=Object(u.e)(),b=localStorage.getItem("loginToken"),m=localStorage.getItem("userId");return Object(n.useEffect)((function(){setTimeout((function(){var e=new FormData;v()({method:"get",url:"https://organizacao-de-defesas.herokuapp.com/usuario/"+m+"/banca",data:e,headers:{"Content-Type":"multipart/form-data",Authorization:b,Accept:"application/json"}}).then((function(e){return c(e.data.data),l(!0),e}))}),0)}),[]),Object(N.jsx)(N.Fragment,{children:i?Object(N.jsxs)("div",{className:"container",children:[Object(N.jsx)("div",{class:"left-btn",children:Object(N.jsx)(U.a,{type:"button",variant:"contained",color:"primary",onClick:function(){j.push("addbanca")},children:"Adicionar banca"})}),Object(N.jsx)("div",{class:"right-btn",children:Object(N.jsx)(U.a,{type:"button",variant:"contained",color:"primary",onClick:function(){j.push(""),localStorage.removeItem("loginToken")},children:"Logout"})}),Object(N.jsx)("div",{className:"user-list",children:r&&r.length>0?r.map((function(e){return Object(N.jsxs)("div",{className:"user",children:[Object(N.jsx)("span",{className:"user-id",children:e.id}),Object(N.jsx)("button",{onClick:function(){return function(e){localStorage.setItem("banca",JSON.stringify(e)),j.push("verbanca")}(e)},className:"user-name",children:e.titulo_trabalho}),Object(N.jsx)("div",{className:"user-right",children:Object(N.jsx)("button",{onClick:function(){return t=e.id,localStorage.setItem("bancaId",t),void j.push("addition");var t},className:"user-role",children:"Adicionar Usu\xe1rio"})})]},e.id)})):Object(N.jsx)("h1",{})})]}):Object(N.jsx)("div",{className:"center",children:Object(N.jsx)(C.a,{type:"spin",color:"#41616c",height:100,width:100})})})};a(194);var V=function(){var e=Object(n.useContext)(S),t=(e.toggleNav,e.registerUser,Object(n.useState)([])),a=Object(d.a)(t,2),r=a[0],c=a[1],s=Object(n.useState)([]),o=Object(d.a)(s,2),i=o[0],l=o[1],j=Object(n.useState)([]),b=Object(d.a)(j,2),m=b[0],h=b[1],p=Object(n.useState)(void 0),O=Object(d.a)(p,2),x=O[0],g=O[1],f=Object(n.useState)(void 0),y=Object(d.a)(f,2),w=y[0],I=y[1],T=(Object(u.e)(),function(){window.location.reload()}),_=localStorage.getItem("loginToken"),k=(localStorage.getItem("userId"),localStorage.getItem("bancaId")),z=function(e,t){var a=new FormData;a.append("id_usuario",e),a.append("role",t),v()({method:"post",url:"https://organizacao-de-defesas.herokuapp.com/usuario-banca/".concat(k),data:a,headers:{"Content-Type":"multipart/form-data",Authorization:_,Accept:"application/json"}}).then((function(e){T()}))};return Object(n.useEffect)((function(){setTimeout((function(){var e=new FormData;v()({method:"get",url:"https://organizacao-de-defesas.herokuapp.com/banca/"+k+"/users",data:e,headers:{"Content-Type":"multipart/form-data",Authorization:_,Accept:"application/json"}}).then((function(e){l(e.data.data),I(!0);for(var t=[],a=0;a<e.data.data.length;++a)t.push(e.data.data[a].id);return h(t),e}))}),0)}),[]),Object(n.useEffect)((function(){setTimeout((function(){var e=new FormData;v()({method:"get",url:"https://organizacao-de-defesas.herokuapp.com/usuario",data:e,headers:{"Content-Type":"multipart/form-data",Authorization:_,Accept:"application/json"}}).then((function(e){return c(e.data.data),g(!0),e}))}),0)}),[]),Object(N.jsx)(N.Fragment,{children:x&&w?Object(N.jsxs)("div",{className:"container",children:[Object(N.jsx)("div",{className:"user-list",children:i&&i.length>0?i.map((function(e){return Object(N.jsxs)("div",{className:"user",children:[Object(N.jsx)("span",{className:"user-id",children:e.id}),Object(N.jsx)("span",{className:"user-name",children:e.username}),Object(N.jsx)("div",{className:"user-right",children:Object(N.jsx)("button",{onClick:function(){return t=e.id,void v()({method:"delete",url:"https://organizacao-de-defesas.herokuapp.com/banca/".concat(k,"/user/").concat(t),headers:{"Content-Type":"multipart/form-data",Authorization:_,Accept:"application/json"}}).then((function(e){T()}));var t},className:"user-role",children:"Remover da banca"})})]},e.id)})):Object(N.jsx)("div",{})}),Object(N.jsx)("div",{className:"user-list",children:r&&r.length>0?r.filter((function(e){return!m.includes(e.id)&&"admin"!=e.titulo_academico})).map((function(e){return Object(N.jsxs)("div",{className:"user",children:[Object(N.jsx)("span",{className:"user-id",children:e.id}),Object(N.jsx)("span",{className:"user-name",children:e.username}),Object(N.jsxs)("div",{className:"user-right",children:[Object(N.jsx)("button",{onClick:function(){return z(e.id,"avaliador")},className:"user-role",children:"Adicionar como avaliador"}),Object(N.jsx)("button",{onClick:function(){return z(e.id,"aluno")},className:"user-role",children:"Adicionar como aluno"})]})]},e.id)})):Object(N.jsx)("div",{})})]}):Object(N.jsx)("div",{className:"center",children:Object(N.jsx)(C.a,{type:"spin",color:"#41616c",height:100,width:100})})})};a(195);var J=function(){var e=JSON.parse(localStorage.getItem("banca"));e.data_realizacao=new Date(e.data_realizacao);var t=localStorage.getItem("userId"),a=localStorage.getItem("loginToken"),r=Object(n.useState)([]),c=Object(d.a)(r,2),s=c[0],i=c[1],l=Object(n.useState)([]),j=Object(d.a)(l,2),p=j[0],O=j[1],x=Object(n.useState)([]),g=Object(d.a)(x,2),f=g[0],S=g[1],y=Object(n.useState)(void 0),w=Object(d.a)(y,2),I=w[0],T=w[1],M=Object(u.e)();function P(e){var t=e.input,a=t.name,n=t.onChange,r=t.value,c=Object(_.a)(t,["name","onChange","value"]),s=e.meta,o=Object(_.a)(e,["input","meta"]),i=(s.submitError&&!s.dirtySinceLastSubmit||s.error)&&s.touched;return Object(N.jsx)(L.a,Object(h.a)(Object(h.a)({},o),{},{name:a,helperText:i?s.error||s.submitError:void 0,error:i,inputProps:c,onChange:n,value:""===r?null:r}))}function H(e){var t=e.input,a=t.name,n=t.onChange,r=t.value,c=Object(_.a)(t,["name","onChange","value"]),s=e.meta,o=Object(_.a)(e,["input","meta"]),i=(s.submitError&&!s.dirtySinceLastSubmit||s.error)&&s.touched;return Object(N.jsx)(R.a,Object(h.a)(Object(h.a)({},o),{},{name:a,helperText:i?s.error||s.submitError:void 0,error:i,inputProps:c,onChange:n,value:""===r?null:r}))}function B(e){var t=[];for(var a in e){var n=encodeURIComponent(a),r=encodeURIComponent(e[a]);t.push(n+"="+r)}return t=t.join("&")}var V=function(){var t=Object(m.a)(b.a.mark((function t(a){var n,r,c,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=new Date(a.hora),r=new Date(a.data_realizacao),c=localStorage.getItem("loginToken"),n.setHours(n.getHours()-3),n.setDate(r.getDate()),n.setMonth(r.getMonth()),n.setFullYear(r.getFullYear()),a.data_realizacao=n.toISOString(),v()({method:"put",url:"https://organizacao-de-defesas.herokuapp.com/banca/".concat(e.id),data:B(a),headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:c,Accept:"application/json"}}).then((function(e){M.push("dashboard")})),"aluno"!=f&&(s={nota:parseFloat(a.nota)},v()({method:"put",url:"https://organizacao-de-defesas.herokuapp.com/usuario-banca/".concat(p),data:B(s),headers:{"Content-Type":"multipart/form-data",Authorization:c,Accept:"application/json"}}).then((function(e){return e})));case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(n.useEffect)((function(){setTimeout((function(){v()({method:"get",url:"https://organizacao-de-defesas.herokuapp.com/usuario-banca/id/".concat(e.id,"/").concat(t),headers:{"Content-Type":"application/json",Authorization:a,Accept:"application/json"}}).then((function(t){return S(t.data.data.role),O(t.data.data.id),"aluno"==t.data.data.role?v()({method:"get",url:"https://organizacao-de-defesas.herokuapp.com/nota/".concat(e.id),headers:{"Content-Type":"application/json",Authorization:a,Accept:"application/json"}}).then((function(e){i(e.data.data||""),T(!0)})):(i(t.data.data.nota||""),T(!0)),t}))}),0)}),[]),Object(N.jsx)(N.Fragment,{children:I?Object(N.jsx)(k.a,{className:"App",children:Object(N.jsxs)("div",{style:{padding:16,margin:"auto",maxWidth:2e3},children:[Object(N.jsx)(o.a,{}),Object(N.jsx)(z.b,{onSubmit:V,initialValues:{titulo_trabalho:e.titulo_trabalho,resumo:e.resumo,abstract:e.abstract,palavras_chave:e.palavras_chave,local:e.local,data_realizacao:e.data_realizacao,hora:e.data_realizacao,nota:s,nota_nao_alteravel:s},validate:function(e){var t={};return e.titulo_trabalho||(t.titulo_trabalho="Required"),e.resumo||(t.resumo="Required"),e.abstract||(t.abstract="Required"),e.palavras_chave||(t.palavras_chave="Required"),e.local||(t.local="Required"),t},render:function(e){var t,a=e.handleSubmit,n=(e.reset,e.submitting);e.pristine,e.values;return Object(N.jsx)("form",{onSubmit:a,noValidate:!0,children:Object(N.jsx)(q.a,{style:{padding:16},children:Object(N.jsxs)(F.a,{container:!0,alignItems:"flex-start",spacing:2,children:[Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,{fullWidth:!0,required:!0,multiline:!0,name:"titulo_trabalho",component:A.TextField,type:"text",label:"Titulo"})}),Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,{fullWidth:!0,required:!0,multiline:!0,name:"resumo",component:A.TextField,type:"text",label:"Resumo"})}),Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,{name:"abstract",fullWidth:!0,multiline:!0,required:!0,component:A.TextField,label:"Abstract"})}),Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,{name:"palavras_chave",fullWidth:!0,required:!0,multiline:!0,component:A.TextField,label:"Palavras Chave (Separadas por v\xedrgula)"})}),Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,(t={name:"local",multiline:!0,fullWidth:!0,component:A.TextField,required:!0},Object(W.a)(t,"multiline",!0),Object(W.a)(t,"label","Local"),t))}),Object(N.jsxs)(E.a,{utils:D.a,children:[Object(N.jsx)(F.a,{item:!0,xs:6,children:Object(N.jsx)(z.a,{name:"data_realizacao",component:P,required:!0,fullWidth:!0,margin:"normal",label:"Data"})}),Object(N.jsx)(F.a,{item:!0,xs:6,children:Object(N.jsx)(z.a,{name:"hora",required:!0,component:H,fullWidth:!0,margin:"normal",label:"Hora"})}),"aluno"!=f?Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,{name:"nota",fullWidth:!0,component:A.TextField,label:"Nota"})}):Object(N.jsx)(F.a,{item:!0,xs:12,children:Object(N.jsx)(z.a,{name:"nota_nao_alteravel",disabled:!0,fullWidth:!0,component:A.TextField,label:"Nota Final"})})]}),Object(N.jsx)(F.a,{item:!0,style:{marginTop:16},children:Object(N.jsx)(U.a,{variant:"contained",color:"primary",type:"submit",disabled:n,children:"Editar"})})]})})})}})]})}):Object(N.jsx)("div",{className:"center",children:Object(N.jsx)(C.a,{type:"spin",color:"#41616c",height:100,width:100})})})},Y=function(){return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(u.a,{component:T,path:"/",exact:!0}),Object(N.jsx)(u.a,{component:M,path:"/addbanca"}),Object(N.jsx)(u.a,{component:P,path:"/login",exact:!0}),Object(N.jsx)(u.a,{component:H,path:"/register",exact:!0}),Object(N.jsx)(u.a,{component:B,path:"/dashboard",exact:!0}),Object(N.jsx)(u.a,{component:V,path:"/addition",exact:!0}),Object(N.jsx)(u.a,{component:J,path:"/verbanca",exact:!0})]})},G=a(141),K=a(242),Q=a(138),X=a.n(Q);a(196);var Z=function(){var e=r.a.useState(null),t=Object(d.a)(e,2),a=t[0],n=t[1],c=Boolean(a);return Object(N.jsxs)("div",{className:"header",bg:"light",expand:"lg",children:[Object(N.jsx)("h1",{className:"logo",children:"moon"}),Object(N.jsxs)("div",{children:[Object(N.jsx)(U.a,{id:"basic-button","aria-controls":"basic-menu","aria-haspopup":"true","aria-expanded":c?"true":void 0,onClick:function(e){n(e.currentTarget)},style:{marginTop:20},children:Object(N.jsx)(X.a,{})}),Object(N.jsxs)(G.a,{id:"basic-menu",anchorEl:a,open:c,onClose:function(){n(null)},MenuListProps:{"aria-labelledby":"basic-button"},children:[Object(N.jsx)(K.a,{component:l.b,to:"/",children:"Home"}),Object(N.jsx)(K.a,{component:l.b,to:"/login",children:"Login"}),Object(N.jsx)(K.a,{component:l.b,to:"/register",children:"Registre-se"}),Object(N.jsx)(K.a,{component:l.b,to:"/dashboard",children:"Dashboard"})]})]})]})};a(200);var $=function(){return Object(N.jsxs)("div",{className:"footer",bg:"light",expand:"lg",fixed:"bottom",children:[Object(N.jsxs)("div",{children:[Object(N.jsx)("strong",{children:"INSTITUTO DE COMPUTA\xc7\xc3O"}),Object(N.jsx)("p",{children:"Avenida Adhemar de Barros, s/n - Campus de Ondina"}),Object(N.jsx)("p",{children:"CEP: 40.170-110 Salvador-Bahia Telefone: 3283-6164"})]}),Object(N.jsx)("img",{src:"https://dcc.ufba.br/sites/computacao.ufba.br/files/logos_ufba.png",alt:"Logos IC"})]})};var ee=function(){return Object(N.jsx)(l.a,{children:Object(N.jsxs)(w,{children:[Object(N.jsx)(Z,{}),Object(N.jsx)("body",{style:{minHeight:500},children:Object(N.jsx)(Y,{})}),Object(N.jsx)($,{})]})})},te=a(96),ae=a(139),ne=Object(ae.a)({palette:{type:"light",primary:{main:"#61dafb",light:"#61dafb",dark:"#21a1c4"},secondary:{main:"#b5ecfb",light:"#61dafb",dark:"#21a1c4"},error:{main:te.a.A400},background:{default:"#282c34"}},overrides:{MuiPaper:{root:{padding:"20px 10px",margin:"10px",backgroundColor:"#fff"}},MuiButton:{root:{margin:"5px"}}}});s.a.render(Object(N.jsxs)(i.a,{theme:ne,children:[Object(N.jsx)(o.a,{}),Object(N.jsx)(ee,{})]}),document.getElementById("root"))}},[[201,1,2]]]);
//# sourceMappingURL=main.82986f41.chunk.js.map