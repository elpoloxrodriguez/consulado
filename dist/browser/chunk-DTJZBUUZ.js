var q=Object.create;var j=Object.defineProperty,r=Object.defineProperties,s=Object.getOwnPropertyDescriptor,t=Object.getOwnPropertyDescriptors,u=Object.getOwnPropertyNames,g=Object.getOwnPropertySymbols,v=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;var m=(a,b,c)=>b in a?j(a,b,{enumerable:!0,configurable:!0,writable:!0,value:c}):a[b]=c,x=(a,b)=>{for(var c in b||={})k.call(b,c)&&m(a,c,b[c]);if(g)for(var c of g(b))n.call(b,c)&&m(a,c,b[c]);return a},y=(a,b)=>r(a,t(b));var z=(a,b)=>{var c={};for(var d in a)k.call(a,d)&&b.indexOf(d)<0&&(c[d]=a[d]);if(a!=null&&g)for(var d of g(a))b.indexOf(d)<0&&n.call(a,d)&&(c[d]=a[d]);return c};var A=(a,b)=>()=>(b||a((b={exports:{}}).exports,b),b.exports);var w=(a,b,c,d)=>{if(b&&typeof b=="object"||typeof b=="function")for(let e of u(b))!k.call(a,e)&&e!==c&&j(a,e,{get:()=>b[e],enumerable:!(d=s(b,e))||d.enumerable});return a};var B=(a,b,c)=>(c=a!=null?q(v(a)):{},w(b||!a||!a.__esModule?j(c,"default",{value:a,enumerable:!0}):c,a));var l=(a,b,c)=>{if(!b.has(a))throw TypeError("Cannot "+c)};var C=(a,b,c)=>(l(a,b,"read from private field"),c?c.call(a):b.get(a)),D=(a,b,c)=>{if(b.has(a))throw TypeError("Cannot add the same private member more than once");b instanceof WeakSet?b.add(a):b.set(a,c)},E=(a,b,c,d)=>(l(a,b,"write to private field"),d?d.call(a,c):b.set(a,c),c);var F=(a,b,c)=>(l(a,b,"access private method"),c);var G=(a,b,c)=>new Promise((d,e)=>{var o=f=>{try{h(c.next(f))}catch(i){e(i)}},p=f=>{try{h(c.throw(f))}catch(i){e(i)}},h=f=>f.done?d(f.value):Promise.resolve(f.value).then(o,p);h((c=c.apply(a,b)).next())});export{x as a,y as b,z as c,A as d,B as e,C as f,D as g,E as h,F as i,G as j};
