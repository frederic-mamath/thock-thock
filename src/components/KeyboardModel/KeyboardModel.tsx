import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

interface Props {
  keyPressed: string | null;
}

const KeyboardModel = ({ keyPressed }: Props) => {
  const { scene } = useGLTF("/keyboard.glb");
  const keysRef = useRef<Record<string, Mesh>>({});
  const defaultPositions = useRef<Record<string, Vector3>>({});

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh && child.name.startsWith("Key")) {
        if (!keysRef.current[child.name]) {
          keysRef.current[child.name] = child;
          defaultPositions.current[child.name] = child.position.clone(); // Store the initial position
        }
      }
    });
  }, [scene]);

  useFrame(() => {
    Object.entries(keysRef.current).forEach(([name, mesh]) => {
      const defaultPos = defaultPositions.current[name];

      if (name === keyPressed) {
        // Move the key slightly down
        mesh.position.y = defaultPos.y - 0.05;
      } else {
        // Gradually return the key to its original position
        mesh.position.y += (defaultPos.y - mesh.position.y) * 0.1; // Easing effect
      }
    });
  });

  return <primitive object={scene} scale={1.5} />;
};

export default KeyboardModel;
