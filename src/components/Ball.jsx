import { Decal, Float, OrbitControls, Preload, Text, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const COLS = 8;
const SPACING = 7;
const CAM_Z = 44;
const FOV = 45;

const PASTEL_COLORS = [
  "#ffe8ea", // rose
  "#fff2e0", // peach
  "#fffde0", // butter
  "#e0f7ef", // mint
  "#e3f4ff", // sky
  "#f0e8ff", // lavender
  "#ffe8f3", // blush
  "#e0f3e8", // sage
  "#fff5e8", // apricot
  "#eaecff", // periwinkle
  "#fff8e0", // sand
  "#e0f5f4", // teal-mint
];

function BallMesh({ name, imgUrl, position, ballColor }) {
  const [decal] = useTexture([imgUrl]);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={1} position={position}>
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={ballColor}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
      <Text
        position={[0, -3.5, 0]}
        fontSize={0.6}
        color="#7c65e6"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </Float>
  );
}

export function SkillsBallGrid({ logos }) {
  const rows = Math.ceil(logos.length / COLS);
  const positions = logos.map((_, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    return [
      (col - (COLS - 1) / 2) * SPACING,
      -(row - (rows - 1) / 2) * SPACING,
      0,
    ];
  });

  return (
    <div className="w-full" style={{ aspectRatio: "8/5" }}>
      <Canvas
        frameloop="always"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, CAM_Z], fov: FOV }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[0, 0, 1]} intensity={0.9} />
          <directionalLight position={[-1, 1, 0.5]} intensity={0.4} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          {logos.map((logo, i) => (
            <BallMesh
              key={logo.name}
              name={logo.name}
              imgUrl={logo.icon}
              position={positions[i]}
              ballColor={PASTEL_COLORS[i % PASTEL_COLORS.length]}
            />
          ))}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
