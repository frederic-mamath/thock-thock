import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import KeyboardModel from "../KeyboardModel/KeyboardModel";

interface Props {
  keyPressed: string | null;
}

const KeyboardScene = ({ keyPressed }: Props) => {
  return (
    <Canvas>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <KeyboardModel keyPressed={keyPressed} />
      <OrbitControls />
    </Canvas>
  );
};

export default KeyboardScene;
