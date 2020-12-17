import React, { useState, useEffect } from "react";

export default function Greeting({ name = "world!" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState({});

  useEffect(() => {
    async function getGreeting() {
      const response = await fetch(`/greeting?name=${name}`);
      const data = await response.json();

      setIsLoading(false);
      setGreeting(data);
    }

    getGreeting();
  }, []);

  if (isLoading) {
    return <p>Is loading...</p>;
  }

  return <h1>{greeting.content}</h1>;
}
