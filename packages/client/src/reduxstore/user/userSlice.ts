import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../utils/interfaces";

const initialState: IUser | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload;

    }
  }
})

/* export const {} */

export default userSlice.reducer;