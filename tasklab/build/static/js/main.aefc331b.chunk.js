(this.webpackJsonptasklab=this.webpackJsonptasklab||[]).push([[0],{23:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n(0),r=n.n(s),c=n(9),o=n.n(c),i=(n(22),n(23),n(24),n(14)),l=n(10),u=n(11),h=n(12),b=n(16),d=n(15),m=(n(25),function(e){Object(b.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).handleInputChange=function(e){var t=e.target,n=t.value,s=t.name;a.setState(Object(l.a)({},s,n))},a.onSubmit=function(e){e.preventDefault(),fetch("/api/login",{method:"POST",body:JSON.stringify(a.state),headers:{"Content-Type":"application/json"}}).then((function(e){if(200!==e.status)throw new Error(e.error);console.log("Logged in")})).catch((function(e){console.log(e),alert("Error logging in. Please try again.")}))},a.state={email:"",password:""},a}return Object(h.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{className:"text-center",children:Object(a.jsxs)("form",{className:"form-signin",onSubmit:this.onSubmit,children:[Object(a.jsx)("h1",{className:"h3 mb-3",children:"Login Below!"}),Object(a.jsx)("input",{type:"email",name:"email",placeholder:"Enter email",value:this.state.email,onChange:this.handleInputChange,className:"form-control",required:!0,autoFocus:!0}),Object(a.jsx)("input",{type:"password",name:"password",placeholder:"Enter password",value:this.state.password,onChange:this.handleInputChange,className:"form-control",required:!0}),Object(a.jsx)("button",{className:"btn btn-lg btn-primary btn-block",type:"submit",children:"Log in"})]})})}}]),n}(s.Component));var j=function(){return Object(a.jsx)(i.a,{children:Object(a.jsx)("div",{className:"App",children:Object(a.jsx)("div",{className:"container d-flex align-items-center flex-column",children:Object(a.jsx)(m,{})})})})};o.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(j,{})}),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.aefc331b.chunk.js.map