import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
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
      {/* Base shadow receiver slab under laptop */}
      <mesh position={[0, -0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.52, 0.02, 1.12]} />
        <meshStandardMaterial color="#c19a6b" roughness={0.9} /> {/* shadow matching desk */}
      </mesh>

      {/* Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.06, 1.1]} />
        <meshStandardMaterial color="#c0c4c8" roughness={0.3} metalness={0.7} /> {/* Silver Aluminum */}
      </mesh>
      
      {/* Keyboard well (darker recessed area, placed centrally-back) */}
      <mesh position={[0, 0.031, -0.1]}>
        <boxGeometry args={[1.3, 0.005, 0.55]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} /> {/* Matte Black Keyboard Area */}
      </mesh>

      {/* Trackpad area (placed in the front) */}
      <mesh position={[0, 0.031, 0.35]}>
        <boxGeometry args={[0.5, 0.005, 0.25]} />
        <meshStandardMaterial color="#b0b4b8" roughness={0.4} metalness={0.5} /> {/* Darker silver trackpad */}
      </mesh>

      {/* Screen Hinge removed as requested */}

      {/* Screen panel (hinged at the back, angled away from the user) */}
      <group position={[0, 0.04, -0.52]} rotation={[-0.2, 0, 0]}>
        {/* Lid cover */}
        <mesh position={[0, 0.5, -0.02]} castShadow>
          <boxGeometry args={[1.5, 1.0, 0.05]} />
          <meshStandardMaterial color="#c0c4c8" roughness={0.3} metalness={0.7} /> {/* Silver Aluminum back */}
        </mesh>
        {/* Inner screen frame */}
        <mesh position={[0, 0.5, 0.01]}>
          <boxGeometry args={[1.38, 0.88, 0.01]} />
          <meshStandardMaterial color="#111111" roughness={0.9} /> {/* Matte Black Bezel */}
        </mesh>
        {/* Screen Face */}
        <mesh position={[0, 0.5, 0.016]}>
          <boxGeometry args={[1.3, 0.8, 0.005]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} /> {/* Glossy dark screen off */}
        </mesh>
      </group>
    </group>
  );
}

// High-Fidelity Ergonomic Mouse -> Realistic Mouse
function ClayMouse() {
  return (
    <group position={[-0.2, 0.25, 0.7]} rotation={[0, -0.3, 0]}>
      {/* Mouse Base shadow-plate */}
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.02, 0.38]} />
        <meshStandardMaterial color="#c19a6b" roughness={0.9} />
      </mesh>

      {/* Main ergonomic dome shell */}
      <group position={[0, 0.06, 0]}>
        {/* Palm Rest (rear hump) */}
        <mesh position={[0, 0.02, 0.08]} scale={[1, 0.75, 1]} castShadow>
          <sphereGeometry args={[0.13, 32, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.7} /> {/* Matte Black Plastic */}
        </mesh>
        
        {/* Thumb Rest Wing (left side) */}
        <mesh position={[-0.1, 0.01, 0.05]} rotation={[0.1, 0, 0.25]} scale={[0.6, 0.3, 1]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#222222" roughness={0.8} /> {/* Slightly different dark plastic */}
        </mesh>

        {/* Left click button */}
        <mesh position={[-0.052, 0.04, -0.08]} rotation={[-0.15, -0.05, 0]} castShadow>
          <boxGeometry args={[0.09, 0.04, 0.18]} />
          <meshStandardMaterial color="#222222" roughness={0.65} />
        </mesh>

        {/* Right click button */}
        <mesh position={[0.052, 0.04, -0.08]} rotation={[-0.15, 0.05, 0]} castShadow>
          <boxGeometry args={[0.09, 0.04, 0.18]} />
          <meshStandardMaterial color="#222222" roughness={0.65} />
        </mesh>

        {/* Button Split Line (thin vertical slice) */}
        <mesh position={[0, 0.062, -0.08]}>
          <boxGeometry args={[0.006, 0.01, 0.18]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>

        {/* Scroll wheel slot */}
        <mesh position={[0, 0.05, -0.09]}>
          <boxGeometry args={[0.025, 0.03, 0.06]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>

        {/* Scroll Wheel */}
        <mesh position={[0, 0.068, -0.09]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.022, 0.022, 0.018, 16]} />
          <meshStandardMaterial color="#777777" roughness={0.3} metalness={0.8} /> {/* Metallic scroll wheel */}
        </mesh>
      </group>
    </group>
  );
}

// Realistic Smartphones
function ClayPhones() {
  return (
    <group>
      {/* Primary Phone */}
      <group position={[-1.1, 0.285, 2.2]} rotation={[0, 0.25, 0]}>
        {/* Outer Phone Case / Glass Back */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.035, 0.68]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} /> {/* Glossy glass back */}
        </mesh>
        
        {/* Phone screen bezel (Metallic Frame) */}
        <mesh position={[0, 0.018, 0]}>
          <boxGeometry args={[0.31, 0.005, 0.65]} />
          <meshStandardMaterial color="#a0a0a0" roughness={0.2} metalness={0.8} /> {/* Aluminum Edge */}
        </mesh>
        
        {/* Phone screen face */}
        <mesh position={[0, 0.021, 0]} castShadow>
          <boxGeometry args={[0.29, 0.005, 0.63]} />
          <meshStandardMaterial color="#050505" roughness={0.05} metalness={0.95} /> {/* Dark glassy screen */}
        </mesh>

        {/* Lock Screen UI widgets */}
        {/* Time widget circle */}
        <mesh position={[0, 0.024, -0.17]}>
          <cylinderGeometry args={[0.032, 0.032, 0.002, 16]} />
          <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
        </mesh>
        {/* Notification pill 1 */}
        <mesh position={[0, 0.024, -0.04]}>
          <boxGeometry args={[0.22, 0.002, 0.06]} />
          <meshBasicMaterial color="#e0e0e0" opacity={0.9} transparent />
        </mesh>
        {/* Notification pill 2 */}
        <mesh position={[0, 0.024, 0.05]}>
          <boxGeometry args={[0.22, 0.002, 0.06]} />
          <meshBasicMaterial color="#d0d0d0" opacity={0.9} transparent />
        </mesh>
        
        {/* Front ear speaker grill */}
        <mesh position={[0, 0.024, -0.27]}>
          <boxGeometry args={[0.07, 0.002, 0.01]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        {/* Front camera lens */}
        <mesh position={[-0.06, 0.024, -0.27]}>
          <sphereGeometry args={[0.006, 8, 8]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={1.0} />
        </mesh>
      </group>
    </group>
  );
}

// Realistic Stainless Steel Tumbler
function ClayTumbler() {
  return (
    <group position={[-2.2, 0.25, 1.2]} rotation={[0, 0.5, 0]}>
      {/* Base plate */}
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.02, 32]} />
        <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.6} />
      </mesh>
      
      {/* Main body (tapered stainless steel) */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.15, 0.46, 32]} />
        <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.7} /> {/* Stainless Steel */}
      </mesh>
      
      {/* Lid (Black Plastic) */}
      <mesh position={[0, 0.49, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.19, 0.19, 0.04, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>
      
      {/* Straw (Clear Acrylic) */}
      <mesh position={[0, 0.65, 0]} rotation={[0.1, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.35, 16]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// Realistic Perfume Bottle
function ClayPerfume() {
  return (
    <group position={[1.45, 0.25, 0.9]} rotation={[0, -0.4, 0]}>
      {/* Base shadow plate - removed for transparent glass look */}
      
      {/* Glass body */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.32, 0.1]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.95} roughness={0.05} metalness={0.1} thickness={0.1} ior={1.5} transparent />
      </mesh>
      
      {/* Label */}
      <group position={[0, 0.18, 0.052]}>
        <mesh>
          <boxGeometry args={[0.12, 0.12, 0.005]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
        <Text
          position={[0, 0, 0.003]}
          fontSize={0.018}
          color="#111111"
          anchorX="center"
          anchorY="middle"
        >
          fragnance
        </Text>
      </group>
      
      {/* Neck (Gold) */}
      <mesh position={[0, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.04, 16]} />
        <meshStandardMaterial color="#d4af37" roughness={0.15} metalness={1.0} />
      </mesh>
      
      {/* Cap (Gold) */}
      <mesh position={[0, 0.43, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 32]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

// Realistic Notepad
function ClayNotepad() {
  return (
    <group position={[0.45, 0.28, 1.4]} rotation={[0, -0.4, 0]}>
      {/* Notepad backing board (Cardboard/Greyboard) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.04, 1.3]} />
        <meshStandardMaterial color="#555555" roughness={0.9} />
      </mesh>
      
      {/* Paper sheets (Bright White) */}
      <mesh position={[0, 0.025, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.02, 1.15]} />
        <meshStandardMaterial color="#ffffff" roughness={1.0} />
      </mesh>

      {/* Spiral ring bindings on top edge (Metallic Wire) */}
      {[-0.35, -0.15, 0.05, 0.25, 0.45].map((xOffset, i) => (
        <mesh key={i} position={[xOffset, 0.04, -0.58]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.06, 0.018, 8, 24, Math.PI * 1.5]} />
          <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Realistic Penstand with 6 Rich Writing Tools
function ClayPenstand() {
  return (
    <group position={[0.92, 0.45, 0.45]} rotation={[0, -0.2, 0]}>
      {/* Main penholder cup container (Matte Black Ceramic) */}
      <mesh receiveShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.72, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Inner depth shadow (rim cap) */}
      <mesh position={[0, 0.355, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.22, 0.25, 32]} />
        <meshStandardMaterial color="#050505" roughness={1.0} />
      </mesh>
      
      {/* Pen 1: Sleek Silver/White metallic ballpoint (angled front-left) */}
      <group position={[-0.09, 0.42, 0.06]} rotation={[0.38, -0.22, 0.15]}>
        <mesh>
          <cylinderGeometry args={[0.022, 0.022, 0.82, 8]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Pen clip details (Chrome) */}
        <mesh position={[0, 0.2, 0.022]}>
          <boxGeometry args={[0.008, 0.15, 0.012]} />
          <meshStandardMaterial color="#cccccc" roughness={0.1} metalness={1.0} />
        </mesh>
        <mesh position={[0, 0.44, 0]}>
          <coneGeometry args={[0.024, 0.06, 8]} />
          <meshStandardMaterial color="#111111" roughness={0.8} />
        </mesh>
      </group>

      {/* Pencil 2: Classic Yellow Pencil with pink eraser (angled back-right) */}
      <group position={[0.09, 0.4, -0.06]} rotation={[-0.22, 0.38, -0.28]}>
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 0.78, 8]} />
          <meshStandardMaterial color="#ffcc00" roughness={0.7} />
        </mesh>
        {/* Eraser band (metal) and tip (pink) */}
        <mesh position={[0, -0.38, 0]}>
          <cylinderGeometry args={[0.021, 0.021, 0.05, 8]} />
          <meshStandardMaterial color="#aaaaaa" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.41, 0]}>
          <coneGeometry args={[0.022, 0.06, 8]} />
          <meshStandardMaterial color="#ffb6c1" roughness={0.9} /> {/* Pink Eraser at top? Wait, eraser is usually top. The cone is the sharpened tip! */}
        </mesh>
        {/* Fix: Cone at 0.41 is the sharpened tip, the cylinder at -0.38 is the eraser end! */}
      </group>

      {/* Pencil 3: Blue wood pencil (angled back-left) */}
      <group position={[-0.06, 0.42, -0.09]} rotation={[-0.32, -0.32, -0.12]}>
        <mesh>
          <cylinderGeometry args={[0.018, 0.018, 0.84, 8]} />
          <meshStandardMaterial color="#0066cc" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <coneGeometry args={[0.02, 0.06, 8]} />
          <meshStandardMaterial color="#d2b48c" roughness={0.9} /> {/* Exposed wood tip */}
        </mesh>
      </group>

      {/* Pen 4: Yellow plastic highlighter (angled front-right) */}
      <group position={[0.08, 0.36, 0.09]} rotation={[0.18, 0.22, 0.32]}>
        <mesh>
          <cylinderGeometry args={[0.032, 0.032, 0.7, 12]} />
          <meshStandardMaterial color="#ffff00" roughness={0.4} />
        </mesh>
        {/* Marker cap ring (Black) */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.16, 12]} />
          <meshStandardMaterial color="#111111" roughness={0.5} />
        </mesh>
      </group>

      {/* Ruler 5: Flat wooden ruler (angled straight back) */}
      <group position={[0.02, 0.46, -0.08]} rotation={[-0.15, 0.1, -0.05]}>
        <mesh>
          <boxGeometry args={[0.07, 0.95, 0.012]} />
          <meshStandardMaterial color="#d2b48c" roughness={0.9} /> {/* Natural Wood */}
        </mesh>
        {/* Ruler ticks (static to be ultra-robust) */}
        <mesh position={[-0.02, 0.1, 0.007]}><boxGeometry args={[0.018, 0.002, 0.002]} /><meshBasicMaterial color="#111111" /></mesh>
        <mesh position={[-0.02, 0.18, 0.007]}><boxGeometry args={[0.018, 0.002, 0.002]} /><meshBasicMaterial color="#111111" /></mesh>
        <mesh position={[-0.02, 0.26, 0.007]}><boxGeometry args={[0.018, 0.002, 0.002]} /><meshBasicMaterial color="#111111" /></mesh>
        <mesh position={[-0.02, 0.34, 0.007]}><boxGeometry args={[0.018, 0.002, 0.002]} /><meshBasicMaterial color="#111111" /></mesh>
        <mesh position={[-0.02, 0.42, 0.007]}><boxGeometry args={[0.018, 0.002, 0.002]} /><meshBasicMaterial color="#111111" /></mesh>
      </group>

      {/* Pen 6: Stylus/digital pen (Apple Pencil style) */}
      <group position={[0.01, 0.41, 0.08]} rotation={[0.28, 0.05, 0.02]}>
        <mesh>
          <cylinderGeometry args={[0.016, 0.016, 0.78, 8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.41, 0]}>
          <coneGeometry args={[0.018, 0.05, 8]} />
          <meshStandardMaterial color="#dddddd" roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// Background elements
function BackgroundScenery() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main Pedestal Platform */}
      <mesh position={[-0.3, 0.1, 0.8]} castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.3, 0.3, 64]} />
        <meshStandardMaterial color="#c19a6b" roughness={0.8} /> {/* Realistic Oak Wood Color */}
      </mesh>
      
      {/* Secondary laptop pedestal */}
      <mesh position={[-1.4, 0.28, 0.4]} castShadow receiveShadow>
        <cylinderGeometry args={[0.95, 1.0, 0.15, 48]} />
        <meshStandardMaterial color="#a8855a" roughness={0.85} /> {/* Slightly darker wood tier */}
      </mesh>
    </group>
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
        {/* Soft, extremely cozy warm rosy ambient light */}
        <ambientLight intensity={1.5} color="#fff2f0" />
        
        {/* Main soft shadow casting directional light mimicking sunset/golden hour */}
        <directionalLight
          castShadow
          position={[6, 12, 8]}
          intensity={2.2}
          color="#fff5f0"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.001}
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
