import{f as V,n as q,a6 as g,w as z,V as L,o as C,L as G,y as O,a as I,J as U,C as _,Y as P,g as E,M as N}from"./prng-wf60MiKR.js";const H="/voxel-web/assets/rain-BTeDtDei.ogg",X=`
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
`;class Z{constructor(s,t){this.scene=s,this.settings=t;const o=t.rainDrops;this.positions=new Float32Array(o*6),this.floors=new Float32Array(o),this.wet=new Uint8Array(o),this.positions.fill(-1e5);const r=new V;r.setAttribute("position",new q(this.positions,3).setUsage(g)),r.boundingSphere=new z(new L,1e6);const h=new C({color:14213868,transparent:!0,opacity:t.dropOpacity,depthWrite:!1});this.mesh=new G(r,h),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.mesh.visible=!1,s.add(this.mesh);const a=Math.max(1,t.splashes);this.splashAt=new Float32Array(a*3),this.splashBorn=new Float32Array(a).fill(-1e5),this.splashWater=new Float32Array(a);const e=new O,i=new I(2,2);e.setAttribute("position",i.getAttribute("position")),e.setIndex(i.getIndex()),e.setAttribute("splash",new U(this.splashAt,3).setUsage(g)),e.setAttribute("born",new U(this.splashBorn,1).setUsage(g)),e.setAttribute("water",new U(this.splashWater,1).setUsage(g)),e.instanceCount=a,e.boundingSphere=new z(new L,1e6),this.splashUniforms={time:{value:0},life:{value:t.splashSeconds},size:{value:t.splashSize},color:{value:new _(15002868)},opacity:{value:.55}};const c=new P({vertexShader:X,fragmentShader:j,uniforms:this.splashUniforms,transparent:!0,depthWrite:!1,side:E});this.splashMesh=new N(e,c),this.splashMesh.frustumCulled=!1,this.splashMesh.renderOrder=2,this.splashMesh.visible=!1,s.add(this.splashMesh)}mesh;splashMesh;settings;positions;floors;wet;hit={water:!1};splashAt;splashBorn;splashWater;splashUniforms;nextSplash=0;time=0;active=0;splashed=0;update(s,t,o,r,h,a,e=0){const i=this.settings;this.time+=s;const c=this.mesh.material;c.opacity=i.dropOpacity+(.9-i.dropOpacity)*e,c.color.setRGB(.85+.15*e,.89+.11*e,.93+.07*e),this.splashUniforms.time.value=this.time,this.splashUniforms.life.value=i.splashSeconds,this.splashUniforms.size.value=i.splashSize;const l=this.positions,v=Math.round(Math.min(i.rainDrops,this.floors.length)*Math.min(1,h));this.mesh.visible=v>0||this.active>0,this.splashMesh.visible=this.mesh.visible;const y=i.dropSpeed*s*(1-.85*e),A=i.area/2,w=i.dropLength*(1-.97*e),d=o*i.dropLean*(1+.5*e),m=r*i.dropLean*(1+.5*e),M=1/Math.sqrt(d*d+1+m*m),D=i.splashRange*i.splashRange,B=A+(Math.abs(d)+Math.abs(m))*i.area*1.3;for(let p=0;p<this.floors.length;p++){const n=p*6;if(p>=v){p<this.active&&l.fill(-1e5,n,n+6);continue}let f=l[n+1];const b=f<-1e4,T=Math.abs(l[n]-t.x)>B||Math.abs(l[n+2]-t.z)>B;if(!b&&!T&&f<=this.floors[p]&&e<.5&&this.splash(l[n],this.floors[p],l[n+2],this.wet[p]===1,t,D),b||T||f<=this.floors[p]){const k=t.x+(Math.random()*2-1)*A,F=t.z+(Math.random()*2-1)*A,S=t.y+i.area*(.3+.7*Math.random());this.hit.water=!1;const u=a(k,F,Math.max(S,t.y+i.area),this.hit);this.floors[p]=u,this.wet[p]=this.hit.water?1:0,f=b?S:u+(S-u)*Math.random(),f<=u&&(f=u+i.area*.3),l[n]=k-d*(f-u),l[n+2]=F-m*(f-u)}f-=y;const R=e>0?Math.sin(this.time*1.7+p*.37)*e*i.dropSpeed*.08*s:0;l[n]+=d*y+R,l[n+2]+=m*y+R*.6,l[n+1]=f,l[n+3]=l[n]-d*M*w,l[n+4]=f+M*w,l[n+5]=l[n+2]-m*M*w}this.active=v,this.mesh.geometry.getAttribute("position").needsUpdate=!0;const x=this.splashMesh.geometry;x.getAttribute("splash").needsUpdate=!0,x.getAttribute("born").needsUpdate=!0,x.getAttribute("water").needsUpdate=!0}splash(s,t,o,r,h,a){const e=s-h.x,i=o-h.z;if(e*e+i*i>a)return;const c=this.nextSplash;this.nextSplash=(c+1)%this.splashBorn.length,this.splashAt[c*3]=s,this.splashAt[c*3+1]=t,this.splashAt[c*3+2]=o,this.splashBorn[c]=this.time,this.splashWater[c]=r?1:0,this.splashed++}dispose(){this.scene.remove(this.mesh),this.scene.remove(this.splashMesh),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.splashMesh.geometry.dispose(),this.splashMesh.material.dispose()}}const J=3;class K{constructor(s=H){this.loopUrl=s}context=null;gain=null;noise=null;playing=!1;ensure(){if(!this.context)try{const s=this.context=new AudioContext,t=Math.floor(s.sampleRate*2);this.noise=s.createBuffer(1,t,s.sampleRate);const o=this.noise.getChannelData(0);let r=12345;for(let a=0;a<t;a++)r=r*1103515245+12345>>>0,o[a]=r/4294967296*2-1;this.gain=s.createGain(),this.gain.gain.value=0;const h=s.createBiquadFilter();h.type="lowpass",h.frequency.value=4e3,h.connect(this.gain).connect(s.destination),fetch(this.loopUrl).then(a=>a.arrayBuffer()).then(a=>s.decodeAudioData(a)).then(a=>{const e=s.createBufferSource();e.buffer=a,e.loop=!0,e.connect(h),e.start(),this.playing=!0}).catch(a=>console.warn("rain sound",a))}catch{return null}return this.context.state==="suspended"&&this.context.resume(),this.context}setRain(s,t){if((s<=0||t<=0)&&!this.context)return;const o=this.ensure();!o||!this.gain||this.gain.gain.setTargetAtTime(s*t*J,o.currentTime,.5)}thunder(s){const t=this.ensure();if(!t||!this.noise)return;const o=t.createBufferSource();o.buffer=this.noise;const r=t.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(220,t.currentTime),r.frequency.exponentialRampToValueAtTime(60,t.currentTime+2.5);const h=t.createGain(),a=t.currentTime;h.gain.setValueAtTime(.001,a),h.gain.exponentialRampToValueAtTime(Math.max(.002,.5*s),a+.08),h.gain.exponentialRampToValueAtTime(.001,a+3),o.connect(r).connect(h).connect(t.destination),o.start(a),o.stop(a+3.2)}}export{Z as R,K as a};
