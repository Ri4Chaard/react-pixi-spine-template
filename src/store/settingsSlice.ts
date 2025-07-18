import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';

interface SettingsState {
  fpsLimit: number;
}

const initialState: SettingsState = {
  fpsLimit: 30,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setFpsLimit(state, action: PayloadAction<number>) {
      state.fpsLimit = action.payload;
    },
  },
});

export const { setFpsLimit } = settingsSlice.actions;
export default settingsSlice.reducer;
