import React, { useState, useEffect } from "react";
import { isValidWord } from "../validation/dictionary";
import { ActionListener } from "../classes/actionListener";
import "../style/WordleGame.css";

const MAX_LETTERS = 5;
const KEYS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

// יצירת מאזין גלובלי שיתאים לכל הקומפוננטות שצריכות להאזין לאירועי אימות מילה
const wordCheckListener = new ActionListener<boolean>();

export const WordleGame: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // רישום מאזין שישנה את צבע הגבולות על פי תקינות המילה
    const listenerId = wordCheckListener.addListener((result) => {
      setIsCorrect(result); // עדכון מצב התקינות של המילה
      setTimeout(() => {
        setWord(""); // אפס את המילה אחרי 1.5 שניות
        setIsCorrect(null); // אפס את מצב התקינות
      }, 1500);
    });

    return () => {
      wordCheckListener.removeListener(listenerId); // ביטול רישום המאזין כאשר הקומפוננטה לא בשימוש
    };
  }, []); // הוק שנקרא פעם אחת בזמן ההרכבה

  const handleKeyPress = (key: string) => {
    if (key === "ENTER") {
      if (word.length === MAX_LETTERS) {
        const result = isValidWord(word.toLowerCase()); // בדוק אם המילה תקפה
        wordCheckListener.emit(result); // שולח לכל המאזינים את התוצאה
      }
      return;
    }

    if (key === "⌫") {
      setWord((prev) => prev.slice(0, -1)); // מחק את האות האחרונה
      return;
    }

    if (/^[A-Z]$/.test(key) && word.length < MAX_LETTERS) {
      setWord((prev) => prev + key); // הוסף את האות למילה
    }
  };

  return (
    <div className="game-container">
      <h1 className="title">Wordle Clone</h1>

      <div
        className={`word-display ${
          isCorrect === true
            ? "correct"
            : isCorrect === false
            ? "incorrect"
            : ""
        }`}
      >
        {/* הצגת המילה על פי מצב התקינות שלה */}
        {[...Array(MAX_LETTERS)].map((_, index) => (
          <div key={index} className="cell">
            {word[index] || ""}
          </div>
        ))}
      </div>

      <div className="keyboard">
        {/* יצירת המקלדת */}
        {KEYS.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.split("").map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="key"
              >
                {key}
              </button>
            ))}
          </div>
        ))}
        <div className="keyboard-row">
          <button onClick={() => handleKeyPress("ENTER")} className="key enter">
            ENTER
          </button>
          <button onClick={() => handleKeyPress("⌫")} className="key backspace">
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
};
