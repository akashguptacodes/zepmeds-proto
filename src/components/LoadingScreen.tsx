import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f9ff);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xf0f9ff, 1);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Create capsule parts
    const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 4, 8);
    
    // Top half (blue)
    const topMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2563eb,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const topHalf = new THREE.Mesh(capsuleGeometry, topMaterial);
    topHalf.scale.y = 0.5;
    topHalf.position.y = 0.5;
    topHalf.castShadow = true;
    scene.add(topHalf);

    // Bottom half (red)
    const bottomMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xc2410c,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const bottomHalf = new THREE.Mesh(capsuleGeometry, bottomMaterial);
    bottomHalf.scale.y = 0.5;
    bottomHalf.position.y = -0.5;
    bottomHalf.castShadow = true;
    scene.add(bottomHalf);

    // Create particles
    const particles: THREE.Mesh[] = [];
    const particleColors = [0x10b981, 0xf59e0b, 0xef4444, 0xec4899, 0x8b5cf6, 0x06b6d4];
    
    for (let i = 0; i < 50; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const particleMaterial = new THREE.MeshPhongMaterial({ 
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        shininess: 100
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(0, 0, 0);
      particle.visible = false;
      particles.push(particle);
      scene.add(particle);
    }

    // Create medical icons as 3D objects
    const medicalObjects: THREE.Group[] = [];
    
    // Create pill shapes
    for (let i = 0; i < 8; i++) {
      const group = new THREE.Group();
      const pillGeometry = new THREE.CapsuleGeometry(0.1, 0.3, 4, 8);
      const pillMaterial = new THREE.MeshPhongMaterial({ 
        color: particleColors[i % particleColors.length],
        shininess: 100
      });
      const pill = new THREE.Mesh(pillGeometry, pillMaterial);
      group.add(pill);
      group.visible = false;
      medicalObjects.push(group);
      scene.add(group);
    }

    // Create floating background particles
    const bgParticles: THREE.Mesh[] = [];
    for (let i = 0; i < 100; i++) {
      const bgGeometry = new THREE.SphereGeometry(0.02, 4, 4);
      const bgMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.3
      });
      const bgParticle = new THREE.Mesh(bgGeometry, bgMaterial);
      bgParticle.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      bgParticles.push(bgParticle);
      scene.add(bgParticle);
    }

    // Animation variables
    let animationPhase = 0;
    let startTime = Date.now();
    const phaseDurations = [1000, 1500, 1000, 500]; // Phase durations in ms

    // Animation loop
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const totalDuration = phaseDurations.reduce((a, b) => a + b, 0);

      // Determine current phase
      let phaseStart = 0;
      for (let i = 0; i < phaseDurations.length; i++) {
        if (elapsed >= phaseStart && elapsed < phaseStart + phaseDurations[i]) {
          animationPhase = i;
          break;
        }
        phaseStart += phaseDurations[i];
      }

      const phaseProgress = Math.min((elapsed - phaseStart) / phaseDurations[animationPhase], 1);

      // Phase 0: Capsule rotation and preparation
      if (animationPhase === 0) {
        const rotationSpeed = phaseProgress * Math.PI * 2;
        topHalf.rotation.y = rotationSpeed;
        bottomHalf.rotation.y = -rotationSpeed;
        
        // Gentle floating
        topHalf.position.y = 0.5 + Math.sin(elapsed * 0.005) * 0.1;
        bottomHalf.position.y = -0.5 - Math.sin(elapsed * 0.005) * 0.1;

        // Camera orbit
        camera.position.x = Math.sin(elapsed * 0.001) * 2;
        camera.position.z = 8 + Math.cos(elapsed * 0.001) * 1;
        camera.lookAt(0, 0, 0);
      }

      // Phase 1: Capsule explosion
      else if (animationPhase === 1) {
        const explosionProgress = phaseProgress;
        
        // Separate capsule halves
        topHalf.position.y = 0.5 + explosionProgress * 3;
        topHalf.position.x = explosionProgress * -2;
        topHalf.rotation.x = explosionProgress * Math.PI;
        topHalf.rotation.z = explosionProgress * Math.PI * 0.5;
        
        bottomHalf.position.y = -0.5 - explosionProgress * 3;
        bottomHalf.position.x = explosionProgress * 2;
        bottomHalf.rotation.x = -explosionProgress * Math.PI;
        bottomHalf.rotation.z = -explosionProgress * Math.PI * 0.5;

        // Fade out capsule
        topMaterial.opacity = 0.9 - explosionProgress * 0.9;
        bottomMaterial.opacity = 0.9 - explosionProgress * 0.9;

        // Release particles
        particles.forEach((particle, index) => {
          particle.visible = true;
          const angle = (index / particles.length) * Math.PI * 2;
          const radius = explosionProgress * 5;
          const height = Math.sin(explosionProgress * Math.PI) * 2;
          
          particle.position.x = Math.cos(angle) * radius;
          particle.position.z = Math.sin(angle) * radius;
          particle.position.y = height + (Math.random() - 0.5) * 2;
          
          particle.rotation.x += 0.1;
          particle.rotation.y += 0.1;
          
          // Scale particles
          const scale = 1 + explosionProgress * 2;
          particle.scale.setScalar(scale);
        });

        // Show medical objects
        medicalObjects.forEach((obj, index) => {
          obj.visible = true;
          const angle = (index / medicalObjects.length) * Math.PI * 2;
          const radius = explosionProgress * 4;
          
          obj.position.x = Math.cos(angle) * radius;
          obj.position.z = Math.sin(angle) * radius;
          obj.position.y = Math.sin(explosionProgress * Math.PI * 2) * 1.5;
          
          obj.rotation.x += 0.05;
          obj.rotation.y += 0.1;
          obj.rotation.z += 0.03;
        });

        // Dynamic camera movement
        camera.position.z = 8 - explosionProgress * 2;
        camera.position.y = explosionProgress * 2;
        camera.lookAt(0, 0, 0);
      }

      // Phase 2: Particle convergence and logo formation
      else if (animationPhase === 2) {
        const convergenceProgress = phaseProgress;
        
        // Hide capsule parts
        topHalf.visible = false;
        bottomHalf.visible = false;

        // Converge particles to center
        particles.forEach((particle) => {
          const targetX = (Math.random() - 0.5) * 0.5;
          const targetY = (Math.random() - 0.5) * 0.5;
          const targetZ = (Math.random() - 0.5) * 0.5;
          
          particle.position.x = THREE.MathUtils.lerp(particle.position.x, targetX, convergenceProgress * 0.1);
          particle.position.y = THREE.MathUtils.lerp(particle.position.y, targetY, convergenceProgress * 0.1);
          particle.position.z = THREE.MathUtils.lerp(particle.position.z, targetZ, convergenceProgress * 0.1);
          
          // Fade out particles
          (particle.material as THREE.MeshPhongMaterial).opacity = 1 - convergenceProgress;
        });

        // Form medical objects into logo shape
        medicalObjects.forEach((obj, index) => {
          const logoPositions = [
            { x: -1, y: 0.5, z: 0 }, { x: 1, y: 0.5, z: 0 },
            { x: -1, y: -0.5, z: 0 }, { x: 1, y: -0.5, z: 0 },
            { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 },
            { x: -0.5, y: 0, z: 0 }, { x: 0.5, y: 0, z: 0 }
          ];
          
          const targetPos = logoPositions[index % logoPositions.length];
          obj.position.x = THREE.MathUtils.lerp(obj.position.x, targetPos.x, convergenceProgress * 0.1);
          obj.position.y = THREE.MathUtils.lerp(obj.position.y, targetPos.y, convergenceProgress * 0.1);
          obj.position.z = THREE.MathUtils.lerp(obj.position.z, targetPos.z, convergenceProgress * 0.1);
          
          obj.rotation.x = convergenceProgress * Math.PI * 2;
          obj.rotation.y = convergenceProgress * Math.PI * 2;
        });

        // Camera zoom in
        camera.position.z = THREE.MathUtils.lerp(6, 4, convergenceProgress);
        camera.lookAt(0, 0, 0);
      }

      // Phase 3: Final fade and transition
      else if (animationPhase === 3) {
        const fadeProgress = phaseProgress;
        
        // Fade out everything
        particles.forEach(particle => {
          (particle.material as THREE.MeshPhongMaterial).opacity = 1 - fadeProgress;
        });
        
        medicalObjects.forEach(obj => {
          obj.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
              (child.material as THREE.MeshPhongMaterial).opacity = 1 - fadeProgress;
            }
          });
        });

        // Final camera movement
        camera.position.z = THREE.MathUtils.lerp(4, 10, fadeProgress);
      }

      // Animate background particles
      bgParticles.forEach((particle, index) => {
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
        particle.position.y += Math.sin(elapsed * 0.001 + index) * 0.001;
        particle.position.x += Math.cos(elapsed * 0.001 + index) * 0.001;
      });

      // Update lighting
      pointLight.intensity = 1 + Math.sin(elapsed * 0.005) * 0.3;
      pointLight.color.setHSL((elapsed * 0.0001) % 1, 0.8, 0.6);

      renderer.render(scene, camera);

      if (elapsed < totalDuration) {
        animationIdRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete, trigger transition
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    };

    // Handle window resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Overlay text that appears during final phase */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center animate-fade-in-delayed">
          <h1 className="text-5xl font-bold text-blue-600 mb-4 animate-pulse">
            ZapMeds
          </h1>
          <p className="text-xl text-blue-500 animate-bounce">
            Fast • Reliable • Caring
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-delayed {
          0%, 70% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;