(this["webpackJsonpmoon-monografia_online"]=this["webpackJsonpmoon-monografia_online"]||[]).push([[0],{157:function(e,t,a){},158:function(e,t,a){},166:function(e,t,a){},168:function(e,t,a){},189:function(e,t,a){},190:function(e,t,a){},191:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a(12),r=a.n(c),o=(a(157),a(228)),i=a(233),s=a(132),l=a(16),j=(a(158),a(221)),b=a(225),d=a(226),m=a(136),u=a(137),x=a(5),h={code:"pt-br",week:{dow:0,doy:6},buttonText:{prev:"Ant",next:"Sig",today:"Hoje",month:"Mes",week:"Semana",day:"D\xeda",list:"Agenda"},weekText:"Sm",allDayText:"Todo el d\xeda",moreLinkText:"m\xe1s",noEventsText:"No hay eventos para mostrar"};var p=function(){return Object(x.jsx)(j.a,{maxWidth:"sm",className:"App",children:Object(x.jsxs)(b.a,{children:[Object(x.jsx)(m.a,{locales:[h],locale:"pt-br",plugins:[u.a],initialView:"dayGridMonth",weekends:!1,events:[{title:"Apresenta\xe7\xe3o Fred",date:"2021-09-13"},{title:"Pr\xf3xima aula",date:"2021-09-20"}]}),Object(x.jsx)(d.a,{variant:"contained",color:"primary",children:"Bot\xe3o 1"}),Object(x.jsx)(d.a,{variant:"contained",color:"secondary",children:"Bot\xe3o 2"})]})})},O=a(59),f=a.n(O),g=a(85),v=a(68),y=a(69),S=(a(166),a(22)),k=a(27),C=a(62),w=a(229),N=a(230),T=a(231),A=a(100),E=a(195),P=a(238),W=a(232),B=a(239),L=a(134),M=a(227),R=a(236),F=a(18);var I=function(){function e(e){var t=e.input,a=t.name,n=t.onChange,c=t.value,r=Object(y.a)(t,["name","onChange","value"]),o=e.meta,i=Object(y.a)(e,["input","meta"]),s=(o.submitError&&!o.dirtySinceLastSubmit||o.error)&&o.touched;return Object(x.jsx)(M.a,Object(v.a)(Object(v.a)({},i),{},{name:a,helperText:s?o.error||o.submitError:void 0,error:s,inputProps:r,onChange:n,value:""===c?null:c}))}function t(e){var t=e.input,a=t.name,n=t.onChange,c=t.value,r=Object(y.a)(t,["name","onChange","value"]),o=e.meta,i=Object(y.a)(e,["input","meta"]),s=(o.submitError&&!o.dirtySinceLastSubmit||o.error)&&o.touched;return Object(x.jsx)(R.a,Object(v.a)(Object(v.a)({},i),{},{name:a,helperText:s?o.error||o.submitError:void 0,error:s,inputProps:r,onChange:n,value:""===c?null:c}))}var a=function(){var e=Object(g.a)(f.a.mark((function e(t){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=function(e){return new Promise((function(t){return setTimeout(t,e)}))},e.next=3,a(300);case 3:window.alert(JSON.stringify(t,0,2));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(x.jsx)(j.a,{maxWidth:"sm",className:"App",children:Object(x.jsxs)("div",{style:{padding:16,margin:"auto",maxWidth:600},children:[Object(x.jsx)(o.a,{}),Object(x.jsx)(C.a,{variant:"h4",align:"center",component:"h1",gutterBottom:!0,children:"\ud83c\udfc1 React Final Form"}),Object(x.jsx)(C.a,{variant:"h5",align:"center",component:"h2",gutterBottom:!0,children:"Material-UI Example"}),Object(x.jsxs)(C.a,{paragraph:!0,children:[Object(x.jsx)(w.a,{href:"https://github.com/erikras/react-final-form#-react-final-form",children:"Read Docs"}),". This example demonstrates using"," ",Object(x.jsx)(w.a,{href:"https://material-ui.com/demos/text-fields/",children:"Material-UI"})," ","form controls."]}),Object(x.jsx)(S.b,{onSubmit:a,initialValues:{employed:!0,stooge:"larry"},validate:function(e){var t={};return e.firstName||(t.firstName="Required"),e.lastName||(t.lastName="Required"),e.email||(t.email="Required"),t},render:function(a){var n=a.handleSubmit,c=a.reset,r=a.submitting,o=a.pristine,i=a.values;return Object(x.jsxs)("form",{onSubmit:n,noValidate:!0,children:[Object(x.jsx)(b.a,{style:{padding:16},children:Object(x.jsxs)(N.a,{container:!0,alignItems:"flex-start",spacing:2,children:[Object(x.jsx)(N.a,{item:!0,xs:6,children:Object(x.jsx)(S.a,{fullWidth:!0,required:!0,name:"firstName",component:k.TextField,type:"text",label:"First Name"})}),Object(x.jsx)(N.a,{item:!0,xs:6,children:Object(x.jsx)(S.a,{fullWidth:!0,required:!0,name:"lastName",component:k.TextField,type:"text",label:"Last Name"})}),Object(x.jsx)(N.a,{item:!0,xs:12,children:Object(x.jsx)(S.a,{name:"email",fullWidth:!0,required:!0,component:k.TextField,type:"email",label:"Email"})}),Object(x.jsx)(N.a,{item:!0,xs:12,children:Object(x.jsx)(T.a,{label:"Employed",control:Object(x.jsx)(S.a,{name:"employed",component:k.Checkbox,type:"checkbox"})})}),Object(x.jsx)(N.a,{item:!0,children:Object(x.jsxs)(A.a,{component:"fieldset",children:[Object(x.jsx)(E.a,{component:"legend",children:"Best Stooge"}),Object(x.jsxs)(P.a,{row:!0,children:[Object(x.jsx)(T.a,{label:"Larry",control:Object(x.jsx)(S.a,{name:"stooge",component:k.Radio,type:"radio",value:"larry"})}),Object(x.jsx)(T.a,{label:"Moe",control:Object(x.jsx)(S.a,{name:"stooge",component:k.Radio,type:"radio",value:"moe"})}),Object(x.jsx)(T.a,{label:"Curly",control:Object(x.jsx)(S.a,{name:"stooge",component:k.Radio,type:"radio",value:"curly"})})]})]})}),Object(x.jsx)(N.a,{item:!0,children:Object(x.jsxs)(A.a,{component:"fieldset",children:[Object(x.jsx)(E.a,{component:"legend",children:"Sauces"}),Object(x.jsxs)(W.a,{row:!0,children:[Object(x.jsx)(T.a,{label:"Ketchup",control:Object(x.jsx)(S.a,{name:"sauces",component:k.Checkbox,type:"checkbox",value:"ketchup"})}),Object(x.jsx)(T.a,{label:"Mustard",control:Object(x.jsx)(S.a,{name:"sauces",component:k.Checkbox,type:"checkbox",value:"mustard"})}),Object(x.jsx)(T.a,{label:"Salsa",control:Object(x.jsx)(S.a,{name:"sauces",component:k.Checkbox,type:"checkbox",value:"salsa"})}),Object(x.jsx)(T.a,{label:"Guacamole \ud83e\udd51",control:Object(x.jsx)(S.a,{name:"sauces",component:k.Checkbox,type:"checkbox",value:"guacamole"})})]})]})}),Object(x.jsx)(N.a,{item:!0,xs:12,children:Object(x.jsx)(S.a,{fullWidth:!0,name:"notes",component:k.TextField,multiline:!0,label:"Notes"})}),Object(x.jsx)(N.a,{item:!0,xs:12,children:Object(x.jsxs)(S.a,{fullWidth:!0,name:"city",component:k.Select,label:"Select a City",formControlProps:{fullWidth:!0},children:[Object(x.jsx)(B.a,{value:"London",children:"London"}),Object(x.jsx)(B.a,{value:"Paris",children:"Paris"}),Object(x.jsx)(B.a,{value:"Budapest",children:"A city with a very long Name"})]})}),Object(x.jsxs)(F.a,{utils:L.a,children:[Object(x.jsx)(N.a,{item:!0,xs:6,children:Object(x.jsx)(S.a,{name:"rendez-vous",component:e,fullWidth:!0,margin:"normal",label:"Rendez-vous"})}),Object(x.jsx)(N.a,{item:!0,xs:6,children:Object(x.jsx)(S.a,{name:"alarm",component:t,fullWidth:!0,margin:"normal",label:"Alarm"})})]}),Object(x.jsx)(N.a,{item:!0,style:{marginTop:16},children:Object(x.jsx)(d.a,{type:"button",variant:"contained",onClick:c,disabled:r||o,children:"Reset"})}),Object(x.jsx)(N.a,{item:!0,style:{marginTop:16},children:Object(x.jsx)(d.a,{variant:"contained",color:"primary",type:"submit",disabled:r,children:"Submit"})})]})}),Object(x.jsx)("pre",{children:JSON.stringify(i,0,2)})]})}})]})})},U=a(92),q=(a(168),a(99)),D=a(131),J=a.n(D);var _=function(){var e=Object(n.useState)(),t=Object(U.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)(),o=Object(U.a)(r,2),i=o[0],s=o[1],l=Object(n.useState)(),j=Object(U.a)(l,2),b=(j[0],j[1],function(){var e=Object(g.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={username:a,password:i},e.next=3,J.a.post("http://34.95.255.198/index.php/login",t);case 3:n=e.sent,console.log(n.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());return Object(x.jsxs)("div",{className:"App",children:[Object(x.jsx)("div",{className:"column",children:Object(x.jsx)("img",{width:"70%",height:"70%",alt:"Logo Ufba",src:"https://www.ufba.br/sites/portal.ufba.br/files/brasao_ufba.jpg"})}),Object(x.jsxs)("form",{className:"column",children:[Object(x.jsx)("h1",{children:"ACESSO AO SISTEMA"}),Object(x.jsx)("h2",{children:"Usu\xe1rio:"}),Object(x.jsx)("div",{children:Object(x.jsx)(q.a,{onChange:function(e){return c(e.target.value)},label:"Usu\xe1rio"})}),Object(x.jsx)("h2",{children:"Senha:"}),Object(x.jsx)("div",{children:Object(x.jsx)(q.a,{onChange:function(e){return s(e.target.value)},label:"Senha"})}),Object(x.jsx)(d.a,{onClick:function(){a&&i?b():alert("Preencha todos os dados")},children:"LOGIN"})]})]})},G=function(){return Object(x.jsxs)(s.a,{children:[Object(x.jsx)(l.a,{component:p,path:"/",exact:!0}),Object(x.jsx)(l.a,{component:I,path:"/banca/criar"}),Object(x.jsx)(l.a,{component:_,path:"/login",exact:!0})]})};a(189);var V=function(){return Object(x.jsx)("div",{className:"header",bg:"light",expand:"lg",children:Object(x.jsx)("h1",{className:"logo",children:"moon"})})};a(190);var z=function(){return Object(x.jsxs)("div",{className:"footer",bg:"light",expand:"lg",fixed:"bottom",children:[Object(x.jsxs)("div",{children:[Object(x.jsx)("strong",{children:"INSTITUTO DE COMPUTA\xc7\xc3O"}),Object(x.jsx)("p",{children:"Avenida Adhemar de Barros, s/n - Campus de Ondina"}),Object(x.jsx)("p",{children:"CEP: 40.170-110 Salvador-Bahia Telefone: 3283-6164"})]}),Object(x.jsx)("img",{src:"https://dcc.ufba.br/sites/computacao.ufba.br/files/logos_ufba.png",alt:"Logos IC"})]})};var H=function(){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(V,{}),Object(x.jsx)(G,{}),Object(x.jsx)(z,{})]})},K=a(91),Q=a(135),X=Object(Q.a)({palette:{type:"light",primary:{main:"#61dafb",light:"#61dafb",dark:"#21a1c4"},secondary:{main:"#b5ecfb",light:"#61dafb",dark:"#21a1c4"},error:{main:K.a.A400},background:{default:"#282c34"}},overrides:{MuiPaper:{root:{padding:"20px 10px",margin:"10px",backgroundColor:"#fff"}},MuiButton:{root:{margin:"5px"}}}});r.a.render(Object(x.jsxs)(i.a,{theme:X,children:[Object(x.jsx)(o.a,{}),Object(x.jsx)(H,{})]}),document.getElementById("root"))}},[[191,1,2]]]);
//# sourceMappingURL=main.02d0826d.chunk.js.map