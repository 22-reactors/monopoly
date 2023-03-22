import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Config } from '../../pages/gameSetup/const';
import { IConfig } from '../../pages/gameSetup/gameSetup';

const initialState: IConfig[] = [];

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayerAction(state, action: PayloadAction<IConfig>) {
      const name = action.payload[Config.NAME];
      const type = action.payload[Config.TYPE];
      const color = action.payload[Config.COLOR];

      state.push({
        name,
        type,
        color,
      });
    },
    resetPlayersAction: () => initialState
  },
});

export const { addPlayerAction } = playersSlice.actions;
export const { resetPlayersAction } = playersSlice.actions;

export default playersSlice.reducer;
