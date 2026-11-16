import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { input } from '../input'

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

// Ashima 3D simplex noise
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

const fragment = /* glsl */ `
uniform vec3 uColorA; uniform vec3 uColorB; uniform float uOpacity;
varying float vMix; varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float glow = smoothstep(0.5, 0.0, d);
  vec3 col = mix(uColorA, uColorB, vMix);
  gl_FragColor = vec4(col, glow * vAlpha * uOpacity);
}`

/** A rolling ocean of particles that flows like a data stream. */
function FlowField() {
  const mat = useRef<THREE.ShaderMaterial>(null!)
  const geo = useMemo(() => {
    const cols = isMobile ? 110 : 190
    const rows = isMobile ? 70 : 110
    const pos = new Float32Array(cols * rows * 3)
    let k = 0
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++) {
        pos[k++] = (i / (cols - 1) - 0.5) * 40
        pos[k++] = 0
        pos[k++] = (j / (rows - 1) - 0.5) * 26
      }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uColorA: { value: new THREE.Color('#f59e0b') },
      uColorB: { value: new THREE.Color('#e11d48') },
      uOpacity: { value: 0.85 },
      uSize: { value: isMobile ? 34 : 42 },
    }),
    [],
  )

  useFrame((_, dt) => {
    const u = mat.current.uniforms
    u.uTime.value += reducedMotion ? dt * 0.15 : dt
    u.uScroll.value += (input.scroll - u.uScroll.value) * 0.06
    u.uMouse.value.lerp(new THREE.Vector2(input.mx, input.my), 0.05)
  })

  return (
    <points geometry={geo} position={[0, -3.2, -4]}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={
          noise +
          /* glsl */ `
          uniform float uTime; uniform float uScroll; uniform vec2 uMouse; uniform float uSize;
          varying float vMix; varying float vAlpha;
          void main(){
            vec3 p = position;
            float t = uTime * 0.25;
            float n = snoise(vec3(p.x * 0.08 + t, p.z * 0.12 - t * 0.6, uScroll * 2.0));
            float waves = sin(p.x * 0.35 + uTime * 0.9) * 0.35 + sin(p.z * 0.5 + uTime * 0.7) * 0.25;
            p.y += n * 1.6 + waves;
            // pointer ripple
            vec2 m = uMouse * vec2(18.0, 10.0);
            float d = distance(p.xz, vec2(m.x, -m.y));
            p.y += sin(d * 1.2 - uTime * 3.0) * exp(-d * 0.22) * 0.9;
            vMix = clamp(0.5 + n * 0.6 + p.x * 0.02 + uScroll * 0.6, 0.0, 1.0);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vAlpha = smoothstep(-34.0, -6.0, mv.z) * smoothstep(20.0, 6.0, abs(p.x));
            gl_PointSize = uSize * (0.35 + n * 0.15) / -mv.z;
            gl_Position = projectionMatrix * mv;
          }`
        }
        fragmentShader={fragment}
      />
    </points>
  )
}

/** A breathing orb of particles — the hero's centrepiece. */
function Orb() {
  const ref = useRef<THREE.Points>(null!)
  const mat = useRef<THREE.ShaderMaterial>(null!)
  const geo = useMemo(() => {
    const count = isMobile ? 4000 : 9000
    const pos = new Float32Array(count * 3)
    // Fibonacci sphere for even distribution
    const phi = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = phi * i
      pos.set([Math.cos(th) * r, y, Math.sin(th) * r], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#fcd34d') },
      uColorB: { value: new THREE.Color('#fb923c') },
      uOpacity: { value: 1 },
      uSize: { value: isMobile ? 26 : 30 },
    }),
    [],
  )

  const { viewport } = useThree()

  useFrame((_, dt) => {
    const s = input.scroll
    const u = mat.current.uniforms
    u.uTime.value += reducedMotion ? dt * 0.15 : dt
    // fade & drift away as the visitor scrolls past the hero
    const fade = THREE.MathUtils.clamp(1 - s * 8, 0, 1)
    u.uOpacity.value = fade
    ref.current.visible = fade > 0.01
    const targetX = isMobile ? 0 : viewport.width * 0.27
    ref.current.position.x += (targetX - ref.current.position.x) * 0.08
    ref.current.position.y += ((isMobile ? 1.2 : 0.2) + s * 6 - ref.current.position.y) * 0.08
    ref.current.rotation.y += dt * 0.12 + input.mx * 0.004
    ref.current.rotation.x += (input.my * 0.4 - ref.current.rotation.x) * 0.04
  })

  return (
    <points ref={ref} geometry={geo} scale={isMobile ? 1.5 : 1.9}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={
          noise +
          /* glsl */ `
          uniform float uTime; uniform float uSize;
          varying float vMix; varying float vAlpha;
          void main(){
            vec3 p = position;
            float n = snoise(p * 1.6 + uTime * 0.35);
            float n2 = snoise(p * 4.0 - uTime * 0.2);
            p *= 1.0 + n * 0.22 + n2 * 0.05;
            vMix = clamp(0.5 + n * 0.9, 0.0, 1.0);
            vAlpha = 0.55 + n * 0.45;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = uSize * (0.6 + n * 0.4) / -mv.z;
            gl_Position = projectionMatrix * mv;
          }`
        }
        fragmentShader={fragment}
      />
    </points>
  )
}

function CameraRig() {
  useFrame(({ camera }) => {
    const s = input.scroll
    camera.position.x += (input.mx * 0.6 - camera.position.x) * 0.04
    camera.position.y += (0.6 - s * 1.4 + input.my * 0.3 - camera.position.y) * 0.04
    camera.position.z += (8 - s * 2.5 - camera.position.z) * 0.04
    camera.lookAt(0, -1.2 - s * 0.8, -4)
  })
  return null
}

export default function Scene({ orb = true }: { orb?: boolean }) {
  return (
    <Canvas
      className="scene"
      camera={{ position: [0, 0.6, 8], fov: 55 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
    >
      <CameraRig />
      <FlowField />
      {orb && <Orb />}
    </Canvas>
  )
}
