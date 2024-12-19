import { useEffect, useState } from "react";

import KeyboardScene from "./components/KeyboardScene/KeyboardScene";

function App() {
  const [keyPressed, setKeyPressed] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = `Key_${event.code}`;
      console.log({ key });
      setKeyPressed(key);
    };

    const handleKeyUp = () => {
      setKeyPressed(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <KeyboardScene keyPressed={keyPressed} />
    </div>
  );
}

export default App;
