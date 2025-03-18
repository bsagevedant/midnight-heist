import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RefreshCw } from 'lucide-react';

export default function Game() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<{ score: number; isGameOver: boolean }>({
    score: 0,
    isGameOver: false
  });
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Game variables
    let score = 0;
    let isGameOver = false;
    
    // Set up the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000033);
    
    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;
    camera.rotation.x = -0.2;
    
    // Set up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add moonlight
    const moonLight = new THREE.PointLight(0x6666ff, 0.5, 30);
    moonLight.position.set(15, 10, -10);
    scene.add(moonLight);
    
    // Create the player (thief)
    const playerGroup = new THREE.Group();
    
    // Thief body
    const bodyGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.3);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.3;
    playerGroup.add(body);
    
    // Thief head
    const headGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.7;
    playerGroup.add(head);
    
    scene.add(playerGroup);
    
    // Create the ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x227722,
      side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    scene.add(ground);
    
    // Create trees
    function createTree(x: number, z: number) {
      const treeGroup = new THREE.Group();
      
      // Tree trunk
      const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8);
      const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = 0.5;
      treeGroup.add(trunk);
      
      // Tree foliage (3 layers)
      const foliageGeometry = new THREE.ConeGeometry(0.8, 1.2, 8);
      const foliageMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
      
      const foliage1 = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage1.position.y = 1.3;
      treeGroup.add(foliage1);
      
      const foliage2 = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage2.position.y = 1.8;
      foliage2.scale.set(0.8, 0.8, 0.8);
      treeGroup.add(foliage2);
      
      const foliage3 = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage3.position.y = 2.3;
      foliage3.scale.set(0.6, 0.6, 0.6);
      treeGroup.add(foliage3);
      
      treeGroup.position.set(x, 0, z);
      scene.add(treeGroup);
      
      return treeGroup;
    }
    
    // Create houses
    function createHouse(x: number, z: number, rotation: number) {
      const houseGroup = new THREE.Group();
      
      // House base
      const baseGeometry = new THREE.BoxGeometry(2, 1.5, 2);
      const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xDEB887 });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = 0.75;
      houseGroup.add(base);
      
      // House roof
      const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
      const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x8B0000 });
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.y = 2;
      roof.rotation.y = Math.PI / 4;
      houseGroup.add(roof);
      
      // Door
      const doorGeometry = new THREE.PlaneGeometry(0.4, 0.8);
      const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x4B3621, side: THREE.DoubleSide });
      const door = new THREE.Mesh(doorGeometry, doorMaterial);
      door.position.set(0, 0.4, 1.01);
      houseGroup.add(door);
      
      // Windows
      const windowGeometry = new THREE.PlaneGeometry(0.4, 0.4);
      const windowMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x87CEEB, 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      
      const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
      window1.position.set(-0.5, 0.8, 1.01);
      houseGroup.add(window1);
      
      const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
      window2.position.set(0.5, 0.8, 1.01);
      houseGroup.add(window2);
      
      // Side windows
      const sideWindow1 = new THREE.Mesh(windowGeometry, windowMaterial);
      sideWindow1.position.set(1.01, 0.8, 0);
      sideWindow1.rotation.y = Math.PI / 2;
      houseGroup.add(sideWindow1);
      
      const sideWindow2 = new THREE.Mesh(windowGeometry, windowMaterial);
      sideWindow2.position.set(-1.01, 0.8, 0);
      sideWindow2.rotation.y = Math.PI / 2;
      houseGroup.add(sideWindow2);
      
      // Add a light inside the house
      const houseLight = new THREE.PointLight(0xffffaa, 0.5, 3);
      houseLight.position.set(0, 0.8, 0);
      houseGroup.add(houseLight);
      
      houseGroup.position.set(x, 0, z);
      houseGroup.rotation.y = rotation;
      scene.add(houseGroup);
      
      return houseGroup;
    }
    
    // Create environment
    const trees: THREE.Group[] = [];
    const houses: THREE.Group[] = [];
    
    // Create trees in random positions
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 40 - 20;
      const z = Math.random() * 40 - 20;
      // Don't place trees too close to center
      if (Math.abs(x) > 8 || Math.abs(z) > 8) {
        trees.push(createTree(x, z));
      }
    }
    
    // Create houses
    houses.push(createHouse(-12, -12, Math.PI / 4));
    houses.push(createHouse(12, -12, -Math.PI / 4));
    houses.push(createHouse(-12, 12, -Math.PI / 4 * 3));
    houses.push(createHouse(12, 12, Math.PI / 4 * 3));
    
    // Create jewels and security alarms
    const jewels: THREE.Group[] = [];
    const securityAlarms: THREE.Group[] = [];
    
    function createJewel() {
      const jewel = new THREE.Group();
      
      // Create diamond shape
      const diamondGeometry = new THREE.OctahedronGeometry(0.2, 0);
      const diamondMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00ff88, 
        shininess: 100,
        transparent: true,
        opacity: 0.8
      });
      const diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
      
      // Create base
      const baseGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 8);
      const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = -0.15;
      
      jewel.add(diamond);
      jewel.add(base);
      
      // Position within the center area
      jewel.position.x = Math.random() * 16 - 8;
      jewel.position.z = Math.random() * 16 - 8;
      jewel.position.y = 0.15;
      
      scene.add(jewel);
      jewels.push(jewel);
    }
    
    function createSecurityAlarm() {
      const alarm = new THREE.Group();
      
      // Create alarm body
      const alarmBodyGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.3);
      const alarmBodyMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
      const alarmBody = new THREE.Mesh(alarmBodyGeometry, alarmBodyMaterial);
      
      // Create alarm light
      const alarmLightGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 16);
      const alarmLightMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.5
      });
      const alarmLight = new THREE.Mesh(alarmLightGeometry, alarmLightMaterial);
      alarmLight.position.y = 0.1;
      
      alarm.add(alarmBody);
      alarm.add(alarmLight);
      
      // Position within the center area
      alarm.position.x = Math.random() * 16 - 8;
      alarm.position.z = Math.random() * 16 - 8;
      alarm.position.y = 0.05;
      
      scene.add(alarm);
      securityAlarms.push(alarm);
    }
    
    // Create initial jewels and security alarms
    for (let i = 0; i < 10; i++) {
      createJewel();
    }
    
    for (let i = 0; i < 5; i++) {
      createSecurityAlarm();
    }
    
    // Create paths between houses
    function createPath(x1: number, z1: number, x2: number, z2: number) {
      const pathWidth = 1;
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(z2 - z1, 2));
      const pathGeometry = new THREE.PlaneGeometry(length, pathWidth);
      const pathMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8B4513,
        side: THREE.DoubleSide
      });
      const path = new THREE.Mesh(pathGeometry, pathMaterial);
      
      // Position and rotate the path
      path.position.set((x1 + x2) / 2, 0.01, (z1 + z2) / 2);
      path.rotation.x = Math.PI / 2;
      path.rotation.y = Math.atan2(z2 - z1, x2 - x1);
      
      scene.add(path);
    }
    
    // Create paths between houses
    createPath(-12, -12, 12, -12);
    createPath(12, -12, 12, 12);
    createPath(12, 12, -12, 12);
    createPath(-12, 12, -12, -12);
    createPath(-12, -12, 12, 12);
    createPath(-12, 12, 12, -12);
    
    // Handle keyboard input
    const keys: { [key: string]: boolean } = {};
    const handleKeyDown = (event: KeyboardEvent) => {
      keys[event.key] = true;
    };
    
    const handleKeyUp = (event: KeyboardEvent) => {
      keys[event.key] = false;
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    function movePlayer() {
      if (isGameOver) return;
      
      const moveSpeed = 0.1;
      
      // Forward/Backward
      if (keys['w'] || keys['W'] || keys['ArrowUp']) {
        playerGroup.position.z -= moveSpeed;
        playerGroup.rotation.y = Math.PI;
      }
      if (keys['s'] || keys['S'] || keys['ArrowDown']) {
        playerGroup.position.z += moveSpeed;
        playerGroup.rotation.y = 0;
      }
      
      // Left/Right
      if (keys['a'] || keys['A'] || keys['ArrowLeft']) {
        playerGroup.position.x -= moveSpeed;
        playerGroup.rotation.y = Math.PI/2;
      }
      if (keys['d'] || keys['D'] || keys['ArrowRight']) {
        playerGroup.position.x += moveSpeed;
        playerGroup.rotation.y = -Math.PI/2;
      }
      
      // Limit player movement area
      playerGroup.position.x = Math.max(-15, Math.min(15, playerGroup.position.x));
      playerGroup.position.z = Math.max(-15, Math.min(15, playerGroup.position.z));
      
      // Camera follows player
      camera.position.x = playerGroup.position.x;
      camera.position.z = playerGroup.position.z + 5;
    }
    
    function checkCollisions() {
      if (isGameOver) return;
      
      // Check collisions with jewels
      for (let i = jewels.length - 1; i >= 0; i--) {
        const distance = new THREE.Vector3().subVectors(playerGroup.position, jewels[i].position).length();
        if (distance < 0.5) {
          scene.remove(jewels[i]);
          jewels.splice(i, 1);
          score += 1;
          setGameState(prev => ({ ...prev, score }));
          
          // Create a new jewel
          createJewel();
          
          // Add a security alarm every 5 jewels
          if (score % 5 === 0) {
            createSecurityAlarm();
          }
        }
      }
      
      // Check collisions with security alarms
      for (let i = 0; i < securityAlarms.length; i++) {
        const distance = new THREE.Vector3().subVectors(playerGroup.position, securityAlarms[i].position).length();
        if (distance < 0.5) {
          gameOver();
          break;
        }
      }
    }
    
    function gameOver() {
      isGameOver = true;
      setGameState(prev => ({ ...prev, isGameOver: true }));
      body.material.color.set(0x888888);
      head.material.color.set(0x888888);
    }
    
    // Create moon
    const moonGeometry = new THREE.SphereGeometry(1, 16, 16);
    const moonMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xeeeeee,
      emissive: 0x888888
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(15, 10, -10);
    scene.add(moon);
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      movePlayer();
      checkCollisions();
      
      // Rotate and animate jewels
      jewels.forEach(jewel => {
        jewel.rotation.y += 0.01;
        jewel.position.y = 0.15 + Math.sin(Date.now() * 0.003) * 0.05;
      });
      
      // Animate security alarms
      securityAlarms.forEach((alarm, index) => {
        // Make the red light blink
        const light = alarm.children[1];
        if (light instanceof THREE.Mesh) {
          const blinkRate = 0.002;
          const blinkPhase = index * 0.7; // Different phase for each alarm
          const blinkIntensity = Math.sin(Date.now() * blinkRate + blinkPhase) * 0.5 + 0.5;
          (light.material as THREE.MeshPhongMaterial).emissiveIntensity = blinkIntensity;
        }
      });
      
      renderer.render(scene, camera);
    }
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start the game
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const handleReplay = () => {
    window.location.reload();
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-2xl font-bold text-shadow">
        Midnight Heist: The Jewel Thief
      </div>
      <div className="absolute top-4 left-4 text-white text-lg">
        Jewels: {gameState.score}
      </div>
      {gameState.isGameOver && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-white text-4xl mb-8">Caught by Security!</div>
          <button
            onClick={handleReplay}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      )}
      <div className="absolute bottom-5 left-4 text-white text-sm">
        Use WASD or arrow keys to move<br />
        Collect jewels, avoid security alarms
      </div>
    </div>
  );
}