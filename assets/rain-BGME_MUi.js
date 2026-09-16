import{f as C,n as F,a5 as b,w as R,V as z,o as G,L as q,y as O,a as I,J as L,C as _,Y as P,g as E,M as N}from"./prng-D_IB1WhP.js";const k="/voxel-web/assets/rain-BTeDtDei.ogg",H=`
in vec3 splash;
in float born;
uniform float time;
uniform float life;
uniform float size;
varying vec2 vUv;
varying float vAge;
void main() {
  float age = (time - born) / life;
  vAge = age;
  vUv = position.xy;
  // A flat ring on the floor that grows as it fades; spent ones are parked far below.
  vec3 p = splash + vec3(position.x, 0.03, position.y) * size * (0.3 + 0.7 * clamp(age, 0.0, 1.0));
  if (age < 0.0 || age > 1.0) p = vec3(0.0, -1e5, 0.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`,W=`
uniform vec3 color;
uniform float opacity;
varying vec2 vUv;
varying float vAge;
void main() {
  float r = length(vUv);
  float ring = smoothstep(0.5, 0.72, r) * (1.0 - smoothstep(0.86, 1.0, r));
  float a = ring * (1.0 - vAge) * opacity;
  if (a < 0.01) discard;
  gl_FragColor = vec4(color, a);
}
`;class X{constructor(s,t){this.scene=s,this.settings=t;const n=t.rainDrops;this.positions=new Float32Array(n*6),this.floors=new Float32Array(n),this.positions.fill(-1e5);const o=new C;o.setAttribute("position",new F(this.positions,3).setUsage(b)),o.boundingSphere=new R(new z,1e6);const l=new G({color:14213868,transparent:!0,opacity:t.dropOpacity,depthWrite:!1});this.mesh=new q(o,l),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.mesh.visible=!1,s.add(this.mesh);const i=Math.max(1,t.splashes);this.splashAt=new Float32Array(i*3),this.splashBorn=new Float32Array(i).fill(-1e5);const e=new O,a=new I(2,2);e.setAttribute("position",a.getAttribute("position")),e.setIndex(a.getIndex()),e.setAttribute("splash",new L(this.splashAt,3).setUsage(b)),e.setAttribute("born",new L(this.splashBorn,1).setUsage(b)),e.instanceCount=i,e.boundingSphere=new R(new z,1e6),this.splashUniforms={time:{value:0},life:{value:t.splashSeconds},size:{value:t.splashSize},color:{value:new _(15002868)},opacity:{value:.55}};const f=new P({vertexShader:H,fragmentShader:W,uniforms:this.splashUniforms,transparent:!0,depthWrite:!1,side:E});this.splashMesh=new N(e,f),this.splashMesh.frustumCulled=!1,this.splashMesh.renderOrder=2,this.splashMesh.visible=!1,s.add(this.splashMesh)}mesh;splashMesh;settings;positions;floors;splashAt;splashBorn;splashUniforms;nextSplash=0;time=0;active=0;splashed=0;update(s,t,n,o,l,i,e=0){const a=this.settings;this.time+=s;const f=this.mesh.material;f.opacity=a.dropOpacity+(.9-a.dropOpacity)*e,f.color.setRGB(.85+.15*e,.89+.11*e,.93+.07*e),this.splashUniforms.time.value=this.time,this.splashUniforms.life.value=a.splashSeconds,this.splashUniforms.size.value=a.splashSize;const h=this.positions,g=Math.round(Math.min(a.rainDrops,this.floors.length)*Math.min(1,l));this.mesh.visible=g>0||this.active>0,this.splashMesh.visible=this.mesh.visible;const v=a.dropSpeed*s*(1-.85*e),u=a.area/2,y=a.dropLength*(1-.97*e),d=n*a.dropLean*(1+.5*e),m=o*a.dropLean*(1+.5*e),A=1/Math.sqrt(d*d+1+m*m),V=a.splashRange*a.splashRange;for(let p=0;p<this.floors.length;p++){const r=p*6;if(p>=g){p<this.active&&h.fill(-1e5,r,r+6);continue}let c=h[r+1];const x=c<-1e4,w=Math.abs(h[r]-t.x)>u||Math.abs(h[r+2]-t.z)>u;if(!x&&!w&&c<=this.floors[p]&&e<.5&&this.splash(h[r],this.floors[p],h[r+2],t,V),x||w||c<=this.floors[p]){const B=t.x+(Math.random()*2-1)*u,T=t.z+(Math.random()*2-1)*u,M=t.y+a.area*(.3+.7*Math.random());this.floors[p]=i(B,T,M),c=x?M:t.y+a.area*Math.random()-a.area*.2,h[r]=B,h[r+2]=T,c<=this.floors[p]&&(c=M)}c-=v;const U=e>0?Math.sin(this.time*1.7+p*.37)*e*a.dropSpeed*.08*s:0;h[r]+=d*v+U,h[r+2]+=m*v+U*.6,h[r+1]=c,h[r+3]=h[r]-d*A*y,h[r+4]=c+A*y,h[r+5]=h[r+2]-m*A*y}this.active=g,this.mesh.geometry.getAttribute("position").needsUpdate=!0;const S=this.splashMesh.geometry;S.getAttribute("splash").needsUpdate=!0,S.getAttribute("born").needsUpdate=!0}splash(s,t,n,o,l){const i=s-o.x,e=n-o.z;if(i*i+e*e>l)return;const a=this.nextSplash;this.nextSplash=(a+1)%this.splashBorn.length,this.splashAt[a*3]=s,this.splashAt[a*3+1]=t,this.splashAt[a*3+2]=n,this.splashBorn[a]=this.time,this.splashed++}dispose(){this.scene.remove(this.mesh),this.scene.remove(this.splashMesh),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.splashMesh.geometry.dispose(),this.splashMesh.material.dispose()}}const j=3;class Y{constructor(s=k){this.loopUrl=s}context=null;gain=null;noise=null;playing=!1;ensure(){if(!this.context)try{const s=this.context=new AudioContext,t=Math.floor(s.sampleRate*2);this.noise=s.createBuffer(1,t,s.sampleRate);const n=this.noise.getChannelData(0);let o=12345;for(let i=0;i<t;i++)o=o*1103515245+12345>>>0,n[i]=o/4294967296*2-1;this.gain=s.createGain(),this.gain.gain.value=0;const l=s.createBiquadFilter();l.type="lowpass",l.frequency.value=4e3,l.connect(this.gain).connect(s.destination),fetch(this.loopUrl).then(i=>i.arrayBuffer()).then(i=>s.decodeAudioData(i)).then(i=>{const e=s.createBufferSource();e.buffer=i,e.loop=!0,e.connect(l),e.start(),this.playing=!0}).catch(i=>console.warn("rain sound",i))}catch{return null}return this.context.state==="suspended"&&this.context.resume(),this.context}setRain(s,t){if((s<=0||t<=0)&&!this.context)return;const n=this.ensure();!n||!this.gain||this.gain.gain.setTargetAtTime(s*t*j,n.currentTime,.5)}thunder(s){const t=this.ensure();if(!t||!this.noise)return;const n=t.createBufferSource();n.buffer=this.noise;const o=t.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(220,t.currentTime),o.frequency.exponentialRampToValueAtTime(60,t.currentTime+2.5);const l=t.createGain(),i=t.currentTime;l.gain.setValueAtTime(.001,i),l.gain.exponentialRampToValueAtTime(Math.max(.002,.5*s),i+.08),l.gain.exponentialRampToValueAtTime(.001,i+3),n.connect(o).connect(l).connect(t.destination),n.start(i),n.stop(i+3.2)}}export{X as R,Y as a};
