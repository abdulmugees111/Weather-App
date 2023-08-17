import React from "react";
import WeatherApp from "../components/WeatherApp";
const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WeatherApp />
    </main>
  );
};

export default Home;
