import{a as f}from"./chunk-MHC5V2XS.js";import{c as m}from"./chunk-KXHZWQ3K.js";import{s as u}from"./chunk-ZXV3WCDO.js";import{Ca as p,Da as d,Ea as l,M as a,ab as h,ea as n,fa as c,qc as g,rc as v,ua as s}from"./chunk-QPT26XIT.js";import{j as i}from"./chunk-DTJZBUUZ.js";var E=(()=>{let e=class e{constructor(o){this.apiService=o,this.xAPI={funcion:"",parametros:"",valores:{}},this.data={labels:[""],datasets:[{label:"Reporte por Actuaci\xF3n",backgroundColor:["#41B883","#7D3C98","#00D8FF","#DD1B16","#F7DC6F","#626567","#F5B7B1","#1B4F72","#D35400 ","#E74C3C "],borderColor:"rgba(220, 220, 220, 1)",pointBackgroundColor:"rgba(220, 220, 220, 1)",pointBorderColor:"#fff",data:[0]}]}}ngOnInit(){return i(this,null,function*(){yield this.ReporteActuacion()})}ReporteActuacion(){return i(this,null,function*(){this.xAPI.funcion="MPPRE_R_ReporteActuacion",this.xAPI.parametros="",this.xAPI.valores="",yield this.apiService.Ejecutar(this.xAPI).subscribe({next:o=>{o.Cuerpo.map(t=>{console.log(t),this.data.labels.push(t.tramite),this.data.datasets[0].data.push(t.numero_registros)})},error:o=>{console.log(o)}})})}};e.\u0275fac=function(t){return new(t||e)(c(m))},e.\u0275cmp=a({type:e,selectors:[["app-action-report"]],standalone:!0,features:[h],decls:3,vars:1,consts:[[1,"my-4"],["type","bar",3,"data"]],template:function(t,C){t&1&&(p(0,"c-card",0)(1,"c-card-body"),l(2,"c-chart",1),d()()),t&2&&(n(2),s("data",C.data))},dependencies:[f,u,g,v],styles:[`@charset "UTF-8";.chartjs-tooltip[_ngcontent-%COMP%]{--cui-chartjs-tooltip-zindex: 1080;--cui-chartjs-tooltip-padding-x: .5rem;--cui-chartjs-tooltip-padding-y: .25rem;--cui-chartjs-tooltip-color: var(--cui-body-bg);--cui-chartjs-tooltip-bg: rgba(var(--cui-emphasis-color-rgb), .8);--cui-chartjs-tooltip-border-radius: var(--cui-border-radius);--cui-chartjs-tooltip-transition: all .15s ease;--cui-chartjs-tooltip-header-margin: .5rem;--cui-chartjs-tooltip-header-font-size: .875rem;--cui-chartjs-tooltip-header-font-weight: 700;--cui-chartjs-tooltip-body-font-size: .875rem;--cui-chartjs-tooltip-body-font-weight: 400;position:absolute;z-index:var(--cui-chartjs-tooltip-zindex);padding:var(--cui-chartjs-tooltip-padding-y) var(--cui-chartjs-tooltip-padding-x);color:var(--cui-chartjs-tooltip-color);pointer-events:none;background:var(--cui-chartjs-tooltip-bg);opacity:0;transform:translate(-50%);border-radius:var(--cui-chartjs-tooltip-border-radius);transition:var(--cui-chartjs-tooltip-transition)}@media (prefers-reduced-motion: reduce){.chartjs-tooltip[_ngcontent-%COMP%]{transition:none}}.chartjs-tooltip-header[_ngcontent-%COMP%]{margin-bottom:var(--cui-chartjs-tooltip-header-margin)}.chartjs-tooltip-header-item[_ngcontent-%COMP%]{font-size:var(--cui-chartjs-tooltip-header-font-size);font-weight:var(--cui-chartjs-tooltip-header-font-weight)}.chartjs-tooltip-body-item[_ngcontent-%COMP%]{align-items:center;font-size:var(--cui-chartjs-tooltip-body-font-size);font-weight:var(--cui-chartjs-tooltip-body-font-weight);white-space:nowrap}







`]});let r=e;return r})();export{E as ActionReportComponent};