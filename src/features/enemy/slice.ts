import { createSlice } from '@reduxjs/toolkit';

interface EnemyState {
  hits: number;
}

const initialState: EnemyState = { hits: 0 };

export const enemySlice = createSlice({
  name: 'enemy',
  initialState,
  reducers: {
    hitRequested() {
    },
    hitSuccess(state) {
      state.hits += 1;
    },
  },
});

export const { hitRequested, hitSuccess } = enemySlice.actions;
export default enemySlice.reducer;
