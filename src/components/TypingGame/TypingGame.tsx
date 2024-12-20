import React, { useEffect, useState } from "react";
import { getRandomWords } from "./TypingGame.service";

const NORMAL_DIFFICULTY_WORD_COUNT = 30;

const TypingGame = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    setWords(getRandomWords(NORMAL_DIFFICULTY_WORD_COUNT));
  }, []);

  // @debt react-pattern "See with Vincent E. to remove setState inside useEffect that triggers double re-renders"
  useEffect(() => {
    if (currentInput.length === 1 && startTime === null) {
      setStartTime(Date.now());
    }
  }, [currentInput, startTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCurrentInput(input);

    if (input.trim() === words[currentWordIndex]) {
      // Compare input to the current word
      // Add correct characters
      // Move to the next word
      // Clear input
      setCorrectCount((prev) => prev + words[currentWordIndex].length);
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentInput("");
    }

    if (currentWordIndex >= words.length - 1) {
      setFinished(true);
    }
  };

  const calculateWPM = () => {
    if (!startTime) return 0;
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    return Math.round(correctCount / 5 / elapsedMinutes);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        fontFamily: "monospace",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: 14,
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ color: "rgba(255, 255, 255, 1)" }}>Typing Game</h1>
      {!finished ? (
        <>
          <div
            style={{ display: "flex", flexWrap: "wrap", marginBottom: "16px" }}
          >
            {words.map((word, index) => (
              <div
                key={index}
                style={{
                  marginRight: "10px",
                  color:
                    index === currentWordIndex
                      ? "rgba(255, 255, 0, 1)"
                      : "rgba(255, 255, 255, 1)",
                }}
              >
                {word}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            autoFocus
            placeholder="Start typing..."
            style={{
              padding: "10px",
              fontSize: "16px",
              textAlign: "center",
              border: "2px solid #ddd",
              borderRadius: "5px",
            }}
          />
          <p>WPM: {calculateWPM()}</p>
        </>
      ) : (
        <div>
          <h2>Game Over!</h2>
          <p>Your WPM: {calculateWPM()}</p>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default TypingGame;
