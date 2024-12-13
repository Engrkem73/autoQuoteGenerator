"use client"
import { useState, useEffect } from "react";

interface Quote {
  q: string;
  a: string;
  h: string;
}

export default function Home() {
  const [quote, setQuote] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [countdownDuration, setCountdownDuration] = useState(5000);
  const [generate, setGenerate] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    async function getData() {
      const res = await fetch("api/quotes");
      const data = await res.json();
      setQuotes(data);
    }
  
    // Fetch quotes immediately on load
    getData();
  
    // Set up an interval to fetch quotes every 10 seconds
    const intervalId = setInterval(() => {
      getData();
    }, 864000000); // 10000 milliseconds = 10 seconds
  
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  function startButton() {
    generateQuote();
    setIsCountdownActive(!isCountdownActive);
  }
  function startCountdown() {
    const endTime = new Date().getTime() + countdownDuration;
    if (isCountdownActive) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endTime - now; 
        if (timeLeft <= 0) {
          clearInterval(interval);
          setCountdownDuration(5000);
          setGenerate(true);
          generateQuote();
        } else {
          setCountdownDuration(timeLeft);
        }
      }, 1000);
    }
  }
  function generateQuote() {
    if (generate === true) {
      if (quotes.length === 0) return; // Prevent accessing undefined
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex].q);
      setGenerate(false);
    }
  }
  
  
  if (isCountdownActive) {
    startCountdown();
  }
  
  console.log(quote);
  console.log(countdownDuration);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6">
      <div className="w-full max-w-md flex flex-col p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">{quote}</h3>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out self-center text-lg" onClick={startButton}>{isCountdownActive ? "Stop" : "Start"}</button>
      </div>
    </main>
  );
}
