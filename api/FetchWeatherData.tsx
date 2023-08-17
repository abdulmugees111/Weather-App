export const fetchWeatherData = async (apiKey: string, location: string) => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/${process.env.NEXT_PUBLIC_WEATHER}?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${location}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };
