import{aj as N}from"./prng-Ctsbd0_6.js";const I=5;function G(l){return{pointLightPos:{value:Array.from({length:l},()=>new N)},pointLightColor:{value:Array.from({length:l},()=>new N)},pointLightCount:{value:0},pointLightNight:{value:0},pointLightShade:{value:0},pointLightFar:{value:0}}}let P=null,k=null;function F(l,o){P=l,k=o}const T=1.15;function H(l){const o=P,c=k;if(!o||!c)return!1;const h=o.pointLightPos.value.length;return l.defines={...l.defines,MAX_POINT_LIGHTS:String(h)},l.customProgramCacheKey=()=>`characterLit${h}`,l.onBeforeCompile=n=>{n.uniforms.pointLightPos=o.pointLightPos,n.uniforms.pointLightColor=o.pointLightColor,n.uniforms.pointLightCount=o.pointLightCount,n.uniforms.pointLightNight=o.pointLightNight,n.uniforms.pointLightShade=o.pointLightShade,n.uniforms.charSunColor=o.sunColor,n.uniforms.charSkyAmbient=o.skyAmbient,n.uniforms.charGroundAmbient=o.groundAmbient,n.uniforms.charFillLight=o.fillLight,n.uniforms.charCaveAmbient=o.caveAmbient,n.uniforms.charSunDirection={value:c},n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vPlWorld;
varying vec3 vPlNormal;`).replace("#include <project_vertex>",`#include <project_vertex>
vPlWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
#ifdef USE_SKINNING
vPlNormal = normalize(mat3(modelMatrix) * objectNormal);
#else
vPlNormal = normalize(mat3(modelMatrix) * normal);
#endif`),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vPlWorld;
varying vec3 vPlNormal;
uniform vec4 pointLightPos[MAX_POINT_LIGHTS];
uniform vec4 pointLightColor[MAX_POINT_LIGHTS];
uniform int pointLightCount;
uniform float pointLightNight;
uniform float pointLightShade;
uniform vec3 charSunColor;
uniform vec3 charSkyAmbient;
uniform vec3 charGroundAmbient;
uniform float charFillLight;
uniform float charCaveAmbient;
uniform vec3 charSunDirection;`).replace("#include <opaque_fragment>",`vec3 plNormal = normalize(vPlNormal);
float plFacing = dot(plNormal, charSunDirection);
float plDark = pointLightShade;
vec3 plAmbient = (mix(charGroundAmbient, charSkyAmbient, plNormal.y * 0.5 + 0.5) + charFillLight * (plFacing * 0.5 + 0.5)) * mix(1.0, charCaveAmbient, plDark);
vec3 plDirect = charSunColor * max(plFacing, 0.0) * (1.0 - plDark);
vec3 plSum = vec3(0.0);
for (int i = 0; i < MAX_POINT_LIGHTS; i++) {
  if (i >= pointLightCount) break;
  vec4 lp = pointLightPos[i];
  vec3 toLight = lp.xyz - vPlWorld;
  float dist = length(toLight);
  if (dist >= lp.w) continue;
  vec4 lc = pointLightColor[i];
  float shine = lc.w > 0.5 ? pointLightNight : max(max(plDark, pointLightNight), 0.12);
  float reach = 1.0 - dist / lp.w;
  plSum += lc.rgb * (reach * reach * reach * (0.3 + 0.7 * max(dot(plNormal, toLight / max(dist, 0.001)), 0.0)) * shine);
}
// The terrain multiplies display colours by its light; these colours are linear and converted to display
// colours on the way out, which would lift every dim value. Raising the light to the display gamma first
// makes a character exactly as dark as the ground beside it.
vec3 plLight = (plAmbient + plDirect) * ${T.toFixed(2)} + (vec3(1.0) - exp(-plSum));
outgoingLight = diffuseColor.rgb * pow(max(plLight, vec3(0.0)), vec3(2.2));
#include <opaque_fragment>`)},l.needsUpdate=!0,!0}class B{constructor(o,c,h,n,m){this.vpm=c,this.uniforms=h,this.max=n,this.reach=m,this.cutoff=m;for(const f of o.defs){const e=f?.light;!f||!e||(this.byBlock[f.id]={radius:e.radius*c,r:e.color[0],g:e.color[1],b:e.color[2],intensity:e.intensity,flicker:Math.min(1,Math.max(0,e.flicker??0)),night:e.night?1:0})}}byBlock=[];candidates=[];pool=[];cutoff;count=0;darkAt=null;update(o,c,h,n,m,f=0){const e=this.candidates;e.length=0;const S=this.reach,b=this.pool,A=(i,t,r,s,d,v,L,x,u,p)=>{let a=b[e.length];a||b.push(a={d:0,x:0,y:0,z:0,radius:0,r:0,g:0,b:0,intensity:0,night:0}),a.d=i,a.x=t,a.y=r,a.z=s,a.radius=d,a.r=v,a.g=L,a.b=x,a.intensity=u,a.night=p,e.push(a)};for(const i of h)for(let t=0;t<i.length;t+=I){const r=this.byBlock[i[t+3]];if(!r||r.night&&m<=.001)continue;const s=i[t]-o.x,d=i[t+1]-o.y,v=i[t+2]-o.z,L=Math.sqrt(s*s+d*d+v*v)-r.radius*.5;if(L>S)continue;const x=Math.min(2,1+Math.log2(i[t+4])*.08);let u=r.intensity*x;if(!(r.night&&this.darkAt&&(u*=1-this.darkAt(i[t],i[t+2]),u<=.001))){if(r.flicker>0){const p=i[t]*.37+i[t+2]*.61,a=Math.sin(c*11+p)*.5+Math.sin(c*23.7+p*2.3)*.3+Math.sin(c*5.3+p*.7)*.2;u*=1-r.flicker*.35*(.5+.5*a)}A(L,i[t],i[t+1],i[t+2],r.radius*x,r.r,r.g,r.b,u,r.night)}}for(const i of n){const t=Math.hypot(i.x-o.x,i.y-o.y,i.z-o.z);A(t-1e6,i.x,i.y,i.z,i.radius,i.color.r,i.color.g,i.color.b,i.intensity,0)}e.sort((i,t)=>i.d-t.d);const C=e.length>this.max?Math.max(4*this.vpm,e[this.max].d):S;this.cutoff+=(C-this.cutoff)*(C<this.cutoff?.35:.08);const M=Math.min(this.max,e.length),z=this.uniforms.pointLightPos.value,_=this.uniforms.pointLightColor.value;let g=0,y=0;for(let i=0;i<M;i++){const t=e[i],r=t.d<-1e5?1:1-w(this.cutoff*.7,this.cutoff,t.d);if(r<=.001)continue;y=Math.max(y,Math.hypot(t.x-o.x,t.y-o.y,t.z-o.z)+t.radius),z[g].set(t.x,t.y,t.z,t.radius);const s=t.intensity*r;_[g].set(t.r*s,t.g*s,t.b*s,t.night),g++}this.uniforms.pointLightCount.value=g,this.uniforms.pointLightFar.value=y,this.uniforms.pointLightNight.value=m,this.uniforms.pointLightShade.value=f,this.count=g}}function w(l,o,c){const h=Math.min(1,Math.max(0,(c-l)/(o-l)));return h*h*(3-2*h)}export{I as L,B as P,G as c,H as l,F as s};
