import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 3000;

const vertexShader = `
  attribute vec3 targetPosition;
  attribute float size;
  uniform float uProgress;
  uniform vec3 uColor;
  varying vec3 vColor;
  
  void main() {
    vColor = uColor;
    
    // Interpolate between current and target position
    vec3 pos = mix(position, targetPosition, uProgress);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Depth-based sizing: Big when close, small when far
    gl_PointSize = size * (800.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    float strength = 1.0 - (r * 2.0);
    gl_FragColor = vec4(vColor, strength * 0.8);
  }
`;

// Shape generation helpers
const getShapePoints = (type) => {
    const points = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
        let x, y, z;
        const i3 = i * 3;

        if (type === 'heart') {
            const t = Math.random() * Math.PI * 2;
            x = 16 * Math.pow(Math.sin(t), 3);
            y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            z = (Math.random() - 0.5) * 5;
            x *= 0.5; y *= 0.5; // Scale up
        } else if (type === 'flower') {
            const angle = Math.random() * Math.PI * 2;
            const r = (5 + Math.sin(angle * 5)) * Math.random() * 4;
            x = Math.cos(angle) * r;
            y = Math.sin(angle) * r;
            z = (Math.random() - 0.5) * 5;
        } else if (type === 'saturn') {
            const isRing = Math.random() > 0.4;
            if (isRing) {
                const angle = Math.random() * Math.PI * 2;
                const r = 8 + Math.random() * 4;
                x = Math.cos(angle) * r;
                y = Math.sin(angle) * r * 0.3;
                z = Math.sin(angle) * r;
            } else {
                const angle = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 5;
                x = r * Math.sin(phi) * Math.cos(angle);
                y = r * Math.sin(phi) * Math.sin(angle);
                z = r * Math.cos(phi);
            }
        } else { // Fireworks / Sphere (Default)
            const angle = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 10 * Math.random();
            x = r * Math.sin(phi) * Math.cos(angle);
            y = r * Math.sin(phi) * Math.sin(angle);
            z = r * Math.cos(phi);
        }

        points[i3] = x;
        points[i3 + 1] = y;
        points[i3 + 2] = z;
    }
    return points;
};

const ParticleSystem = ({ shapeType = 'sphere' }) => {
    const geomRef = useRef();
    const matRef = useRef();

    const initialPoints = useMemo(() => getShapePoints('sphere'), []);
    const targetPoints = useMemo(() => getShapePoints(shapeType), [shapeType]);

    const sizes = useMemo(() => {
        const s = new Float32Array(COUNT);
        for (let i = 0; i < COUNT; i++) {
            // Initializing with pseudo-randomness or predefined logic is better for purity checks
            // but for simplicity in this context, we'll just use a loop that React can track
            s[i] = 1.0 + (i % 100) / 50.0;
        }
        return s;
    }, []);

    const hueRef = useRef(0.6);
    const progressRef = useRef(0);

    useFrame(() => {
        if (!matRef.current || !geomRef.current) return;

        // Animate transition progress
        progressRef.current = THREE.MathUtils.lerp(progressRef.current, 1, 0.05);
        matRef.current.uniforms.uProgress.value = progressRef.current;

        // If progress is almost 1, swap initial points to current target and reset target
        if (progressRef.current > 0.999) {
            geomRef.current.attributes.position.array.set(targetPoints);
            geomRef.current.attributes.position.needsUpdate = true;
            progressRef.current = 0;
        }

        // Color animation
        hueRef.current = (hueRef.current + 0.001) % 1.0;
        matRef.current.uniforms.uColor.value.setHSL(hueRef.current, 0.8, 0.6);
    });

    return (
        <points>
            <bufferGeometry ref={geomRef}>
                <bufferAttribute
                    attach="attributes-position"
                    count={initialPoints.length / 3}
                    array={initialPoints}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-targetPosition"
                    count={targetPoints.length / 3}
                    array={targetPoints}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={COUNT}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={matRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                uniforms={{
                    uProgress: { value: 0 },
                    uColor: { value: new THREE.Color("#ff69b4") }
                }}
            />
        </points>
    );
};

export default ParticleSystem;
