import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, OrbitControls, Stage, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const MascotMesh = ({ mouse }) => {
    const meshRef = useRef();
    const texture = useLoader(THREE.TextureLoader, '/mascot_3d.png');

    useFrame((state) => {
        if (!meshRef.current) return;

        // Smoothly rotate towards mouse
        const targetRotationX = (state.mouse.y * 0.2);
        const targetRotationY = (state.mouse.x * 0.2);

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} castShadow receiveShadow>
                {/* A slightly curved plane to give it more "volume" */}
                <planeGeometry args={[3, 4, 32, 32]} />
                <meshStandardMaterial
                    map={texture}
                    transparent={true}
                    side={THREE.DoubleSide}
                    alphaTest={0.5}
                    roughness={0.3}
                    metalness={0.2}
                />
            </mesh>
        </Float>
    );
};

const Mascot3D = ({ className = "" }) => {
    return (
        <div className={`w-full h-[400px] md:h-[600px] ${className}`}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5} contactShadow={false}>
                        <MascotMesh />
                    </Stage>
                    <ContactShadows
                        position={[0, -2, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2}
                        far={4.5}
                    />
                    <Environment preset="sunset" />
                </Suspense>
                {/* Disable zoom/pan but allow rotation if user wants to play with it */}
                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
            </Canvas>
        </div>
    );
};

export default Mascot3D;
