"use client"; // Markér som klient-komponent
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

// Spørgsmål og svar data
const categories = [
  {
    name: "Færdiggør sætningen",
    questions: [
      { value: 100, question: "Hvad er verdens længste flod?", answer: "Nilen" },
      { value: 200, question: "Hvad hedder Danmarks hovedstad?", answer: "København" },
      { value: 300, question: "Hvilken planet er den største?", answer: "Jupiter" },
      { value: 400, question: "Hvad er det periodiske symbol for vand?", answer: "H2O" },
      { value: 500, question: "Hvilken farve har solen?", answer: "Hvid" },
    ],
  },
  {
    name: "Undskyld wa' sa' do?",
    questions: [
      { value: 100, question: "Hvad er hovedstaden i Sverige?", answer: "Stockholm" },
      { value: 200, question: "Hvem skrev 'Hamlet'?", answer: "Shakespeare" },
      { value: 300, question: "Hvad er 5+5?", answer: "10" },
      { value: 400, question: "Hvad er firkanten med fire lige lange sider?", answer: "Kvadrat" },
      { value: 500, question: "Hvad er verdens største land?", answer: "Rusland" },
    ],
  },
  {
    name: "Som far ville have gjort det",
    questions: [
      { value: 100, question: "Hvad er 2+2?", answer: "4" },
      { value: 200, question: "Hvad er 3x3?", answer: "9" },
      { value: 300, question: "Hvilken gas indånder vi for at leve?", answer: "Oxygen" },
      { value: 400, question: "Hvad er hovedstaden i Norge?", answer: "Oslo" },
      { value: 500, question: "Hvem er forfatter til 'Ringenes Herre'?", answer: "J.R.R. Tolkien" },
    ],
  },
  {
    name: "Hvilken lokation?",
    questions: [
      { value: 100, question: "Hvad hedder verdens højeste bjerg?", answer: "Mount Everest" },
      { value: 200, question: "Hvilket land har flest øer?", answer: "Sverige" },
      { value: 300, question: "Hvad hedder den største ørken?", answer: "Sahara" },
      { value: 400, question: "Hvad er hovedstaden i USA?", answer: "Washington, D.C." },
      { value: 500, question: "Hvilket land kaldes 'Solens Rige'?", answer: "Japan" },
    ],
  },
];

export default function Game() {
  const searchParams = useSearchParams();
  const teams = parseInt(searchParams.get("teams")) || 2; // Hent antal hold, standard 2
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [scores, setScores] = useState(Array(teams).fill(0)); // Score for hvert hold

  const handleQuestionClick = (categoryIndex, questionValue) => {
    const question = categories[categoryIndex].questions.find((q) => q.value === questionValue);
    setSelectedQuestion({ ...question, category: categories[categoryIndex].name });
    setShowAnswer(false); // Skjul svaret, når et nyt spørgsmål åbnes
  };

  const closeQuestion = () => {
    setSelectedQuestion(null);
  };

  const updateScore = (teamIndex, value) => {
    const newScores = [...scores];
    newScores[teamIndex] += value;
    setScores(newScores);
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-blue-800 text-white">
      {/* Titel */}
      <h1 className="text-4xl font-bold my-4">LEAHS JEOPARDY</h1>

      {/* Grid-layout */}
      <div className="grid grid-cols-4 grid-rows-5 gap-4 w-full h-[65%] px-4">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="flex flex-col items-center border-4 border-white bg-blue-700">
            <h2 className="text-xl font-bold w-full text-center py-4 border-b-4 border-white">{category.name}</h2>
            {category.questions.map((question, questionIndex) => (
              <button key={questionIndex} className="flex items-center justify-center text-4xl font-bold bg-blue-600 hover:bg-blue-700 border-t-4 border-white w-full h-full py-8" onClick={() => handleQuestionClick(categoryIndex, question.value)}>
                {question.value}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Scoreboard */}
      <div className="flex justify-center gap-8 mt-2 w-full px-4">
        {scores.map((score, teamIndex) => (
          <div key={teamIndex} className="flex flex-col items-center bg-blue-700 border-2 border-white p-4 rounded-lg w-36">
            <h3 className="text-xl font-bold mb-2">Team {teamIndex + 1}</h3>
            <div className="text-3xl font-bold">{score}</div>
            <div className="flex mt-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-green-700" onClick={() => updateScore(teamIndex, 100)}>
                +
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700" onClick={() => updateScore(teamIndex, -100)}>
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal til spørgsmål */}
      {selectedQuestion && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white text-black rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-bold mb-4">Spørgsmål fra {selectedQuestion.category}</h2>
            <p className="mb-4">{showAnswer ? selectedQuestion.answer : selectedQuestion.question}</p>
            {!showAnswer && (
              <button onClick={() => setShowAnswer(true)} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 mb-4">
                Se svar
              </button>
            )}
            <button onClick={closeQuestion} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800">
              Luk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
