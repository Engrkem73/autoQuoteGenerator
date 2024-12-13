"use client"
import { useState, useEffect } from "react";
import getData from "./api/quotes";

interface Quote {
  q: string;
  a: string;
  h: string;
}

export default function Home() {
  const [quote, setQuote] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [author, setAuthor] = useState("");
  const [countdownDuration, setCountdownDuration] = useState(5000);
  const [generate, setGenerate] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const fetchQuotes = async () => {
    const data = await getData();
    setQuotes(data);
  };
  useEffect(() => {
    fetchQuotes();
  }, []);

  function startButton() {
    generateQuote();
    setIsCountdownActive(!isCountdownActive);
  }
  function startCountdown() {
    const endTime = new Date().getTime() + countdownDuration;
  
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endTime - now; 
        if (timeLeft <= 0) {
          clearInterval(interval);
          setGenerate(true);
          generateQuote();
          setCountdownDuration(5000);
        } else {
          setCountdownDuration(timeLeft);
        }
      }, 1000);
    }
  function generateQuote() {
    if (generate === true) {
      if (quotes.length === 0) return; // Prevent accessing undefined
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex].q);
      setAuthor(quotes[randomIndex].a);
      setGenerate(false);
    }
  }
  
  
  if (isCountdownActive) {
    startCountdown();
  }

  function showQuote() {
    if (!isCountdownActive && !quote) {
      return "Generate Your Own Quotes";
    }if (isCountdownActive && !quote) {
      return "Generating... Please Wait";
    }
    return quote;
  }
  console.log(countdownDuration);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6">
      <div className="w-full max-w-md flex flex-col p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">{showQuote()}</h3>
        <p className="text-xl font-semibold text-center text-gray-600 mb-4">{author}</p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out self-center text-lg" onClick={startButton}>{isCountdownActive ? "Stop" : "Start"}</button>
      </div>
    </main>
  );
}
