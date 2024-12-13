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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
      <div className="w-[800px] flex flex-col p-4 justify-between bg-blue-500 min-h-[400px] max-w-full">
        <h3>{quote}</h3>
        <button className="bg-gray-500 text-white px-4 py-2 rounded w-[100px] self-end" onClick={startButton}>{isCountdownActive ? "Stop" : "Start"}</button>
      </div>
    </main>
  );
}
