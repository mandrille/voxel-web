import{A as S}from"./farm-kit-CImJZWVA.js";import{I as te,B as se,r as C,k as ie,t as ne,V as K,M as ae,G as oe,C as E,o as re,T as le,a6 as ce,K as he,d as de,g as ue,a1 as z,p as F}from"./prng-CP9PUKUa.js";const fe=[{type:"hills",baseHeight:40,amplitude:40,scale:300,octaves:5,lacunarity:2,gain:.4,contrast:.55,regionScale:900,plainsRelief:.1,roughness:.1,roughnessScale:4,mountainScale:2600,mountainCoverage:.3,mountainHeight:230,ridgeScale:520,snowHeight:150,soilDepth:1.2,rockSlope:.35,bedrockDepth:120,dryPatches:.2,dryScale:28,lakes:{spacing:260,chance:.5,radius:[18,45],margin:.4,depth:3,maxRise:6,bank:.6,shore:.35}},{type:"ores",ores:[{block:"copper_ore",spacing:9,chance:.5,depth:[.5,8],radius:[.5,1.1]},{block:"iron_ore",spacing:12,chance:.45,depth:[3,20],radius:[.5,1.2]},{block:"silver_ore",spacing:16,chance:.35,depth:[10,40],radius:[.4,1]},{block:"gold_ore",spacing:22,chance:.3,depth:[20,60],radius:[.4,.9]},{block:"diamond_ore",spacing:30,chance:.25,depth:[40,100],radius:[.3,.7]}],flatten:.55},{type:"buildings",siteSpacing:70,chance:.5,maxRise:1.6,apron:1,bank:2,bays:[3,4],storeyWeights:[1,2,1],tints:4,village:{spacing:420,chance:.9,maxRise:5,plaza:[16,22],roads:[3,4],roadWidth:3.2,roadLength:[24,38],gap:1.5,lampSpacing:11,bays:[3,4],storeyWeights:[2,3,1],tints:4,startDistance:[110,300]}},{type:"vegetation",treeSpecies:["olive","almond","carob"],speciesProfiles:{almond:{height:[4.5,7],trunk:[.16,.28],crown:[2.2,3.3]},carob:{height:[5,8],trunk:[.5,.85],crown:[2.8,4]}},grassCover:.3,grassHeight:[.12,.5],grassPatchScale:3.5,lushScale:60,lushRange:[.3,1.2],dryGrassShare:.2,flowerChance:.012,flowerPatchScale:14,treeSpacing:10,forestScale:260,treeChance:[.05,.75],bushShare:.3,treeHeight:[5,9],canopyRadius:[2.4,3.8],trunkRadius:[.45,.8],treeScale:[.8,1.4],giantChance:.12,giantScale:[1.6,2.2]}],je={stages:fe},X=6,m=1<<X,D=m-1,Ke=m*m*m,A=m+2,Xe=A*A*A;function Ze(n){return Math.floor(n)>>X}function $e(n){return Math.floor(n)&D}function Je(n,e,t){return n+m*(t+m*e)}function Qe(n,e,t){return n+A*(t+A*e)}const O=1<<21,Z=128,V=22,$=8,G=1<<$,me=2**(V+$);function B(n,e,t){return(n+O)*me+(t+O)*G+(e+Z)}function ge(n,e={cx:0,cy:0,cz:0}){const t=n%G,s=(n-t)/G,a=s%(1<<V);return e.cy=t-Z,e.cz=a-O,e.cx=(s-a)/(1<<V)-O,e}function et(n){return B(n.cx,n.cy,n.cz)}const U=256;class I{constructor(e,t,s,a){this.sx=e,this.sy=t,this.sz=s;for(const i of[e,t,s])if(!Number.isInteger(i)||i<1||i>U)throw new Error(`model sides must be whole numbers from 1 to ${U}`);if(this.data=a??new Uint8Array(e*t*s),this.data.length!==e*t*s)throw new Error("model data does not match its size")}data;static fromCells(e){const t=[...e].filter(l=>l[3]!==S);if(t.length===0)return{model:new I(1,1,1),cropped:!1};const s=[1/0,1/0,1/0],a=[-1/0,-1/0,-1/0];for(const l of t)for(let c=0;c<3;c++)l[c]<s[c]&&(s[c]=l[c]),l[c]>a[c]&&(a[c]=l[c]);const i=[0,1,2].map(l=>Math.min(U,a[l]-s[l]+1)),o=new I(i[0],i[1],i[2]);let r=!1;for(const[l,c,d,h]of t)!o.set(l-s[0],c-s[1],d-s[2],h)&&!o.inBounds(l-s[0],c-s[1],d-s[2])&&(r=!0);return{model:o,cropped:r}}index(e,t,s){return e+this.sx*(s+this.sz*t)}inBounds(e,t,s){return e>=0&&t>=0&&s>=0&&e<this.sx&&t<this.sy&&s<this.sz}get(e,t,s){return this.inBounds(e,t,s)?this.data[this.index(e,t,s)]:S}set(e,t,s,a){if(!this.inBounds(e,t,s))return!1;const i=this.index(e,t,s);return this.data[i]===a?!1:(this.data[i]=a,!0)}clone(){return new I(this.sx,this.sy,this.sz,this.data.slice())}count(){let e=0;for(let t=0;t<this.data.length;t++)this.data[t]!==S&&e++;return e}bounds(){const e=[1/0,1/0,1/0],t=[-1/0,-1/0,-1/0];for(let s=0;s<this.sy;s++)for(let a=0;a<this.sz;a++)for(let i=0;i<this.sx;i++)this.data[this.index(i,s,a)]!==S&&(e[0]=Math.min(e[0],i),e[1]=Math.min(e[1],s),e[2]=Math.min(e[2],a),t[0]=Math.max(t[0],i),t[1]=Math.max(t[1],s),t[2]=Math.max(t[2],a));return e[0]===1/0?null:{min:e,max:t}}resized(e,t,s){const a=new I(e,t,s),i=Math.floor((e-this.sx)/2),o=Math.floor((s-this.sz)/2);for(let r=0;r<Math.min(this.sy,t);r++)for(let l=0;l<this.sz;l++)for(let c=0;c<this.sx;c++){const d=this.data[this.index(c,r,l)];d!==S&&a.set(c+i,r,l+o,d)}return a}rotatedY(){const e=new I(this.sz,this.sy,this.sx);for(let t=0;t<this.sy;t++)for(let s=0;s<this.sz;s++)for(let a=0;a<this.sx;a++)e.data[e.index(s,t,this.sx-1-a)]=this.data[this.index(a,t,s)];return e}mirrored(e){const t=new I(this.sx,this.sy,this.sz);for(let s=0;s<this.sy;s++)for(let a=0;a<this.sz;a++)for(let i=0;i<this.sx;i++){const o=e==="x"?this.sx-1-i:i,r=e==="y"?this.sy-1-s:s,l=e==="z"?this.sz-1-a:a;t.data[t.index(o,r,l)]=this.data[this.index(i,s,a)]}return t}}function tt(n,e,t,s,a,i,o,r){const l=Math.sqrt(s*s+a*a+i*i);if(!(l>0))return null;s/=l,a/=l,i/=l;let c=Math.floor(n),d=Math.floor(e),h=Math.floor(t);if(r(c,d,h))return{x:c,y:d,z:h,nx:0,ny:0,nz:0,distance:0};const f=s>0?1:s<0?-1:0,u=a>0?1:a<0?-1:0,g=i>0?1:i<0?-1:0,y=f!==0?Math.abs(1/s):Number.POSITIVE_INFINITY,x=u!==0?Math.abs(1/a):Number.POSITIVE_INFINITY,M=g!==0?Math.abs(1/i):Number.POSITIVE_INFINITY;let b=f>0?(c+1-n)/s:f<0?(n-c)/-s:Number.POSITIVE_INFINITY,w=u>0?(d+1-e)/a:u<0?(e-d)/-a:Number.POSITIVE_INFINITY,p=g>0?(h+1-t)/i:g<0?(t-h)/-i:Number.POSITIVE_INFINITY;for(;;)if(b<=w&&b<=p){if(b>o)return null;c+=f;const v=b;if(b+=y,r(c,d,h))return{x:c,y:d,z:h,nx:-f,ny:0,nz:0,distance:v}}else if(w<=p){if(w>o)return null;d+=u;const v=w;if(w+=x,r(c,d,h))return{x:c,y:d,z:h,nx:0,ny:-u,nz:0,distance:v}}else{if(p>o)return null;h+=g;const v=p;if(p+=M,r(c,d,h))return{x:c,y:d,z:h,nx:0,ny:0,nz:-g,distance:v}}}const pe=8,ve=2;function we(n,e){const t=[];let s=n;for(let a=1;s<e&&a<=pe;a++){s*=2;const i=m*ve<<a-1,o=Math.min(i,1<<a<<(a>=3?1:0));t.push({level:a,cellSize:o,cells:i/o,tileSize:i,radius:s})}return t}const ye=4;function st(n,e){return n<e?2:n<e*ye?1:0}function it(n){const e=n.world.voxelsPerMeter;if(!(e>0)||!Number.isFinite(e))throw new Error("settings.world.voxelsPerMeter must be a positive number");if(!(n.world.nearDistance>0))throw new Error("settings.world.nearDistance must be positive");const t=n.world.nearDistance*e,s=Math.max(n.world.viewDistance,n.world.nearDistance)*e,a=we(t,s),i=a.length>0?a[a.length-1].radius:t,o=n.render,r=n.player,l=Math.max(0,Math.min(o.grassDistance*e,a.length>0?a[0].radius:Number.POSITIVE_INFINITY));return{voxelsPerMeter:e,world:{nearRadius:Math.max(1,Math.ceil(t/m)),nearDistance:t,unloadMargin:n.world.unloadMargin},lod:a,render:{fov:o.fov,near:o.near*e,far:Math.max(i,s)*1.15,viewDistance:s,antialias:o.antialias,shadows:o.shadows,shadowDistance:o.shadowDistance*e,shadowMapSize:o.shadowMapSize,fogDistance:o.fogDistance*e,fogHeight:o.fogHeight*e,fogBase:o.fogBase*e,plantFadeStart:l*.65,plantFadeEnd:l,lodFadeMs:Math.max(0,o.lodFadeSeconds*1e3),textureSize:o.textureMeters*e,dayMinutes:Math.max(0,o.dayMinutes),startHour:(o.startHour%24+24)%24,uploadBytesPerFrame:o.uploadBytesPerFrame,dispatchMsPerFrame:o.dispatchMsPerFrame,maxWorkers:o.maxWorkers,jobsPerWorker:o.jobsPerWorker,treeDetailDistance:o.treeDetailDistance*e,houseDetailDistance:o.houseDetailDistance*e},player:{walkSpeed:r.walkSpeed*e,sprintMultiplier:r.sprintMultiplier,flySpeed:r.flySpeed*e,jumpSpeed:r.jumpSpeed*e,gravity:r.gravity*e,eyeHeight:r.eyeHeight*e,width:r.width*e,height:r.height*e,stepHeight:r.stepHeight*e,digRadius:r.digRadius*e,mouseSensitivity:r.mouseSensitivity,crouchHeight:r.crouchHeight*e,crouchEyeHeight:r.crouchEyeHeight*e,crouchSpeed:r.crouchSpeed,swimSpeed:r.swimSpeed*e},water:Me(n.water,e),fire:xe(n.fire,e),wind:Se(n.wind,e),weather:be(n.weather,e)}}function be(n,e){return{spellSeconds:Math.max(10,n.spellMinutes*60),rainChance:Math.min(1,Math.max(0,n.rainChance)),stormChance:Math.min(1,Math.max(0,n.stormChance)),rampSeconds:Math.max(1,n.rampSeconds),rainDrops:Math.max(0,Math.round(n.rainDrops)),dropSpeed:Math.max(.1,n.dropSpeed)*e,dropLength:Math.max(.05,n.dropLength)*e,area:Math.max(2,n.area)*e,rainWind:Math.max(0,n.rainWind),stormWind:Math.max(0,n.stormWind),gloom:Math.min(1,Math.max(0,n.gloom)),stormGloom:Math.min(1,Math.max(0,n.stormGloom)),fogRain:Math.min(1,Math.max(.05,n.fogRain)),flashEverySeconds:Math.max(1,n.flashEverySeconds)}}function Se(n,e){return{direction:(n.direction%360+360)%360,strength:Math.max(0,n.strength),gustiness:Math.min(1,Math.max(0,n.gustiness)),gustSeconds:Math.max(.1,n.gustSeconds),grassBend:Math.max(0,n.grassBend)/e,leafSway:Math.max(0,n.leafSway)*e}}function xe(n,e){return{ticksPerSecond:Math.max(1,n.ticksPerSecond),cellsPerTick:Math.max(1,Math.round(n.cellsPerTick)),spread:Math.max(0,n.spread),reach:Math.max(1,Math.min(3,Math.round(n.reach*e))),rise:Math.max(0,n.rise),burnVariation:Math.min(.9,Math.max(0,n.burnVariation)),flameSeconds:Math.max(0,n.flameSeconds),scorch:n.scorch,wind:Math.max(0,n.wind??0),rainOut:Math.max(0,n.rainOut??0)}}function Me(n,e){return{ticksPerSecond:Math.max(1,n.ticksPerSecond),cellsPerTick:Math.max(1,Math.round(n.cellsPerTick)),fallCells:Math.max(1,Math.round(n.fallPerTick*e)),spreadDrop:n.spreadDrop<=1?1:2,pressure:n.pressure,bodySearch:Math.max(1,Math.round(n.bodySearch)),bodyCellsPerTick:Math.max(1,Math.round(n.bodyCellsPerTick)),springs:n.springs,opacity:Math.min(1,Math.max(0,n.opacity))}}function N(n){return[Math.ceil(n.sx/m),Math.ceil(n.sy/m),Math.ceil(n.sz/m)]}function ke(n,e,t,s){const a=A,i=new Uint8Array(a*a*a),o=e*m-1,r=t*m-1,l=s*m-1,{sx:c,sy:d,sz:h,data:f}=n,u=Math.max(0,-o),g=Math.max(0,-r),y=Math.max(0,-l),x=Math.min(a,c-o),M=Math.min(a,d-r),b=Math.min(a,h-l);for(let w=g;w<M;w++)for(let p=y;p<b;p++){const v=c*(l+p+h*(r+w))+o,_=a*(p+a*w);for(let k=u;k<x;k++)i[_+k]=f[v+k]}return i}const Le=6,Ie=0,Ee=3,_e=4,Ae=5;function J(){this.array=null}function ze(n){return n.onUpload(J),n}const Ce=m/2*Math.sqrt(3);class Pe{constructor(e,t,s=null){this.scene=e,this.material=t,this.waterMaterial=s}meshes=new Map;uploadedBytes=0;version=0;get count(){return this.meshes.size}has(e){return this.meshes.has(e)}upload(e,t,s){const a=this.meshes.get(e),i=a?a[0].visible:!1;if(this.remove(e),s.indexCount===0)return 0;const o=ze(new te(s.vertices,Le)),r=Math.min(s.indexCount,s.waterIndexStart??s.indexCount),l=[];r>0&&l.push({indices:s.indices.subarray(0,r),material:this.material,water:!1}),r<s.indexCount&&l.push({indices:s.indices.subarray(r),material:this.waterMaterial??this.material,water:!0});const c=[];for(const h of l){const f=new se;f.setAttribute("position",new C(o,3,Ie,!1)),f.setAttribute("face",new C(o,1,Ee,!1)),f.setAttribute("ao",new C(o,1,_e,!1)),f.setAttribute("layer",new C(o,1,Ae,!1)),f.setIndex(new ie(h.indices,1).onUpload(J)),f.boundingSphere=new ne(new K(m/2,m/2,m/2),Ce);const u=new ae(f,h.material);u.position.set(t.cx*m,t.cy*m,t.cz*m),u.matrixAutoUpdate=!1,u.updateMatrix(),u.frustumCulled=!0,u.visible=i,u.castShadow=!h.water,u.receiveShadow=!0,h.water&&(u.renderOrder=1),this.scene.add(u),c.push(u)}this.version++,this.meshes.set(e,c);const d=s.vertices.byteLength+s.indices.byteLength;return this.uploadedBytes+=d,d}setVisible(e,t){const s=this.meshes.get(e);if(s&&s[0].visible!==t){for(const a of s)a.visible=t;this.version++}}remove(e){const t=this.meshes.get(e);if(t){for(const s of t)this.scene.remove(s),s.geometry.dispose();this.meshes.delete(e),this.version++}}clear(){for(const e of Array.from(this.meshes.keys()))this.remove(e)}}const Te=8;class nt{group=new oe;meshes;workers=[];nextWorker=0;model=null;generation=0;dirty=new Set;busy=new Set;jobs=new Map;nextJobId=1;constructor(e,t,s=null,a=1){this.meshes=new Pe(this.group,e,s);for(let i=0;i<Math.max(1,a);i++){const o=new Worker(new URL("/voxel-web/assets/chunkWorker-CFa0sAok.js",import.meta.url),{type:"module"});o.onmessage=r=>this.onResult(r.data),o.postMessage(t),this.workers.push(o)}}setModel(e){this.meshes.clear(),this.generation++,this.dirty.clear(),this.busy.clear(),this.model=e;const[t,s,a]=N(e);for(let i=0;i<s;i++)for(let o=0;o<a;o++)for(let r=0;r<t;r++)this.dirty.add(B(r,i,o))}markCell(e,t,s){if(!this.model)return;const[a,i,o]=N(this.model),r=[e>>6,t>>6,s>>6],l=[e&D,t&D,s&D],c=[a,i,o],d=r.map((h,f)=>{const u=[h];return l[f]===0&&h>0&&u.push(h-1),l[f]===m-1&&h+1<c[f]&&u.push(h+1),u});for(const h of d[1])for(const f of d[2])for(const u of d[0])this.dirty.add(B(u,h,f))}markAll(){if(!this.model)return;const[e,t,s]=N(this.model);for(let a=0;a<t;a++)for(let i=0;i<s;i++)for(let o=0;o<e;o++)this.dirty.add(B(o,a,i))}markIndex(e){if(!this.model)return;const{sx:t,sz:s}=this.model;this.markCell(e%t,Math.floor(e/(t*s)),Math.floor(e/t)%s)}get pending(){return this.dirty.size>0||this.busy.size>0}update(){if(!this.model)return;let e=0;for(const t of this.dirty){if(e>=Te*this.workers.length)break;if(this.busy.has(t))continue;this.dirty.delete(t);const{cx:s,cy:a,cz:i}=ge(t),o=ke(this.model,s,a,i),r=this.nextJobId++;this.jobs.set(r,{key:t,generation:this.generation}),this.busy.add(t);const l=o.buffer;this.workers[this.nextWorker++%this.workers.length].postMessage({type:"mesh",jobId:r,coord:{cx:s,cy:a,cz:i},version:0,padded:l},[l]),e++}}onResult(e){if(e.type==="ready")return;const t=this.jobs.get(e.jobId);if(this.jobs.delete(e.jobId),!(!t||t.generation!==this.generation)){if(this.busy.delete(t.key),e.type==="error"){console.error("model mesh job failed:",e.message);return}e.type==="mesh-done"&&(this.meshes.upload(t.key,e.coord,{vertices:new Uint8Array(e.vertices),indices:new Uint32Array(e.indices),vertexCount:e.vertexCount,indexCount:e.indexCount,waterIndexStart:e.waterIndexStart}),this.meshes.setVisible(t.key,!0))}}dispose(){for(const e of this.workers)e.terminate();this.meshes.clear()}}const Fe={natural:{label:"Natural",lift:[0,0,0],gain:[1,1,1],saturation:1,contrast:1},warm:{label:"Warm",lift:[.02,.01,0],gain:[1.06,1,.9],saturation:1.05,contrast:1.02},cool:{label:"Cool",lift:[0,.01,.03],gain:[.92,.98,1.06],saturation:.95,contrast:1},vivid:{label:"Vivid",lift:[0,0,0],gain:[1,1,1],saturation:1.35,contrast:1.12},muted:{label:"Muted",lift:[.03,.03,.03],gain:[.98,.98,.96],saturation:.7,contrast:.92},golden:{label:"Golden hour",lift:[.03,.01,0],gain:[1.12,.98,.78],saturation:1.1,contrast:1.05}},at=Object.keys(Fe);function ot(n){return n.lift.every(e=>e===0)&&n.gain.every(e=>e===1)&&n.saturation===1&&n.contrast===1}const Y={azimuth:55.4,elevation:56.8};function Q(n,e){const t=n*Math.PI/180,s=e*Math.PI/180;return[Math.cos(s)*Math.sin(t),Math.sin(s),Math.cos(s)*Math.cos(t)]}function rt(n,e,t){const[s,a,i]=Q(n,e),o=n*Math.PI/180,r=(t-6)/24*2*Math.PI,l=Math.cos(r),c=Math.sin(r);return[Math.cos(o)*l+s*c,a*c,-Math.sin(o)*l+i*c]}const L=(n,e,t)=>{const s=Math.min(1,Math.max(0,(t-n)/(e-n)));return s*s*(3-2*s)};function lt(n){const e=n;return{day:L(-.14,.22,e),dusk:L(-.18,.02,e)*(1-L(.02,.42,e)),sun:L(-.01,.16,e),moon:L(-.01,.16,-e),night:e<0,stars:1-L(-.2,.04,e),lamps:1-L(-.06,.12,e)}}const De=new K(...Q(Y.azimuth,Y.elevation)),ct=new E(5144510),Be=new E(12176344),ht=new E(16771524),Oe=.6,ee=`
const vec3 NORMALS[6] = vec3[6](
  vec3(1.0, 0.0, 0.0), vec3(-1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0),
  vec3(0.0, -1.0, 0.0), vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, -1.0));

uniform float plantFadeStart;
uniform float plantFadeEnd;

// Same integer cell always gives the same value in [0, 1); neighbours unrelated ones.
float hashCell(ivec3 cell, uint salt) {
  uvec3 q = uvec3(cell + 1048576);
  uint h = q.x * 1597334673u ^ q.y * 3812015801u ^ q.z * 2654435761u ^ salt;
  h ^= h >> 15; h *= 2246822519u;
  h ^= h >> 13; h *= 3266489917u;
  h ^= h >> 16;
  return float(h) * (1.0 / 4294967296.0);
}

// Whether the plant in a world column is still drawn at a horizontal distance.
bool plantKept(ivec2 column, float dist) {
  if (dist <= plantFadeStart) return true;
  float keep = 1.0 - smoothstep(plantFadeStart, plantFadeEnd, dist);
  return hashCell(ivec3(column.x, 0, column.y), 0x5a17u) < keep;
}
`,Ue=`
#include <common>
#include <shadowmap_pars_vertex>

in float face;
in float ao;
in float layer;
#ifdef USE_PLANTS
// One plant run per instance: x and z from the tile corner, lowest block y, height | layer << 8.
in vec4 plant;
#endif
#ifdef USE_BOX_LAYERS
// Building stand-ins: one box per instance, its block's texture layers (side, top, bottom).
in vec3 boxLayers;
#endif
flat varying int vFace;
flat varying float vLayer;
// 1 on a plant that thins out with distance (bit 5 of the face byte).
flat varying float vThins;
varying vec3 vWorld;
varying vec3 vAmbient;
varying float vSun;

uniform vec3 sunDirection;
uniform vec3 skyAmbient;
uniform vec3 groundAmbient;
uniform float fillLight;
uniform vec2 windDirection;
uniform float windStrength;
uniform float windGrassBend;
uniform float windLeafSway;
uniform float time;
${ee}

// The wind's push at a point, in blocks per unit of sway: slow waves running
// downwind (so a meadow moves in swells, not all at once) and a faster
// flutter across it. Continuous in position, so neighbouring faces agree.
vec2 windPush(vec3 world) {
  vec2 across = vec2(-windDirection.y, windDirection.x);
  float along = dot(world.xz, windDirection);
  float wave = 0.6 * sin(along * 0.045 - time * 2.1) + 0.4 * sin(along * 0.17 - time * 3.9 + dot(world.xz, across) * 0.09);
  float flutter = sin(time * 8.0 + world.x * 0.7 + world.z * 1.1 + world.y * 0.3);
  return windStrength * (windDirection * (0.6 + 0.4 * wave) + across * flutter * 0.25);
}

void main() {
  int fbits = int(face + 0.5);
  int f = fbits & 7;
  // How this vertex sways (blocks.ts SWAY_*): a bending plant carries its height above the base in ao.
  int sway = (fbits >> 3) & 3;
  vThins = float((fbits >> 5) & 1);
  float swayHeight = ao;
  vec4 worldPosition = vec4(position, 1.0);
  vLayer = layer;
  #ifdef USE_BOX_LAYERS
  vLayer = f == 2 ? boxLayers.y : f == 3 ? boxLayers.z : boxLayers.x;
  #endif
  #ifdef USE_PLANTS
  // A unit column (top, +x side, +z side) stretched to the run's height. Each
  // side is mirrored to whichever side faces the camera, so three quads look
  // like a whole box; mirroring flips the winding, hence a double-sided material.
  vec3 corner = position;
  vec3 center = (modelMatrix * vec4(plant.xyz + 0.5, 1.0)).xyz;
  vec3 toCamera = cameraPosition - center;
  if (f == 0 && toCamera.x < 0.0) { corner.x = 1.0 - corner.x; f = 1; }
  if (f == 4 && toCamera.z < 0.0) { corner.z = 1.0 - corner.z; f = 5; }
  corner.y *= mod(plant.w, 256.0);
  swayHeight = corner.y;
  vLayer = floor(plant.w / 256.0);
  // A thinned-out plant collapses to a point and draws nothing.
  if (!plantKept(ivec2(floor(center.xz)), length(toCamera.xz))) corner = vec3(0.0);
  worldPosition = vec4(plant.xyz + corner, 1.0);
  #endif
  vec3 normal = NORMALS[f];
  #ifdef USE_INSTANCING
  // Tree stand-ins: scaled and moved per tree, never rotated, so face normals still hold.
  worldPosition = instanceMatrix * worldPosition;
  #endif
  worldPosition = modelMatrix * worldPosition;
  // Grass bends more towards its tip; foliage moves as a whole.
  if (sway == 1) worldPosition.xz += windPush(worldPosition.xyz) * windGrassBend * swayHeight * swayHeight;
  else if (sway == 2) worldPosition.xz += windPush(worldPosition.xyz) * windLeafSway;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
  vWorld = worldPosition.xyz;
  vFace = f;

  float facing = dot(normal, sunDirection);
  float occlusion = 0.55 + 0.45 * (sway == 1 ? 1.0 : ao / 3.0);
  // Ambient and a soft fill keep faces turned away from the sun distinct.
  vAmbient = (mix(groundAmbient, skyAmbient, normal.y * 0.5 + 0.5) + fillLight * (facing * 0.5 + 0.5)) * occlusion;
  vSun = max(facing, 0.0);

  vec3 transformedNormal = normalMatrix * normal;
  #include <shadowmap_vertex>
}
`,Ne=`
#include <common>
#include <packing>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

precision highp sampler2DArray;
uniform sampler2DArray atlas;
uniform float textureSize;
uniform vec3 sunDirection;
uniform vec3 sunColor;
uniform vec3 fogColor;
uniform vec3 sunFogColor;
uniform float fogDensity;
uniform float fogBase;
uniform float fogFalloff;
uniform float fogEnd;
uniform vec3 shadowCenter;
uniform float shadowFadeStart;
uniform float shadowFadeEnd;
uniform float meadowLayer;
uniform float meadowBladeLayer;
uniform float emissiveLayer;
uniform float lampGlow;
uniform float fireLayer;
uniform float time;
#ifdef USE_WATER
uniform float waterOpacity;
#endif
#ifdef USE_LOD_MASK
uniform sampler2D lodMask;
uniform vec2 lodMaskOrigin;
uniform float lodMaskSize;
uniform float lodLevel;
uniform float lodCoarsest;
uniform float lodTime;
uniform float lodFade;
uniform float lodTint;
// Debug > Tint by detail level: voxels, then each distant level, its own colour.
const vec3 LOD_COLORS[8] = vec3[8](
  vec3(0.25, 0.95, 0.35), vec3(0.2, 0.85, 1.0), vec3(0.35, 0.45, 1.0), vec3(1.0, 0.92, 0.25),
  vec3(1.0, 0.55, 0.15), vec3(1.0, 0.25, 0.25), vec3(0.9, 0.35, 0.95), vec3(0.75, 0.75, 0.75));
#endif
flat varying int vFace;
flat varying float vLayer;
flat varying float vThins;
varying vec3 vWorld;
varying vec3 vAmbient;
varying float vSun;
${ee}

void main() {
  vec3 normal = NORMALS[vFace];

#ifdef USE_LOD_MASK
  // A face lying exactly on a column edge belongs to the column behind it.
  vec2 column = floor((vWorld.xz - normal.xz * 0.01) / CHUNK_SIZE_F) - lodMaskOrigin;
  if (all(greaterThanEqual(column, vec2(0.0))) && all(lessThan(column, vec2(lodMaskSize)))) {
    vec4 m = floor(texelFetch(lodMask, ivec2(column), 0) * 255.0 + 0.5);
    float owner = m.r;
    if (m.g != m.r) {
      // Changing hands: the new owner covers a growing share of pixels, the old one the rest.
      float t = clamp(mod(lodTime - (m.b * 256.0 + m.a) + 65536.0, 65536.0) / lodFade, 0.0, 1.0);
      float dither = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
      if (dither >= t) owner = m.g;
    }
    if (owner != lodLevel) discard;
  } else if (lodLevel != lodCoarsest) {
    discard;
  }
#endif

  // The voxel this pixel belongs to: step half a block back along the normal.
  ivec3 voxel = ivec3(floor(vWorld - normal * 0.5));

#ifndef USE_PLANTS
  // Voxel grass thins out exactly like distant grass.
  if (vThins > 0.5 && !plantKept(voxel.xz, length(vWorld.xz - cameraPosition.xz))) discard;
#endif

  // World-space projection onto the face plane.
  vec3 t = vWorld / textureSize;
  vec2 uv = vFace <= 1 ? t.zy : (vFace <= 3 ? t.xz : t.xy);
#ifdef USE_WATER
  // Ripples drift across the surface.
  uv += vec2(time * 0.018, time * 0.011) + 0.012 * vec2(sin(t.x * 9.0 + time * 1.3), cos(t.z * 7.0 + time * 1.1));
#endif
  vec3 albedo = texture(atlas, vec3(uv, vLayer)).rgb;
  // Hide the repeat: modulate by the same material sampled about five times
  // larger and rotated, relative to its average brightness (smallest mip).
  vec2 macroUv = mat2(0.8, -0.6, 0.6, 0.8) * uv * 0.21 + vec2(0.37, 0.61);
  vec3 macro = texture(atlas, vec3(macroUv, vLayer)).rgb;
  vec3 average = textureLod(atlas, vec3(0.5, 0.5, vLayer), 16.0).rgb;
  const vec3 LUMA = vec3(0.3, 0.59, 0.11);
  albedo *= mix(1.0, dot(macro, LUMA) / max(dot(average, LUMA), 0.02), 0.75);

  // Where grass has thinned out, the meadow keeps the blades' colour: grassy
  // ground takes it on as the blades go, as much as they covered.
  if (vFace == 2 && abs(vLayer - meadowLayer) < 0.5) {
    float gone = smoothstep(plantFadeStart, plantFadeEnd, length(vWorld.xz - cameraPosition.xz));
    vec3 blade = textureLod(atlas, vec3(0.5, 0.5, meadowBladeLayer), 16.0).rgb;
    albedo = mix(albedo, albedo * blade / max(average, vec3(0.02)), gone * MEADOW_COVER);
  }

  float bright = hashCell(voxel, 0u) - 0.5;
  float warm = hashCell(voxel, 0x9e3779b9u) - 0.5;
  vec3 tint = vec3(1.0 + bright * 0.09 + warm * 0.04, 1.0 + bright * 0.09, 1.0 + bright * 0.09 - warm * 0.04);

  // Sunlight, blocked by shadows near the player and fading out towards the
  // edge of the shadowed area so there is no visible border.
  float shadow = 1.0;
  if (vSun > 0.0) {
    shadow = getShadowMask();
    float fade = smoothstep(shadowFadeStart, shadowFadeEnd, distance(vWorld.xz, shadowCenter.xz));
    shadow = mix(shadow, 1.0, fade);
  }
  vec3 color = albedo * tint * (vAmbient + sunColor * vSun * shadow);
  // Lantern glass lights up after dusk, whatever light falls on it.
  if (abs(vLayer - emissiveLayer) < 0.5) color = mix(color, albedo * 1.35, lampGlow);
  // Fire gives its own light, flickering cell by cell.
  if (abs(vLayer - fireLayer) < 0.5) {
    float flicker = fract(sin(dot(floor(vWorld.xz * 0.34) + floor(time * 9.0), vec2(12.9898, 78.233))) * 43758.5453);
    color = albedo * (1.15 + 0.45 * flicker);
  }
#ifdef USE_LOD_MASK
  if (lodTint > 0.5) color = mix(color, LOD_COLORS[int(lodLevel + 0.5) % 8] * (0.35 + dot(color, LUMA)), 0.6);
#endif

  // Height fog.
  vec3 toFragment = vWorld - cameraPosition;
  float dist = length(toFragment);
  float midHeight = 0.5 * (vWorld.y + cameraPosition.y);
  float thickness = clamp(exp(-(midHeight - fogBase) / fogFalloff), 0.06, 1.0);
  float depth = dist * fogDensity * thickness;
  float fog = 1.0 - exp(-depth * depth);
  fog = max(fog, smoothstep(fogEnd * 0.8, fogEnd, dist));
  float towardSun = pow(max(dot(toFragment / max(dist, 0.001), sunDirection), 0.0), 8.0);
  vec3 haze = mix(fogColor, sunFogColor, towardSun * 0.6);

#ifdef USE_WATER
  // Clearer looking straight down, a mirror-like sheen at a grazing angle.
  float grazing = 1.0 - abs(dot(normalize(toFragment), normal));
  float alpha = mix(waterOpacity, 1.0, grazing * grazing * 0.6);
  color = mix(color, haze, grazing * 0.25);
  gl_FragColor = vec4(mix(color, haze, fog), max(alpha, fog));
#else
  gl_FragColor = vec4(mix(color, haze, fog), 1.0);
#endif
}
`,P={sunColor:new E(1,.94,.82).multiplyScalar(.68),skyAmbient:new E(.36,.41,.49),groundAmbient:new E(.24,.22,.2),fillLight:.14};function dt(n){return{sunColor:{value:P.sunColor.clone()},skyAmbient:{value:P.skyAmbient.clone()},groundAmbient:{value:P.groundAmbient.clone()},fillLight:{value:P.fillLight},fogColor:{value:Be},sunFogColor:{value:new E(15916216)},fogDensity:{value:1/n.fogDistance},fogBase:{value:n.fogBase},fogFalloff:{value:n.fogHeight},fogEnd:{value:n.viewDistance},plantFadeStart:{value:n.plantFadeStart},plantFadeEnd:{value:Math.max(n.plantFadeEnd,n.plantFadeStart+1)},meadowLayer:{value:n.meadowLayer},meadowBladeLayer:{value:n.meadowBladeLayer},emissiveLayer:{value:n.emissiveLayer},lampGlow:{value:0},fireLayer:{value:n.fireLayer},lodTint:{value:0},time:{value:0},windDirection:{value:new re(1,0)},windStrength:{value:0},windGrassBend:{value:0},windLeafSway:{value:0},...n.shadow}}function ut(n){const e={...le.clone(ce.lights),atlas:{value:n.atlas},textureSize:{value:n.textureSize},sunDirection:{value:n.sunDirection??De},...n.shared},t={CHUNK_SIZE_F:m.toFixed(1),MEADOW_COVER:Oe.toFixed(3)};if(n.lod){t.USE_LOD_MASK="";const s=n.lod.mask.uniforms;Object.assign(e,{lodMask:s.lodMask,lodMaskOrigin:s.lodMaskOrigin,lodMaskSize:s.lodMaskSize,lodTime:s.lodTime,lodFade:s.lodFade,lodLevel:{value:n.lod.level},lodCoarsest:{value:n.lod.coarsest}})}return n.plants&&(t.USE_PLANTS=""),n.boxLayers&&(t.USE_BOX_LAYERS=""),n.water&&(t.USE_WATER="",e.waterOpacity={value:n.waterOpacity??.6}),new he({vertexShader:Ue,fragmentShader:Ne,uniforms:e,defines:t,lights:!0,side:n.plants||n.water?de:ue,transparent:!!n.water,depthWrite:!n.water})}const j=1196774228;function Re(n,e,t,s=1){if(!(e>0)||!(t>0))return 1;const a=n/e,i=Math.floor(a),o=a-i,r=o*o*(3-2*o),l=z(s^j,i),c=z(s^j,i+1);return 1+t*((l+(c-l)*r)*2-1)}class ft{constructor(e,t){this.shared=e,this.settings=t,this.direction=t.direction,e.windGrassBend.value=t.grassBend,e.windLeafSway.value=t.leafSway}x=0;z=1;strength=0;strengthScale=1;weatherScale=1;direction;update(e){const t=this.direction*Math.PI/180;this.x=Math.sin(t),this.z=-Math.cos(t),this.strength=this.settings.strength*this.strengthScale*this.weatherScale*Re(e,this.settings.gustSeconds,this.settings.gustiness),this.shared.windDirection.value.set(this.x,this.z),this.shared.windStrength.value=this.strength}}const We={ticksPerSecond:8,cellsPerTick:3e3,spread:1,reach:2,rise:2.5,burnVariation:.3,flameSeconds:.4,scorch:!0,wind:1.5,rainOut:.8},R=1179210309,W=[[0,1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1]],He=[[0,1,0],[0,-1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1]];function T(n,e,t){return((n+1048576)*2048+(e+1024))*2097152+(t+1048576)}class mt{constructor(e,t,s=We){this.world=e,this.registry=t,this.settings=s,this.fireId=t.id("fire"),this.scorchedId=t.id("scorched_ground");for(const a of["grass","dirt","dry_ground"])this.scorchable[t.id(a)]=1}burning=new Map;flames=new Map;fireId;scorchedId;scorchable=new Uint8Array(256);accumulator=0;tick=0;burnt=0;wind={x:0,z:0};rain=0;get burningCount(){return this.burning.size}get flameCount(){return this.flames.size}reset(){this.burning.clear(),this.flames.clear(),this.accumulator=0,this.burnt=0}ignite(e,t,s){const a=T(e,t,s);if(this.burning.has(a))return!1;const i=this.world.getBlock(e,t,s);if(this.registry.fuelSeconds[i]<=0)return!1;const o=1+(z(F(e,t,s),R)-.5)*2*this.settings.burnVariation;return this.burning.set(a,{x:e,y:t,z:s,id:i,left:this.registry.fuelSeconds[i]*o}),this.registry.isPlant(i)&&this.world.setBlock(e,t,s,this.fireId),!0}igniteAround(e,t,s,a){const i=Math.ceil(a);let o=0;for(let r=s-i;r<=s+i;r++)for(let l=t-i;l<=t+i;l++)for(let c=e-i;c<=e+i;c++)(c-e)**2+(l-t)**2+(r-s)**2>a*a||this.ignite(c,l,r)&&o++;return o}isBurning(e,t,s){return this.burning.has(T(e,t,s))}update(e){if(this.burning.size===0&&this.flames.size===0){this.accumulator=0;return}const t=1/this.settings.ticksPerSecond;for(this.accumulator=Math.min(this.accumulator+e,t*3);this.accumulator>=t;)this.accumulator-=t,this.step()}step(){this.tick++;const e=1/this.settings.ticksPerSecond,t=this.world;let s=0;for(const[a,i]of this.burning){if(s++>=this.settings.cellsPerTick)break;const o=this.registry.isPlant(i.id),r=t.getBlock(i.x,i.y,i.z);if(r!==(o?this.fireId:i.id)||this.touchesWater(i.x,i.y,i.z)){o&&r===this.fireId&&t.setBlock(i.x,i.y,i.z,S),this.burning.delete(a);continue}if(i.left-=e,i.left<=0){this.burnOut(a,i);continue}if(this.rain>0&&z(F(this.tick,i.x,i.y),i.z,R^1380010318)<this.rain*this.settings.rainOut*e){o&&t.setBlock(i.x,i.y,i.z,S),this.burning.delete(a);continue}if(this.spread(i),this.flame(i.x,i.y+1,i.z),!o)for(let l=1;l<W.length;l++)this.flame(i.x+W[l][0],i.y,i.z+W[l][2])}for(const[a,i]of this.flames)i.left-=e,!(i.left>0)&&(t.getBlock(i.x,i.y,i.z)===this.fireId&&t.setBlock(i.x,i.y,i.z,S),this.flames.delete(a))}touchesWater(e,t,s){for(const[a,i,o]of He)if(this.registry.liquid[this.world.getBlock(e+a,t+i,s+o)]===1)return!0;return!1}flame(e,t,s){const a=T(e,t,s),i=this.flames.get(a);if(i){i.left=this.settings.flameSeconds;return}this.world.getBlock(e,t,s)===S&&this.world.setBlock(e,t,s,this.fireId)&&this.flames.set(a,{x:e,y:t,z:s,left:this.settings.flameSeconds})}burnOut(e,t){const s=this.world;this.burning.delete(e),this.burnt++,s.setBlock(t.x,t.y,t.z,this.registry.fuelBecomes[t.id]),this.settings.scorch&&this.registry.fuelScorch[t.id]===1&&this.scorchable[s.getBlock(t.x,t.y-1,t.z)]===1&&s.setBlock(t.x,t.y-1,t.z,this.scorchedId)}spread(e){const t=this.settings,s=t.reach,a=1/t.ticksPerSecond,i=this.world;for(let o=-s;o<=s;o++)for(let r=-s;r<=s;r++)for(let l=-s;l<=s;l++){if(l===0&&r===0&&o===0)continue;const c=e.x+l,d=e.y+r,h=e.z+o;if(!i.isLoaded(c,d,h))continue;const f=i.getBlock(c,d,h),u=this.registry.fuelCatch[f];if(u<=0||this.burning.has(T(c,d,h)))continue;const g=Math.max(Math.abs(l),Math.abs(r),Math.abs(o)),y=r>0?t.rise:r<0?.5:1,x=Math.max(.1,1+t.wind*(l*this.wind.x+o*this.wind.z)/g),M=Math.max(0,1-this.rain),b=u*t.spread*a*y*x*M/(g*g);z(F(this.tick,c,d),h,R)<b&&this.ignite(c,d,h)}}}const qe={ticksPerSecond:20,cellsPerTick:1500,fallCells:8,spreadDrop:2,pressure:!0,bodySearch:1024,bodyCellsPerTick:2e4,springs:!0,opacity:.6},H=[[1,0],[-1,0],[0,1],[0,-1]],Ve=[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,1,0],[0,-1,0]];function q(n,e,t){return((n+1048576)*2048+(e+1024))*2097152+(t+1048576)}class gt{constructor(e,t,s=()=>null,a=qe){this.world=e,this.registry=t,this.springLevel=s,this.settings=a,this.waterId=t.id("water")}queue=[];queued=new Set;cells=new Map;accumulator=0;tick=0;searchBudget=0;bx=[];by=[];bz=[];seen=new Set;moved=0;spawned=0;waterId;get awake(){return this.queue.length}reset(){this.queue.length=0,this.queued.clear(),this.cells.clear(),this.accumulator=0,this.moved=0,this.spawned=0}isSpring(e,t,s){if(!this.settings.springs)return!1;const a=this.springLevel(e,s);return a!==null&&t<=a}enqueue(e,t,s){const a=this.world.getBlock(e,t,s);if(this.registry.liquid[a]!==1&&!(this.open(a)&&this.isSpring(e,t,s)))return;const i=q(e,t,s);this.queued.has(i)||(this.queued.add(i),this.cells.set(i,[e,t,s]),this.queue.push(i))}wake(e,t,s){this.enqueue(e,t,s),this.enqueue(e,t+1,s),this.enqueue(e,t-1,s);for(const[a,i]of H)this.enqueue(e+a,t,s+i),this.enqueue(e+a,t+1,s+i),this.enqueue(e+a,t-1,s+i)}update(e){const t=1/this.settings.ticksPerSecond;for(this.accumulator=Math.min(this.accumulator+e,t*3);this.accumulator>=t;)this.accumulator-=t,this.step()}step(){this.tick++,this.searchBudget=this.settings.bodyCellsPerTick;const e=Math.min(this.settings.cellsPerTick,this.queue.length);for(let t=0;t<e;t++){const s=this.queue.shift();this.queued.delete(s);const a=this.cells.get(s);this.cells.delete(s),this.flow(a[0],a[1],a[2])}}open(e){return e===S||this.registry.isPlant(e)}flow(e,t,s){const a=this.world,i=a.getBlock(e,t,s);if(!a.isLoaded(e,t-1,s))return;if(this.registry.liquid[i]!==1){this.open(i)&&this.isSpring(e,t,s)&&this.spawn(e,t,s,this.waterId);return}if(this.isSpring(e,t,s)){this.feed(e,t,s,i);return}if(this.open(a.getBlock(e,t-1,s))){let l=t-1;for(;t-l<this.settings.fallCells&&a.isLoaded(e,l-1,s)&&this.open(a.getBlock(e,l-1,s));)l--;this.move(e,t,s,e,l,s,i);return}const o=F(this.tick,e,s)&3;let r;for(let l=0;l<4;l++){const[c,d]=H[o+l&3],h=e+c,f=s+d;if(!(!a.isLoaded(h,t-1,f)||!this.open(a.getBlock(h,t,f)))){if(this.settings.spreadDrop<=1||this.open(a.getBlock(h,t-1,f))){this.move(e,t,s,h,t,f,i);return}if(this.settings.pressure){if(r===void 0){if(this.searchBudget<=0){this.enqueue(e,t,s);return}r=this.pressingTop(e,t,s)}if(r!==null){this.isSpring(r[0],r[1],r[2])?this.spawn(h,t,f,i):this.move(r[0],r[1],r[2],h,t,f,a.getBlock(r[0],r[1],r[2]));return}}}}}feed(e,t,s,a){const i=this.world;if(this.open(i.getBlock(e,t-1,s))){this.spawn(e,t-1,s,a);return}for(const[o,r]of H)i.isLoaded(e+o,t-1,s+r)&&this.open(i.getBlock(e+o,t,s+r))&&this.spawn(e+o,t,s+r,a)}pressingTop(e,t,s){const a=this.world,i=this.registry.liquid,{bx:o,by:r,bz:l,seen:c}=this;o.length=r.length=l.length=0,c.clear(),o.push(e),r.push(t),l.push(s),c.add(q(e,t,s));let d=-1,h=t;const f=this.settings.bodySearch;for(let u=0;u<o.length&&u<f;u++){const g=o[u],y=r[u],x=l[u];if(this.isSpring(g,y,x))return this.searchBudget-=u+1,[g,y,x];y>h&&(h=y,d=u);for(const[M,b,w]of Ve){const p=g+M,v=y+b,_=x+w;if(v<t)continue;const k=q(p,v,_);c.has(k)||!a.isLoaded(p,v,_)||i[a.getBlock(p,v,_)]!==1||(c.add(k),o.push(p),r.push(v),l.push(_))}}return this.searchBudget-=Math.min(o.length,f),d<0?null:[o[d],r[d],l[d]]}spawn(e,t,s,a){this.world.setBlock(e,t,s,a)&&(this.spawned++,this.wake(e,t,s))}move(e,t,s,a,i,o,r){this.world.setBlock(a,i,o,r)&&(this.world.setBlock(e,t,s,S),this.moved++,this.wake(e,t,s),this.wake(a,i,o))}}export{Fe as A,at as B,m as C,Y as D,it as E,mt as F,Me as G,xe as H,U as M,ve as N,A as P,De as S,P as T,I as V,gt as W,nt as a,ht as b,Be as c,ct as d,lt as e,st as f,Ke as g,D as h,ot as i,Xe as j,et as k,Je as l,Qe as m,Ze as n,$e as o,B as p,X as q,tt as r,rt as s,dt as t,ge as u,ut as v,je as w,Pe as x,ft as y,Q as z};
