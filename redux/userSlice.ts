import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeatherData } from "../api/FetchWeatherData";

interface WeatherState {
  value: any;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  value: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (location: string) => {
    const data = await fetchWeatherData(location);
    console.log("bye");
    return data;
  }
);

const weatherSlice = createSlice({
  name: "Weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error fetching weather data";
      });
  },
});

export default weatherSlice.reducer;
