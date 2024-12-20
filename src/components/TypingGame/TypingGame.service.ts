export const getRandomWords = (count: number): string[] => {
  const wordList = [
    "react",
    "monkey",
    "keyboard",
    "developer",
    "types",
    "typescript",
    "challenge",
    "speed",
    "accuracy",
    "testing",
    "focus",
    "performance",
  ];

  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    words.push(wordList[randomIndex]);
  }
  return words;
};
