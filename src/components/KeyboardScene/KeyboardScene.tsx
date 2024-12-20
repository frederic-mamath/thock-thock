import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import KeyboardModel from "../KeyboardModel/KeyboardModel";

interface Props {
  keyPressed: string | null;
}

const KeyboardScene = ({ keyPressed }: Props) => {
  return (
    <Canvas>
      <OrthographicCamera
        makeDefault
        zoom={100}
        position={[10, 10, 10]}
        rotation={[-Math.PI / 4, Math.PI / 4, 0]}
      />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <KeyboardModel keyPressed={keyPressed} />
      <OrbitControls enabled={false} />
    </Canvas>
  );
};

export default KeyboardScene;
