import{B as L,k as D,a4 as x,t as U,V as B,l as V,L as C,v as F,a as q,x as T,C as G,K as I,d as O,M as _}from"./prng-DCV7dpsb.js";const P="/voxel-web/assets/rain-BTeDtDei.ogg",k=`
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
`,E=`
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
`;class W{constructor(i,t){this.scene=i,this.settings=t;const n=t.rainDrops;this.positions=new Float32Array(n*6),this.floors=new Float32Array(n),this.positions.fill(-1e5);const o=new L;o.setAttribute("position",new D(this.positions,3).setUsage(x)),o.boundingSphere=new U(new B,1e6);const h=new V({color:14213868,transparent:!0,opacity:t.dropOpacity,depthWrite:!1});this.mesh=new C(o,h),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.mesh.visible=!1,i.add(this.mesh);const e=Math.max(1,t.splashes);this.splashAt=new Float32Array(e*3),this.splashBorn=new Float32Array(e).fill(-1e5);const s=new F,a=new q(2,2);s.setAttribute("position",a.getAttribute("position")),s.setIndex(a.getIndex()),s.setAttribute("splash",new T(this.splashAt,3).setUsage(x)),s.setAttribute("born",new T(this.splashBorn,1).setUsage(x)),s.instanceCount=e,s.boundingSphere=new U(new B,1e6),this.splashUniforms={time:{value:0},life:{value:t.splashSeconds},size:{value:t.splashSize},color:{value:new G(15002868)},opacity:{value:.55}};const c=new I({vertexShader:k,fragmentShader:E,uniforms:this.splashUniforms,transparent:!0,depthWrite:!1,side:O});this.splashMesh=new _(s,c),this.splashMesh.frustumCulled=!1,this.splashMesh.renderOrder=2,this.splashMesh.visible=!1,i.add(this.splashMesh)}mesh;splashMesh;settings;positions;floors;splashAt;splashBorn;splashUniforms;nextSplash=0;time=0;active=0;splashed=0;update(i,t,n,o,h,e){const s=this.settings;this.time+=i,this.mesh.material.opacity=s.dropOpacity,this.splashUniforms.time.value=this.time,this.splashUniforms.life.value=s.splashSeconds,this.splashUniforms.size.value=s.splashSize;const a=this.positions,c=Math.round(Math.min(s.rainDrops,this.floors.length)*Math.min(1,h));this.mesh.visible=c>0||this.active>0,this.splashMesh.visible=this.mesh.visible;const m=s.dropSpeed*i,f=s.area/2,g=s.dropLength,u=n*s.dropLean,d=o*s.dropLean,v=1/Math.sqrt(u*u+1+d*d),z=s.splashRange*s.splashRange;for(let l=0;l<this.floors.length;l++){const r=l*6;if(l>=c){l<this.active&&a.fill(-1e5,r,r+6);continue}let p=a[r+1];const y=p<-1e4,w=Math.abs(a[r]-t.x)>f||Math.abs(a[r+2]-t.z)>f;if(!y&&!w&&p<=this.floors[l]&&this.splash(a[r],this.floors[l],a[r+2],t,z),y||w||p<=this.floors[l]){const b=t.x+(Math.random()*2-1)*f,S=t.z+(Math.random()*2-1)*f,A=t.y+s.area*(.3+.7*Math.random());this.floors[l]=e(b,S,A),p=y?A:t.y+s.area*Math.random()-s.area*.2,a[r]=b,a[r+2]=S,p<=this.floors[l]&&(p=A)}p-=m,a[r]+=u*m,a[r+2]+=d*m,a[r+1]=p,a[r+3]=a[r]-u*v*g,a[r+4]=p+v*g,a[r+5]=a[r+2]-d*v*g}this.active=c,this.mesh.geometry.getAttribute("position").needsUpdate=!0;const M=this.splashMesh.geometry;M.getAttribute("splash").needsUpdate=!0,M.getAttribute("born").needsUpdate=!0}splash(i,t,n,o,h){const e=i-o.x,s=n-o.z;if(e*e+s*s>h)return;const a=this.nextSplash;this.nextSplash=(a+1)%this.splashBorn.length,this.splashAt[a*3]=i,this.splashAt[a*3+1]=t,this.splashAt[a*3+2]=n,this.splashBorn[a]=this.time,this.splashed++}dispose(){this.scene.remove(this.mesh),this.scene.remove(this.splashMesh),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.splashMesh.geometry.dispose(),this.splashMesh.material.dispose()}}const N=3;class j{constructor(i=P){this.loopUrl=i}context=null;gain=null;noise=null;playing=!1;ensure(){if(!this.context)try{const i=this.context=new AudioContext,t=Math.floor(i.sampleRate*2);this.noise=i.createBuffer(1,t,i.sampleRate);const n=this.noise.getChannelData(0);let o=12345;for(let e=0;e<t;e++)o=o*1103515245+12345>>>0,n[e]=o/4294967296*2-1;this.gain=i.createGain(),this.gain.gain.value=0;const h=i.createBiquadFilter();h.type="lowpass",h.frequency.value=4e3,h.connect(this.gain).connect(i.destination),fetch(this.loopUrl).then(e=>e.arrayBuffer()).then(e=>i.decodeAudioData(e)).then(e=>{const s=i.createBufferSource();s.buffer=e,s.loop=!0,s.connect(h),s.start(),this.playing=!0}).catch(e=>console.warn("rain sound",e))}catch{return null}return this.context.state==="suspended"&&this.context.resume(),this.context}setRain(i,t){if((i<=0||t<=0)&&!this.context)return;const n=this.ensure();!n||!this.gain||this.gain.gain.setTargetAtTime(i*t*N,n.currentTime,.5)}thunder(i){const t=this.ensure();if(!t||!this.noise)return;const n=t.createBufferSource();n.buffer=this.noise;const o=t.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(220,t.currentTime),o.frequency.exponentialRampToValueAtTime(60,t.currentTime+2.5);const h=t.createGain(),e=t.currentTime;h.gain.setValueAtTime(.001,e),h.gain.exponentialRampToValueAtTime(Math.max(.002,.5*i),e+.08),h.gain.exponentialRampToValueAtTime(.001,e+3),n.connect(o).connect(h).connect(t.destination),n.start(e),n.stop(e+3.2)}}export{W as R,j as a};
