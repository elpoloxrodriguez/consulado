import{a as C}from"./chunk-MHC5V2XS.js";import{c as v}from"./chunk-EB3BIPWW.js";import{s as g}from"./chunk-ZXV3WCDO.js";import{Ca as p,Da as d,Ea as l,M as a,ab as h,bb as u,ea as n,fa as c,qc as f,rc as j,ua as s,xb as m}from"./chunk-QPT26XIT.js";import{j as r}from"./chunk-DTJZBUUZ.js";var y=()=>({"marginTop.px":40}),L=(()=>{let e=class e{constructor(t){this.apiService=t,this.xAPI={funcion:"",parametros:"",valores:{}},this.data={labels:[""],datasets:[{backgroundColor:["#41B883","#7D3C98","#00D8FF","#DD1B16","#F7DC6F","#626567"],data:[null]}]}}ngOnInit(){return r(this,null,function*(){yield this.ReporteEscritorio()})}ReporteEscritorio(){return r(this,null,function*(){this.xAPI.funcion="MPPRE_R_ReporteEscritorio",this.xAPI.parametros="",this.xAPI.valores="",yield this.apiService.Ejecutar(this.xAPI).subscribe({next:t=>{t.Cuerpo.map(o=>{console.log(o),this.data.labels.push(o.departamento),this.data.datasets[0].data.push(o.numero_oficinas)})},error:t=>{console.log(t)}})})}handleChartRef(t){t?.update()}};e.\u0275fac=function(o){return new(o||e)(c(v))},e.\u0275cmp=a({type:e,selectors:[["app-desktop-report"]],standalone:!0,features:[h],decls:3,vars:4,consts:[[1,"my-4"],["type","pie",3,"data","height","ngStyle"]],template:function(o,b){o&1&&(p(0,"c-card",0)(1,"c-card-body"),l(2,"c-chart",1),d()()),o&2&&(n(2),s("data",b.data)("height",600)("ngStyle",u(3,y)))},dependencies:[C,m,g,f,j],styles:[`@charset "UTF-8";.chartjs-tooltip[_ngcontent-%COMP%]{--cui-chartjs-tooltip-zindex: 1080;--cui-chartjs-tooltip-padding-x: .5rem;--cui-chartjs-tooltip-padding-y: .25rem;--cui-chartjs-tooltip-color: var(--cui-body-bg);--cui-chartjs-tooltip-bg: rgba(var(--cui-emphasis-color-rgb), .8);--cui-chartjs-tooltip-border-radius: var(--cui-border-radius);--cui-chartjs-tooltip-transition: all .15s ease;--cui-chartjs-tooltip-header-margin: .5rem;--cui-chartjs-tooltip-header-font-size: .875rem;--cui-chartjs-tooltip-header-font-weight: 700;--cui-chartjs-tooltip-body-font-size: .875rem;--cui-chartjs-tooltip-body-font-weight: 400;position:absolute;z-index:var(--cui-chartjs-tooltip-zindex);padding:var(--cui-chartjs-tooltip-padding-y) var(--cui-chartjs-tooltip-padding-x);color:var(--cui-chartjs-tooltip-color);pointer-events:none;background:var(--cui-chartjs-tooltip-bg);opacity:0;transform:translate(-50%);border-radius:var(--cui-chartjs-tooltip-border-radius);transition:var(--cui-chartjs-tooltip-transition)}@media (prefers-reduced-motion: reduce){.chartjs-tooltip[_ngcontent-%COMP%]{transition:none}}.chartjs-tooltip-header[_ngcontent-%COMP%]{margin-bottom:var(--cui-chartjs-tooltip-header-margin)}.chartjs-tooltip-header-item[_ngcontent-%COMP%]{font-size:var(--cui-chartjs-tooltip-header-font-size);font-weight:var(--cui-chartjs-tooltip-header-font-weight)}.chartjs-tooltip-body-item[_ngcontent-%COMP%]{align-items:center;font-size:var(--cui-chartjs-tooltip-body-font-size);font-weight:var(--cui-chartjs-tooltip-body-font-weight);white-space:nowrap}







`]});let i=e;return i})();export{L as DesktopReportComponent};