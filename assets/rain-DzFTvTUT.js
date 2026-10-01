import{f as V,o as q,ae as g,Z as z,V as L,u as G,L as O,_ as C,a as _,$ as U,C as I,a5 as P,g as E,M as N}from"./prng-Ctsbd0_6.js";import{a as H}from"./audioBus-50FQsE1F.js";const X="/voxel-web/assets/rain-BTeDtDei.ogg",Z=`
in vec3 splash;
in float born;
in float water;
uniform float time;
uniform float life;
uniform float size;
varying vec2 vUv;
varying float vAge;
varying float vWater;
void main() {
  // On water a ring that grows as it fades; on anything else a quicker, smaller sparkle of droplets.
  float age = (time - born) / (life * (water > 0.5 ? 1.0 : 0.7));
  vAge = age;
  vUv = position.xy;
  vWater = water;
  float scale = water > 0.5 ? 0.3 + 0.7 * clamp(age, 0.0, 1.0) : 0.35;
  // Flat on the floor; spent ones are parked far below.
  vec3 p = splash + vec3(position.x, 0.03, position.y) * size * scale;
  if (age < 0.0 || age > 1.0) p = vec3(0.0, -1e5, 0.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`,j=`
uniform vec3 color;
uniform float opacity;
varying vec2 vUv;
varying float vAge;
varying float vWater;
void main() {
  float r = length(vUv);
  float a;
  if (vWater > 0.5) {
    a = smoothstep(0.5, 0.72, r) * (1.0 - smoothstep(0.86, 1.0, r)) * (1.0 - vAge) * opacity;
  } else {
    // Five droplets flung out from the middle, and a bright fleck where the drop struck.
    float spread = 0.15 + 0.7 * vAge;
    float drops = 0.0;
    for (int k = 0; k < 5; k++) {
      float t = float(k) * 1.2566;
      vec2 c = vec2(cos(t + 0.4), sin(t + 0.4)) * spread;
      drops = max(drops, 1.0 - smoothstep(0.07, 0.13, length(vUv - c)));
    }
    float fleck = (1.0 - smoothstep(0.08, 0.2, r)) * (1.0 - vAge);
    a = max(drops, fleck) * (1.0 - vAge) * opacity * 1.3;
  }
  if (a < 0.01) discard;
  gl_FragColor = vec4(color, a);
}
`;class Q{constructor(o,t){this.scene=o,this.settings=t;const n=t.rainDrops;this.positions=new Float32Array(n*6),this.floors=new Float32Array(n),this.wet=new Uint8Array(n),this.positions.fill(-1e5);const r=new V;r.setAttribute("position",new q(this.positions,3).setUsage(g)),r.boundingSphere=new z(new L,1e6);const c=new G({color:14213868,transparent:!0,opacity:t.dropOpacity,depthWrite:!1});this.mesh=new O(r,c),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.mesh.visible=!1,o.add(this.mesh);const l=Math.max(1,t.splashes);this.splashAt=new Float32Array(l*3),this.splashBorn=new Float32Array(l).fill(-1e5),this.splashWater=new Float32Array(l);const s=new C,e=new _(2,2);s.setAttribute("position",e.getAttribute("position")),s.setIndex(e.getIndex()),s.setAttribute("splash",new U(this.splashAt,3).setUsage(g)),s.setAttribute("born",new U(this.splashBorn,1).setUsage(g)),s.setAttribute("water",new U(this.splashWater,1).setUsage(g)),s.instanceCount=l,s.boundingSphere=new z(new L,1e6),this.splashUniforms={time:{value:0},life:{value:t.splashSeconds},size:{value:t.splashSize},color:{value:new I(15002868)},opacity:{value:.55}};const a=new P({vertexShader:Z,fragmentShader:j,uniforms:this.splashUniforms,transparent:!0,depthWrite:!1,side:E});this.splashMesh=new N(s,a),this.splashMesh.frustumCulled=!1,this.splashMesh.renderOrder=2,this.splashMesh.visible=!1,o.add(this.splashMesh)}mesh;splashMesh;settings;positions;floors;wet;hit={water:!1};splashAt;splashBorn;splashWater;splashUniforms;nextSplash=0;time=0;active=0;splashed=0;update(o,t,n,r,c,l,s=0){const e=this.settings;this.time+=o;const a=this.mesh.material;a.opacity=e.dropOpacity+(.9-e.dropOpacity)*s,a.color.setRGB(.85+.15*s,.89+.11*s,.93+.07*s),this.splashUniforms.time.value=this.time,this.splashUniforms.life.value=e.splashSeconds,this.splashUniforms.size.value=e.splashSize;const i=this.positions,v=Math.round(Math.min(e.rainDrops,this.floors.length)*Math.min(1,c));this.mesh.visible=v>0||this.active>0,this.splashMesh.visible=this.mesh.visible;const y=e.dropSpeed*o*(1-.85*s),A=e.area/2,w=e.dropLength*(1-.97*s),d=n*e.dropLean*(1+.5*s),m=r*e.dropLean*(1+.5*s),M=1/Math.sqrt(d*d+1+m*m),D=e.splashRange*e.splashRange,B=A+(Math.abs(d)+Math.abs(m))*e.area*1.3;for(let p=0;p<this.floors.length;p++){const h=p*6;if(p>=v){p<this.active&&i.fill(-1e5,h,h+6);continue}let f=i[h+1];const x=f<-1e4,T=Math.abs(i[h]-t.x)>B||Math.abs(i[h+2]-t.z)>B;if(!x&&!T&&f<=this.floors[p]&&s<.5&&this.splash(i[h],this.floors[p],i[h+2],this.wet[p]===1,t,D),x||T||f<=this.floors[p]){const k=t.x+(Math.random()*2-1)*A,F=t.z+(Math.random()*2-1)*A,S=t.y+e.area*(.3+.7*Math.random());this.hit.water=!1;const u=l(k,F,Math.max(S,t.y+e.area),this.hit);this.floors[p]=u,this.wet[p]=this.hit.water?1:0,f=x?S:u+(S-u)*Math.random(),f<=u&&(f=u+e.area*.3),i[h]=k-d*(f-u),i[h+2]=F-m*(f-u)}f-=y;const R=s>0?Math.sin(this.time*1.7+p*.37)*s*e.dropSpeed*.08*o:0;i[h]+=d*y+R,i[h+2]+=m*y+R*.6,i[h+1]=f,i[h+3]=i[h]-d*M*w,i[h+4]=f+M*w,i[h+5]=i[h+2]-m*M*w}this.active=v,this.mesh.geometry.getAttribute("position").needsUpdate=!0;const b=this.splashMesh.geometry;b.getAttribute("splash").needsUpdate=!0,b.getAttribute("born").needsUpdate=!0,b.getAttribute("water").needsUpdate=!0}splash(o,t,n,r,c,l){const s=o-c.x,e=n-c.z;if(s*s+e*e>l)return;const a=this.nextSplash;this.nextSplash=(a+1)%this.splashBorn.length,this.splashAt[a*3]=o,this.splashAt[a*3+1]=t,this.splashAt[a*3+2]=n,this.splashBorn[a]=this.time,this.splashWater[a]=r?1:0,this.splashed++}dispose(){this.scene.remove(this.mesh),this.scene.remove(this.splashMesh),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.splashMesh.geometry.dispose(),this.splashMesh.material.dispose()}}const $=3;class Y{constructor(o=X){this.loopUrl=o}context=null;out=null;gain=null;noise=null;playing=!1;ensure(){if(!this.context)try{const o=H(),t=o.context(),n=o.bus("weather");if(!t||!n)return null;const r=this.context=t;this.out=n;const c=Math.floor(r.sampleRate*2);this.noise=r.createBuffer(1,c,r.sampleRate);const l=this.noise.getChannelData(0);let s=12345;for(let a=0;a<c;a++)s=s*1103515245+12345>>>0,l[a]=s/4294967296*2-1;this.gain=r.createGain(),this.gain.gain.value=0;const e=r.createBiquadFilter();e.type="lowpass",e.frequency.value=4e3,e.connect(this.gain).connect(n),fetch(this.loopUrl).then(a=>a.arrayBuffer()).then(a=>r.decodeAudioData(a)).then(a=>{const i=r.createBufferSource();i.buffer=a,i.loop=!0,i.connect(e),i.start(),this.playing=!0}).catch(a=>console.warn("rain sound",a))}catch{return null}return this.context.state==="suspended"&&this.context.resume(),this.context}setRain(o,t){if((o<=0||t<=0)&&!this.context)return;const n=this.ensure();!n||!this.gain||this.gain.gain.setTargetAtTime(o*t*$,n.currentTime,.5)}thunder(o){const t=this.ensure();if(!t||!this.noise)return;const n=t.createBufferSource();n.buffer=this.noise;const r=t.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(220,t.currentTime),r.frequency.exponentialRampToValueAtTime(60,t.currentTime+2.5);const c=t.createGain(),l=t.currentTime;c.gain.setValueAtTime(.001,l),c.gain.exponentialRampToValueAtTime(Math.max(.002,.5*o),l+.08),c.gain.exponentialRampToValueAtTime(.001,l+3),n.connect(r).connect(c).connect(this.out??t.destination),n.start(l),n.stop(l+3.2)}}export{Q as R,Y as a};
