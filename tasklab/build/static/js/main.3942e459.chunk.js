(this.webpackJsonptasklab=this.webpackJsonptasklab||[]).push([[0],{27:function(e,t,n){},28:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var a=n(1),i=n(0),c=n.n(i),r=n(15),s=n.n(r),o=(n(27),n(28),n(11)),l=n(2),h=n(16),j=n(17),u=n(18),d=n(21),b=n(20),p=function(e){Object(d.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(j.a)(this,n),(a=t.call(this,e)).handleInputChange=function(e){var t=e.target,n=t.value,i=t.name;a.setState(Object(h.a)({},i,n))},a.onSubmit=function(e){e.preventDefault(),fetch("/api/login",{method:"POST",body:JSON.stringify(a.state),headers:{"Content-Type":"application/json"}}).then((function(e){if(200!==e.status)throw new Error(e.error);console.log("Logged in")})).catch((function(e){console.log(e),alert("Error logging in. Please try again.")}))},a.state={email:"",password:""},a}return Object(u.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("form",{onSubmit:this.onSubmit,children:[Object(a.jsx)("h1",{children:"Login Below!"}),Object(a.jsx)("input",{type:"email",name:"email",placeholder:"Enter email",value:this.state.email,onChange:this.handleInputChange,required:!0}),Object(a.jsx)("input",{type:"password",name:"password",placeholder:"Enter password",value:this.state.password,onChange:this.handleInputChange,required:!0}),Object(a.jsx)("input",{type:"submit",value:"Submit"})]})}}]),n}(i.Component);var O=function(){return Object(a.jsx)(o.a,{children:Object(a.jsx)("div",{className:"App",children:Object(a.jsxs)("div",{className:"container d-flex align-items-center flex-column",children:[Object(a.jsx)("nav",{children:Object(a.jsx)("ul",{children:Object(a.jsx)("li",{children:Object(a.jsx)(o.b,{to:"/login",children:"Login"})})})}),Object(a.jsx)(l.c,{children:Object(a.jsx)(l.a,{path:"/login",children:Object(a.jsx)(p,{})})})]})})})};s.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(O,{})}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.3942e459.chunk.js.map