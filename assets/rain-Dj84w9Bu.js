import{B as z,k as F,a4 as x,t as B,V as U,l as V,L as C,v as L,a as D,x as T,C as G,K as I,d as O,M as P}from"./prng-DCV7dpsb.js";const _=`
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
`,k=`
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
`;class H{constructor(i,e){this.scene=i,this.settings=e;const n=e.rainDrops;this.positions=new Float32Array(n*6),this.floors=new Float32Array(n),this.positions.fill(-1e5);const o=new z;o.setAttribute("position",new F(this.positions,3).setUsage(x)),o.boundingSphere=new B(new U,1e6);const h=new V({color:14213868,transparent:!0,opacity:e.dropOpacity,depthWrite:!1});this.mesh=new C(o,h),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.mesh.visible=!1,i.add(this.mesh);const a=Math.max(1,e.splashes);this.splashAt=new Float32Array(a*3),this.splashBorn=new Float32Array(a).fill(-1e5);const t=new L,s=new D(2,2);t.setAttribute("position",s.getAttribute("position")),t.setIndex(s.getIndex()),t.setAttribute("splash",new T(this.splashAt,3).setUsage(x)),t.setAttribute("born",new T(this.splashBorn,1).setUsage(x)),t.instanceCount=a,t.boundingSphere=new B(new U,1e6),this.splashUniforms={time:{value:0},life:{value:e.splashSeconds},size:{value:e.splashSize},color:{value:new G(15002868)},opacity:{value:.55}};const c=new I({vertexShader:_,fragmentShader:k,uniforms:this.splashUniforms,transparent:!0,depthWrite:!1,side:O});this.splashMesh=new P(t,c),this.splashMesh.frustumCulled=!1,this.splashMesh.renderOrder=2,this.splashMesh.visible=!1,i.add(this.splashMesh)}mesh;splashMesh;settings;positions;floors;splashAt;splashBorn;splashUniforms;nextSplash=0;time=0;active=0;splashed=0;update(i,e,n,o,h,a){const t=this.settings;this.time+=i,this.mesh.material.opacity=t.dropOpacity,this.splashUniforms.time.value=this.time,this.splashUniforms.life.value=t.splashSeconds,this.splashUniforms.size.value=t.splashSize;const s=this.positions,c=Math.round(Math.min(t.rainDrops,this.floors.length)*Math.min(1,h));this.mesh.visible=c>0||this.active>0,this.splashMesh.visible=this.mesh.visible;const m=t.dropSpeed*i,u=t.area/2,g=t.dropLength,f=n*t.dropLean,d=o*t.dropLean,v=1/Math.sqrt(f*f+1+d*d),q=t.splashRange*t.splashRange;for(let l=0;l<this.floors.length;l++){const r=l*6;if(l>=c){l<this.active&&s.fill(-1e5,r,r+6);continue}let p=s[r+1];const y=p<-1e4,w=Math.abs(s[r]-e.x)>u||Math.abs(s[r+2]-e.z)>u;if(!y&&!w&&p<=this.floors[l]&&this.splash(s[r],this.floors[l],s[r+2],e,q),y||w||p<=this.floors[l]){const b=e.x+(Math.random()*2-1)*u,S=e.z+(Math.random()*2-1)*u,A=e.y+t.area*(.3+.7*Math.random());this.floors[l]=a(b,S,A),p=y?A:e.y+t.area*Math.random()-t.area*.2,s[r]=b,s[r+2]=S,p<=this.floors[l]&&(p=A)}p-=m,s[r]+=f*m,s[r+2]+=d*m,s[r+1]=p,s[r+3]=s[r]+f*v*g,s[r+4]=p+v*g,s[r+5]=s[r+2]+d*v*g}this.active=c,this.mesh.geometry.getAttribute("position").needsUpdate=!0;const M=this.splashMesh.geometry;M.getAttribute("splash").needsUpdate=!0,M.getAttribute("born").needsUpdate=!0}splash(i,e,n,o,h){const a=i-o.x,t=n-o.z;if(a*a+t*t>h)return;const s=this.nextSplash;this.nextSplash=(s+1)%this.splashBorn.length,this.splashAt[s*3]=i,this.splashAt[s*3+1]=e,this.splashAt[s*3+2]=n,this.splashBorn[s]=this.time,this.splashed++}dispose(){this.scene.remove(this.mesh),this.scene.remove(this.splashMesh),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.splashMesh.geometry.dispose(),this.splashMesh.material.dispose()}}class W{context=null;gain=null;noise=null;ensure(){if(!this.context)try{const i=this.context=new AudioContext,e=Math.floor(i.sampleRate*2);this.noise=i.createBuffer(1,e,i.sampleRate);const n=this.noise.getChannelData(0);let o=12345;for(let c=0;c<e;c++)o=o*1103515245+12345>>>0,n[c]=o/4294967296*2-1;const h=i.createBufferSource();h.buffer=this.noise,h.loop=!0;const a=i.createBiquadFilter();a.type="lowpass",a.frequency.value=650;const t=i.createBiquadFilter();t.type="lowpass",t.frequency.value=900;const s=i.createBiquadFilter();s.type="highpass",s.frequency.value=120,this.gain=i.createGain(),this.gain.gain.value=0,h.connect(s).connect(a).connect(t).connect(this.gain).connect(i.destination),h.start()}catch{return null}return this.context.state==="suspended"&&this.context.resume(),this.context}setRain(i,e){if((i<=0||e<=0)&&!this.context)return;const n=this.ensure();!n||!this.gain||this.gain.gain.setTargetAtTime(i*e*.25,n.currentTime,.5)}thunder(i){const e=this.ensure();if(!e||!this.noise)return;const n=e.createBufferSource();n.buffer=this.noise;const o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(220,e.currentTime),o.frequency.exponentialRampToValueAtTime(60,e.currentTime+2.5);const h=e.createGain(),a=e.currentTime;h.gain.setValueAtTime(.001,a),h.gain.exponentialRampToValueAtTime(Math.max(.002,.5*i),a+.08),h.gain.exponentialRampToValueAtTime(.001,a+3),n.connect(o).connect(h).connect(e.destination),n.start(a),n.stop(a+3.2)}}export{H as R,W as a};
