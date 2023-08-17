import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  value: any;
}

const initialState: WeatherState = {
  value: "Weather App",
};

const weatherSlice = createSlice({
  name: "Weather",
  initialState,
  reducers: {},
});

export default weatherSlice.reducer;
