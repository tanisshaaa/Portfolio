import { useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import { Text, RoundedBox, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// Subtle Far-Background Code Rain
function BackgroundCodeRain() {
  const group = useRef<THREE.Group>(null);
  const count = 75; // Kept reasonable for high performance
  
  const particles = useMemo(() => {
    const chars = [
      'Claude', 'ChatGPT', 'Grok', 'LLM', 'Prompt', 'Hello World', '</html>', 'NLP',
      'Machine Learning', 'Fine-tuning', 'RAG', 'Agentic AI', 'FastAPI', 'Docker',
      'n8n', 'Power BI', 'Hugging Face', 'LangChain', 'OpenAI API', 'SQL', 'React'
    ];
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 40,
      z: -15 - Math.random() * 15, // Pushed far behind the table (z = -15 to -30)
      speed: 0.02 + Math.random() * 0.05,
      char: chars[Math.floor(Math.random() * chars.length)],
      scale: 0.8 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.3, // Very subtle transparency
      color: Math.random() > 0.8 ? '#ff00c1' : '#00fff9'
    }));
  }, []);

  useFrame(() => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const p = particles[i];
      p.y -= p.speed; // Falling downwards
      if (p.y < -20) p.y = 20; // Loop back to top
      child.position.set(p.x, p.y, p.z);
    });
  });

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <Text 
          key={i} 
          position={[p.x, p.y, p.z]} 
          fontSize={0.5 * p.scale} 
          color={p.color} 
          fillOpacity={p.opacity}
        >
          {p.char}
        </Text>
      ))}
    </group>
  );
}

// ---------- Procedural geometry / texture helpers ----------

function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

// Flat slab lying in the XZ plane with rounded corners and softly bevelled edges
type RoundedSlabProps = ThreeElements['mesh'] & {
  size: [number, number, number]; // width (x), thickness (y), depth (z)
  radius: number;
  bevel?: number;
};
function RoundedSlab({ size, radius, bevel = 0.004, children, ...props }: RoundedSlabProps) {
  const [w, h, d] = size;
  const geometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(
      roundedRectShape(w - bevel * 2, d - bevel * 2, Math.max(radius - bevel, 0.001)),
      {
        depth: Math.max(h - bevel * 2, 0.0001),
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
        curveSegments: 10,
      }
    );
    g.center();
    g.rotateX(-Math.PI / 2);
    return g;
  }, [w, h, d, radius, bevel]);

  return (
    <mesh geometry={geometry} {...props}>
      {children}
    </mesh>
  );
}

// Rounded-rect plane; faces +Z, or +Y when `flat`
type RoundedPlaneProps = ThreeElements['mesh'] & {
  size: [number, number];
  radius: number;
  flat?: boolean;
};
function RoundedPlane({ size, radius, flat = false, children, ...props }: RoundedPlaneProps) {
  const [w, h] = size;
  const geometry = useMemo(() => {
    const g = new THREE.ShapeGeometry(roundedRectShape(w, h, radius), 10);
    if (flat) g.rotateX(-Math.PI / 2);
    return g;
  }, [w, h, radius, flat]);

  return (
    <mesh geometry={geometry} {...props}>
      {children}
    </mesh>
  );
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function createWoodTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const rand = seededRandom(11);

  ctx.fillStyle = '#c49a6c';
  ctx.fillRect(0, 0, size, size);

  // Broad tonal bands
  for (let i = 0; i < 18; i++) {
    ctx.fillStyle = `rgba(${rand() > 0.5 ? '150, 104, 64' : '222, 186, 142'}, ${0.05 + rand() * 0.08})`;
    ctx.fillRect(0, rand() * size, size, 10 + rand() * 40);
  }

  // Fine wavy grain lines
  for (let i = 0; i < 160; i++) {
    const y0 = rand() * size;
    const amp = 1.5 + rand() * 6;
    const freq = 0.004 + rand() * 0.012;
    const phase = rand() * Math.PI * 2;
    ctx.strokeStyle = rand() > 0.35
      ? `rgba(110, 70, 40, ${0.06 + rand() * 0.16})`
      : `rgba(240, 206, 166, ${0.05 + rand() * 0.12})`;
    ctx.lineWidth = 0.5 + rand() * 2.2;
    ctx.beginPath();
    for (let x = 0; x <= size; x += 8) {
      const y = y0 + Math.sin(x * freq + phase) * amp;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

function createRuledPaperTexture() {
  const w = 512;
  const h = 640;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#fbf8f1';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(120, 155, 205, 0.45)';
  ctx.lineWidth = 1.5;
  for (let y = 70; y < h - 10; y += 22) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(220, 110, 110, 0.55)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, 0);
  ctx.lineTo(64, h);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function createWallpaperTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#f6cdb9');
  grad.addColorStop(0.45, '#e39a95');
  grad.addColorStop(1, '#6e3f55');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 512);

  const glow = ctx.createRadialGradient(180, 140, 10, 180, 140, 220);
  glow.addColorStop(0, 'rgba(255, 240, 225, 0.55)');
  glow.addColorStop(1, 'rgba(255, 240, 225, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 256, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------- Props ----------

// Rows of key widths (in key units) and row depth for the laptop keyboard
const KEY_ROWS: { keys: number[]; depth: number }[] = [
  { keys: Array(14).fill(1), depth: 0.04 },
  { keys: [...Array(13).fill(1), 1.5], depth: 0.074 },
  { keys: [1.5, ...Array(12).fill(1), 1], depth: 0.074 },
  { keys: [1.75, ...Array(11).fill(1), 1.75], depth: 0.074 },
  { keys: [2.25, ...Array(10).fill(1), 2.25], depth: 0.074 },
  { keys: [1, 1, 1, 1.25, 5, 1.25, 1, 1, 1, 1], depth: 0.074 },
];

function LaptopKeyboard() {
  const ref = useRef<THREE.InstancedMesh>(null);

  const layout = useMemo(() => {
    const rowWidth = 1.24;
    const gap = 0.012;
    const keys: { x: number; z: number; w: number; d: number }[] = [];
    const totalDepth = KEY_ROWS.reduce((sum, row) => sum + row.depth, 0) + gap * (KEY_ROWS.length - 1);
    let z = -totalDepth / 2;
    KEY_ROWS.forEach((row) => {
      const units = row.keys.reduce((sum, u) => sum + u, 0);
      const unit = (rowWidth - gap * (row.keys.length - 1)) / units;
      let x = -rowWidth / 2;
      row.keys.forEach((u) => {
        const w = u * unit;
        keys.push({ x: x + w / 2, z: z + row.depth / 2, w, d: row.depth });
        x += w + gap;
      });
      z += row.depth + gap;
    });
    return keys;
  }, []);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    const quat = new THREE.Quaternion();
    layout.forEach((k, i) => {
      matrix.compose(new THREE.Vector3(k.x, 0, k.z), quat, new THREE.Vector3(k.w, 1, k.d));
      mesh.setMatrixAt(i, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [layout]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, layout.length]} castShadow receiveShadow>
      <boxGeometry args={[1, 0.006, 1]} />
      <meshStandardMaterial color="#1c1c1f" roughness={0.55} metalness={0.1} />
    </instancedMesh>
  );
}

const ALUMINUM = { color: '#d4d6d9', metalness: 1, roughness: 0.32 } as const;

// Realistic Laptop
function ClayLaptop({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const progress = scrollRef.current || 0;
    // Phase 1: 0.0 to 0.4 -> Laptop floats up
    let floatProgress = Math.min(progress / 0.4, 1.0);
    // Apply smoothstep easing for buttery transition
    floatProgress = floatProgress * floatProgress * (3 - 2 * floatProgress);
    
    // Smoothly animate Position from the desk to right in front of the camera
    const startPos = new THREE.Vector3(-1.4, 0.45, 0.4);
    const endPos = new THREE.Vector3(0, 1.6, 3.5); // Floating front and center
    const targetPos = new THREE.Vector3().lerpVectors(startPos, endPos, floatProgress);
    groupRef.current.position.lerp(targetPos, 0.1);

    // Smoothly animate Rotation to face the user perfectly
    const startRotX = 0;
    const startRotY = 0.4;
    const endRotX = 0.15; // Slightly tilted up to face the looking-down camera
    const endRotY = 0;    // Straight on

    const targetRotX = startRotX + (endRotX - startRotX) * floatProgress;
    const targetRotY = startRotY + (endRotY - startRotY) * floatProgress;
    
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.1;
  });

  return (
    <group ref={groupRef} position={[-1.4, 0.45, 0.4]} rotation={[0, 0.4, 0]}>
      {/* Offset so the rubber feet rest on the laptop pedestal */}
      <group position={[0, -0.06, 0]}>
        {/* Unibody aluminum base */}
        <RoundedSlab size={[1.5, 0.045, 1.05]} radius={0.06} bevel={0.008} castShadow receiveShadow>
          <meshStandardMaterial {...ALUMINUM} />
        </RoundedSlab>

        {/* Rubber feet */}
        {[[-0.62, -0.42], [0.62, -0.42], [-0.62, 0.42], [0.62, 0.42]].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.0265, z]}>
            <cylinderGeometry args={[0.03, 0.03, 0.008, 16]} />
            <meshStandardMaterial color="#2a2a2c" roughness={0.9} />
          </mesh>
        ))}

        {/* Keyboard well + keys */}
        <RoundedPlane flat size={[1.3, 0.52]} radius={0.02} position={[0, 0.0227, -0.14]} receiveShadow>
          <meshStandardMaterial color="#121214" roughness={0.75} />
        </RoundedPlane>
        <group position={[0, 0.0257, -0.14]}>
          <LaptopKeyboard />
        </group>

        {/* Speaker grilles */}
        {[-0.7, 0.7].map((x) => (
          <RoundedPlane key={x} flat size={[0.04, 0.5]} radius={0.01} position={[x, 0.0227, -0.14]}>
            <meshStandardMaterial color="#6d7074" roughness={0.85} metalness={0.6} />
          </RoundedPlane>
        ))}

        {/* Glass trackpad */}
        <RoundedSlab size={[0.62, 0.003, 0.34]} radius={0.025} bevel={0.001} position={[0, 0.0225, 0.31]} receiveShadow>
          <meshPhysicalMaterial color="#c6c9cd" metalness={0.85} roughness={0.42} clearcoat={0.4} clearcoatRoughness={0.3} />
        </RoundedSlab>

        {/* Display hinge */}
        <mesh position={[0, 0.024, -0.51]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 1.2, 24]} />
          <meshStandardMaterial color="#2c2d30" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Display (hinged at the back, angled away from the user) */}
        <group position={[0, 0.04, -0.52]} rotation={[-0.2, 0, 0]}>
          {/* Thin aluminum lid */}
          <group position={[0, 0.5, -0.008]} rotation={[Math.PI / 2, 0, 0]}>
            <RoundedSlab size={[1.5, 0.014, 1.0]} radius={0.06} bevel={0.005} castShadow>
              <meshStandardMaterial {...ALUMINUM} />
            </RoundedSlab>
          </group>

          {/* Polished logo on the back of the lid */}
          <mesh position={[0, 0.52, -0.0156]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.06, 32]} />
            <meshStandardMaterial color="#eef0f2" metalness={1} roughness={0.08} />
          </mesh>

          {/* Glossy black bezel */}
          <RoundedPlane size={[1.47, 0.97]} radius={0.05} position={[0, 0.5, 0.0002]}>
            <meshPhysicalMaterial color="#0b0b0d" roughness={0.2} clearcoat={1} clearcoatRoughness={0.05} />
          </RoundedPlane>

          {/* Screen (off, faint warm glow) */}
          <RoundedPlane size={[1.4, 0.88]} radius={0.012} position={[0, 0.51, 0.0008]}>
            <meshPhysicalMaterial
              color="#040506"
              roughness={0.05}
              clearcoat={1}
              clearcoatRoughness={0.02}
              emissive="#2a1820"
              emissiveIntensity={0.15}
            />
          </RoundedPlane>

          {/* Webcam */}
          <mesh position={[0, 0.968, 0.001]}>
            <circleGeometry args={[0.007, 16]} />
            <meshStandardMaterial color="#1c2230" roughness={0.1} metalness={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// Ergonomic mouse body profile, t: 0 = front tip, 1 = back
const MOUSE_HALF_LENGTH = 0.15;
function mouseProfile(t: number) {
  return {
    halfWidth: 0.05 + 0.014 * Math.sin((Math.min(t * 1.4, 1) * Math.PI) / 2),
    height: 0.032 + 0.04 * Math.sin((Math.min(t * 1.3, 1) * Math.PI) / 2),
  };
}
function mouseTopY(z: number) {
  const zn = z / MOUSE_HALF_LENGTH;
  return mouseProfile((zn + 1) / 2).height * Math.sqrt(Math.max(0, 1 - zn * zn));
}

// Realistic Mouse
function ClayMouse() {
  const shellGeometry = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 48, 32);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const { halfWidth, height } = mouseProfile((z + 1) / 2);
      pos.setXYZ(i, x * halfWidth, y > 0 ? y * height : y * 0.012, z * MOUSE_HALF_LENGTH);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  const splitGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 12; i++) {
      const z = -MOUSE_HALF_LENGTH * 0.97 + (i / 12) * (MOUSE_HALF_LENGTH * 0.97 - 0.01);
      points.push(new THREE.Vector3(0, mouseTopY(z) + 0.0004, z));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 24, 0.0016, 6);
  }, []);

  const wheelZ = -0.07;
  const wheelY = mouseTopY(wheelZ);

  return (
    <group position={[-0.2, 0.25, 0.7]} rotation={[0, -0.3, 0]}>
      <group position={[0, 0.012, 0]}>
        {/* Sculpted shell (satin plastic) */}
        <mesh geometry={shellGeometry} castShadow receiveShadow>
          <meshPhysicalMaterial color="#2a2a2e" roughness={0.5} clearcoat={0.25} clearcoatRoughness={0.5} />
        </mesh>

        {/* Left / right button split */}
        <mesh geometry={splitGeometry}>
          <meshStandardMaterial color="#0c0c0e" roughness={0.9} />
        </mesh>

        {/* Scroll wheel slot */}
        <mesh position={[0, wheelY - 0.003, wheelZ]}>
          <boxGeometry args={[0.018, 0.01, 0.036]} />
          <meshStandardMaterial color="#0a0a0b" roughness={0.9} />
        </mesh>

        {/* Rubberized scroll wheel */}
        <mesh position={[0, wheelY - 0.002, wheelZ]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.01, 20]} />
          <meshStandardMaterial color="#45454a" roughness={0.6} metalness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// Realistic Smartphone
function ClayPhones() {
  const wallpaper = useMemo(() => createWallpaperTexture(), []);
  const top = 0.012;

  return (
    <group>
      <group position={[-1.1, 0.262, 2.2]} rotation={[0, 0.25, 0]}>
        {/* Titanium frame + back */}
        <RoundedSlab size={[0.33, 0.024, 0.68]} radius={0.05} bevel={0.006} castShadow receiveShadow>
          <meshStandardMaterial color="#8f8b86" metalness={1} roughness={0.3} />
        </RoundedSlab>

        {/* Side buttons */}
        <mesh position={[-0.166, 0, -0.17]}>
          <boxGeometry args={[0.006, 0.01, 0.07]} />
          <meshStandardMaterial color="#8f8b86" metalness={1} roughness={0.3} />
        </mesh>
        <mesh position={[0.166, 0, -0.12]}>
          <boxGeometry args={[0.006, 0.01, 0.1]} />
          <meshStandardMaterial color="#8f8b86" metalness={1} roughness={0.3} />
        </mesh>

        {/* Front glass */}
        <RoundedPlane flat size={[0.322, 0.672]} radius={0.046} position={[0, top + 0.0001, 0]}>
          <meshPhysicalMaterial color="#050506" roughness={0.05} clearcoat={1} clearcoatRoughness={0.02} />
        </RoundedPlane>

        {/* Lock screen wallpaper */}
        <RoundedPlane flat size={[0.304, 0.654]} radius={0.04} position={[0, top + 0.0004, 0]}>
          <meshStandardMaterial
            map={wallpaper}
            emissiveMap={wallpaper}
            emissive="#ffffff"
            emissiveIntensity={0.55}
            roughness={0.15}
          />
        </RoundedPlane>

        {/* Dynamic island */}
        <RoundedPlane flat size={[0.075, 0.022]} radius={0.011} position={[0, top + 0.0008, -0.3]}>
          <meshBasicMaterial color="#000000" />
        </RoundedPlane>

        {/* Date + clock */}
        <Text
          position={[0, top + 0.0008, -0.245]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.016}
          color="#fff6f0"
          anchorX="center"
          anchorY="middle"
        >
          Thursday, October 22
        </Text>
        <Text
          position={[0, top + 0.0008, -0.19]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.075}
          color="#fff6f0"
          anchorX="center"
          anchorY="middle"
        >
          9:41
        </Text>

        {/* Notification cards */}
        {[-0.05, 0.035].map((z, i) => (
          <group key={z} position={[0, top + 0.0008, z]}>
            <RoundedPlane flat size={[0.28, 0.07]} radius={0.018}>
              <meshBasicMaterial color="#ffffff" transparent opacity={0.5} depthWrite={false} />
            </RoundedPlane>
            <RoundedPlane flat size={[0.04, 0.04]} radius={0.01} position={[-0.105, 0.0002, 0]}>
              <meshBasicMaterial color={i === 0 ? '#d97757' : '#4f8df5'} />
            </RoundedPlane>
            <RoundedPlane flat size={[0.14, 0.009]} radius={0.004} position={[0.005, 0.0002, -0.01]}>
              <meshBasicMaterial color="#3a2a30" transparent opacity={0.7} depthWrite={false} />
            </RoundedPlane>
            <RoundedPlane flat size={[0.18, 0.008]} radius={0.004} position={[0.025, 0.0002, 0.011]}>
              <meshBasicMaterial color="#3a2a30" transparent opacity={0.4} depthWrite={false} />
            </RoundedPlane>
          </group>
        ))}

        {/* Flashlight / camera shortcuts */}
        {[-0.105, 0.105].map((x) => (
          <mesh key={x} position={[x, top + 0.0008, 0.26]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.022, 24]} />
            <meshBasicMaterial color="#2a1a22" transparent opacity={0.45} depthWrite={false} />
          </mesh>
        ))}

        {/* Home indicator */}
        <RoundedPlane flat size={[0.11, 0.006]} radius={0.003} position={[0, top + 0.0008, 0.312]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.85} depthWrite={false} />
        </RoundedPlane>
      </group>
    </group>
  );
}

// Realistic Stainless Steel Tumbler
function ClayTumbler() {
  const bodyGeometry = useMemo(() => {
    const profile = [
      [0, 0], [0.135, 0], [0.148, 0.008], [0.152, 0.03], [0.155, 0.12],
      [0.165, 0.28], [0.176, 0.42], [0.18, 0.445], [0.183, 0.452], [0.183, 0.46],
    ].map(([r, y]) => new THREE.Vector2(r, y));
    return new THREE.LatheGeometry(profile, 64);
  }, []);

  return (
    <group position={[-2.2, 0.25, 1.2]} rotation={[0, 0.5, 0]}>
      {/* Brushed stainless body */}
      <mesh geometry={bodyGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial color="#c9ccd0" metalness={1} roughness={0.26} clearcoat={0.2} clearcoatRoughness={0.3} />
      </mesh>
      
      {/* Lid (Black Plastic) */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.178, 0.186, 0.04, 48]} />
        <meshPhysicalMaterial color="#151517" roughness={0.45} clearcoat={0.3} clearcoatRoughness={0.4} />
      </mesh>
      <mesh position={[0, 0.502, 0]}>
        <cylinderGeometry args={[0.04, 0.045, 0.006, 32]} />
        <meshStandardMaterial color="#2a2a2d" roughness={0.6} />
      </mesh>
      
      {/* Straw (Tinted Acrylic) */}
      <mesh position={[0, 0.65, 0]} rotation={[0.1, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.35, 16]} />
        <meshPhysicalMaterial color="#f7d9cf" transmission={0.9} roughness={0.08} thickness={0.03} ior={1.49} />
      </mesh>
    </group>
  );
}

// Realistic Perfume Bottle
function ClayPerfume() {
  return (
    <group position={[1.45, 0.25, 0.9]} rotation={[0, -0.4, 0]}>
      {/* Glass body with rosy liquid tint */}
      <RoundedBox args={[0.2, 0.32, 0.1]} radius={0.018} smoothness={4} position={[0, 0.16, 0]} castShadow>
        <meshPhysicalMaterial
          color="#fff6f3"
          transmission={1}
          roughness={0.04}
          thickness={0.12}
          ior={1.5}
          attenuationColor="#f0a493"
          attenuationDistance={0.35}
          clearcoat={1}
          clearcoatRoughness={0.03}
        />
      </RoundedBox>
      
      {/* Label */}
      <group position={[0, 0.16, 0.0505]}>
        <mesh>
          <planeGeometry args={[0.12, 0.11]} />
          <meshStandardMaterial color="#f6efe6" roughness={0.85} />
        </mesh>
        <Text
          position={[0, 0.008, 0.001]}
          fontSize={0.018}
          color="#8a6a3a"
          anchorX="center"
          anchorY="middle"
        >
          fragrance
        </Text>
        <Text
          position={[0, -0.018, 0.001]}
          fontSize={0.008}
          letterSpacing={0.2}
          color="#8a6a3a"
          anchorX="center"
          anchorY="middle"
        >
          EAU DE PARFUM
        </Text>
      </group>
      
      {/* Neck collar (Gold) */}
      <mesh position={[0, 0.333, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.032, 0.026, 24]} />
        <meshStandardMaterial color="#d6b17a" roughness={0.18} metalness={1.0} />
      </mesh>
      
      {/* Cap (Gold) */}
      <mesh position={[0, 0.39, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.055, 0.09, 48]} />
        <meshPhysicalMaterial color="#d6b17a" roughness={0.16} metalness={1} clearcoat={0.5} clearcoatRoughness={0.1} />
      </mesh>
    </group>
  );
}

// Realistic Notepad
function ClayNotepad() {
  const paper = useMemo(() => createRuledPaperTexture(), []);
  const ringXs = useMemo(() => Array.from({ length: 16 }, (_, i) => -0.42 + (i * 0.84) / 15), []);

  return (
    <group position={[0.45, 0.26, 1.4]} rotation={[0, -0.4, 0]}>
      {/* Greyboard backing */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.02, 1.3]} />
        <meshStandardMaterial color="#8b8178" roughness={0.95} />
      </mesh>
      
      {/* Paper stack */}
      <mesh position={[0, 0.025, -0.01]} castShadow receiveShadow>
        <boxGeometry args={[0.92, 0.03, 1.22]} />
        <meshStandardMaterial color="#f3eee4" roughness={1.0} />
      </mesh>

      {/* Ruled top sheet */}
      <mesh position={[0, 0.0405, -0.01]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.92, 1.22]} />
        <meshStandardMaterial map={paper} roughness={0.95} />
      </mesh>

      {/* Punched holes + spiral wire */}
      {ringXs.map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.041, -0.59]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.009, 12]} />
            <meshBasicMaterial color="#3a3430" />
          </mesh>
          <mesh position={[0, 0.02, -0.625]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <torusGeometry args={[0.045, 0.0045, 6, 20]} />
            <meshStandardMaterial color="#b8bbbf" roughness={0.25} metalness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Realistic Penstand with 6 Rich Writing Tools
function ClayPenstand() {
  const cupGeometry = useMemo(() => {
    const profile = [
      [0, -0.2], [0.25, -0.2], [0.26, -0.19], [0.26, 0.35], [0.255, 0.36],
      [0.235, 0.36], [0.23, 0.35], [0.23, -0.15], [0, -0.15],
    ].map(([r, y]) => new THREE.Vector2(r, y));
    return new THREE.LatheGeometry(profile, 48);
  }, []);

  return (
    <group position={[0.92, 0.45, 0.45]} rotation={[0, -0.2, 0]}>
      {/* Glazed ceramic cup with real wall thickness */}
      <mesh geometry={cupGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial color="#222023" roughness={0.55} clearcoat={0.4} clearcoatRoughness={0.35} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Pen 1: Sleek white metallic ballpoint (angled front-left) */}
      <group position={[-0.09, 0.42, 0.06]} rotation={[0.38, -0.22, 0.15]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.022, 0.022, 0.82, 16]} />
          <meshPhysicalMaterial color="#f0f0f0" roughness={0.25} metalness={0.3} clearcoat={0.8} />
        </mesh>
        {/* Pen clip (Chrome) */}
        <mesh position={[0, 0.2, 0.022]}>
          <boxGeometry args={[0.008, 0.15, 0.012]} />
          <meshStandardMaterial color="#cccccc" roughness={0.1} metalness={1.0} />
        </mesh>
        <mesh position={[0, 0.44, 0]}>
          <coneGeometry args={[0.022, 0.06, 16]} />
          <meshStandardMaterial color="#c8c8cc" roughness={0.15} metalness={1} />
        </mesh>
      </group>

      {/* Pencil 2: Classic hexagonal yellow pencil (angled back-right) */}
      <group position={[0.09, 0.4, -0.06]} rotation={[-0.22, 0.38, -0.28]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.78, 6]} />
          <meshPhysicalMaterial color="#f2b705" roughness={0.45} clearcoat={0.5} />
        </mesh>
        {/* Ferrule (metal) */}
        <mesh position={[0, -0.38, 0]}>
          <cylinderGeometry args={[0.021, 0.021, 0.05, 16]} />
          <meshStandardMaterial color="#b0b0b0" roughness={0.3} metalness={1} />
        </mesh>
        {/* Sharpened wood tip + graphite point */}
        <mesh position={[0, 0.41, 0]}>
          <coneGeometry args={[0.02, 0.05, 6]} />
          <meshStandardMaterial color="#e3c497" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.44, 0]}>
          <coneGeometry args={[0.006, 0.012, 8]} />
          <meshStandardMaterial color="#2b2b2b" roughness={0.4} metalness={0.4} />
        </mesh>
      </group>

      {/* Pencil 3: Blue hexagonal pencil (angled back-left) */}
      <group position={[-0.06, 0.42, -0.09]} rotation={[-0.32, -0.32, -0.12]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.84, 6]} />
          <meshPhysicalMaterial color="#1f5fb8" roughness={0.45} clearcoat={0.5} />
        </mesh>
        <mesh position={[0, 0.445, 0]}>
          <coneGeometry args={[0.018, 0.05, 6]} />
          <meshStandardMaterial color="#e3c497" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.474, 0]}>
          <coneGeometry args={[0.005, 0.01, 8]} />
          <meshStandardMaterial color="#2b2b2b" roughness={0.4} metalness={0.4} />
        </mesh>
      </group>

      {/* Pen 4: Yellow highlighter (angled front-right) */}
      <group position={[0.08, 0.36, 0.09]} rotation={[0.18, 0.22, 0.32]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.032, 0.032, 0.7, 20]} />
          <meshPhysicalMaterial color="#f5e23a" roughness={0.35} clearcoat={0.3} />
        </mesh>
        {/* Marker cap (Black) */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.16, 20]} />
          <meshPhysicalMaterial color="#141414" roughness={0.4} clearcoat={0.3} />
        </mesh>
      </group>

      {/* Ruler 5: Flat wooden ruler (angled straight back) */}
      <group position={[0.02, 0.46, -0.08]} rotation={[-0.15, 0.1, -0.05]}>
        <mesh castShadow>
          <boxGeometry args={[0.07, 0.95, 0.012]} />
          <meshStandardMaterial color="#d6b98f" roughness={0.75} />
        </mesh>
        {/* Ruler ticks */}
        {Array.from({ length: 9 }, (_, i) => (
          <mesh key={i} position={[i % 2 === 0 ? -0.02 : -0.024, 0.1 + i * 0.04, 0.007]}>
            <boxGeometry args={[i % 2 === 0 ? 0.018 : 0.01, 0.002, 0.002]} />
            <meshBasicMaterial color="#2a2018" />
          </mesh>
        ))}
      </group>

      {/* Pen 6: Stylus/digital pen (Apple Pencil style) */}
      <group position={[0.01, 0.41, 0.08]} rotation={[0.28, 0.05, 0.02]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.016, 0.016, 0.78, 16]} />
          <meshPhysicalMaterial color="#fafafa" roughness={0.3} clearcoat={0.6} clearcoatRoughness={0.3} />
        </mesh>
        <mesh position={[0, 0.41, 0]}>
          <coneGeometry args={[0.016, 0.05, 16]} />
          <meshStandardMaterial color="#e6e6e6" roughness={0.35} />
        </mesh>
      </group>
    </group>
  );
}

// Background elements
function BackgroundScenery() {
  const wood = useMemo(() => createWoodTexture(), []);

  return (
    <group position={[0, 0, 0]}>
      {/* Main Pedestal Platform (varnished oak) */}
      <mesh position={[-0.3, 0.1, 0.8]} castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.3, 0.3, 64]} />
        <meshPhysicalMaterial map={wood} roughness={0.6} clearcoat={0.25} clearcoatRoughness={0.45} />
      </mesh>
      
      {/* Secondary laptop pedestal */}
      <mesh position={[-1.4, 0.28, 0.4]} castShadow receiveShadow>
        <cylinderGeometry args={[0.95, 1.0, 0.15, 48]} />
        <meshPhysicalMaterial map={wood} color="#d9d0c2" roughness={0.65} clearcoat={0.2} clearcoatRoughness={0.5} /> {/* Slightly darker wood tier */}
      </mesh>
    </group>
  );
}

// Warm studio reflections, generated locally (no HDR download)
function StudioEnvironment() {
  return (
    <Environment resolution={256} environmentIntensity={0.8}>
      <color attach="background" args={['#4a3a37']} />
      <Lightformer form="rect" intensity={2.2} color="#fff1e8" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 6, 1]} />
      <Lightformer form="rect" intensity={1.4} color="#ffd9cf" position={[-6, 2, 1]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
      <Lightformer form="rect" intensity={1.1} color="#ffe9d6" position={[6, 2, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
      <Lightformer form="rect" intensity={0.9} color="#ffc2b3" position={[0, 2, 7]} scale={[10, 2, 1]} />
    </Environment>
  );
}

// Camera scroll interpolator
function CameraAnimator({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  useFrame((state) => {
    const progress = scrollRef.current || 0;
    
    // Phase 1 (0 to 0.4): Idle parallax
    // Phase 2 (0.4 to 0.7): Dive perfectly into the black laptop screen
    let idleProgress = Math.min(progress / 0.4, 1.0);
    idleProgress = idleProgress * idleProgress * (3 - 2 * idleProgress);
    
    let diveProgress = Math.max(0, Math.min((progress - 0.4) / 0.3, 1.0));
    diveProgress = diveProgress * diveProgress * (3 - 2 * diveProgress); // Smoothstep
    
    // Camera Position Interpolation
    const startPos = new THREE.Vector3(0.1, 2.1, 4.8);
    const idleEndPos = new THREE.Vector3(0.1, 2.0, 4.7);
    const divePos = new THREE.Vector3(0, 2.1, 3.6); // Camera pushed tight enough to fill FOV with black screen, but > 0.1 near plane to avoid clipping

    const targetCamPos = new THREE.Vector3().lerpVectors(startPos, idleEndPos, idleProgress);
    if (diveProgress > 0) {
      targetCamPos.lerpVectors(idleEndPos, divePos, diveProgress);
    }
    state.camera.position.lerp(targetCamPos, 0.08); // Slightly faster lerp for responsive feel
    
    // LookAt Target Interpolation
    const startLook = new THREE.Vector3(-0.3, 1.0, 0.8);
    const idleLook = new THREE.Vector3(-0.3, 1.2, 0.8);
    const diveLook = new THREE.Vector3(0, 2.1, 0); // Looking dead center into the screen
    
    const targetLook = new THREE.Vector3().lerpVectors(startLook, idleLook, idleProgress);
    if (diveProgress > 0) {
      targetLook.lerpVectors(idleLook, diveLook, diveProgress);
    }
    
    state.camera.lookAt(targetLook);
  });
  
  return null;
}

export default function Background() {
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        // Normalize scroll between 0 and 1
        scrollRef.current = window.scrollY / totalHeight;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-canvas-container" style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      <Canvas
        shadows
        camera={{ position: [0.1, 2.1, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft warm rosy ambient light (environment below adds the rest) */}
        <ambientLight intensity={1.0} color="#fff2f0" />
        <StudioEnvironment />
        
        {/* Main soft shadow casting directional light mimicking sunset/golden hour */}
        <directionalLight
          castShadow
          position={[6, 12, 8]}
          intensity={2.2}
          color="#fff5f0"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.001}
          shadow-normalBias={0.02}
        />
        
        {/* Back wall cutout accent light (soft pink-orange) */}
        <pointLight position={[1.4, 1.1, 0.3]} intensity={1.6} distance={3} color="#ff8570" />

        {/* 3D clay components */}
        <BackgroundScenery />
        <ClayLaptop scrollRef={scrollRef} />
        <ClayMouse />
        <ClayPhones />
        <ClayTumbler />
        <ClayPerfume />
        <ClayNotepad />
        <ClayPenstand />

        {/* The subtle code rain happening entirely behind the desk */}
        <BackgroundCodeRain />

        {/* Camera Scroll Controller */}
        <CameraAnimator scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
