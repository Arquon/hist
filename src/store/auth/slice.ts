import { type IUserData } from "@/types/IUserData";
import { type Nullable } from "@/types/default";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
   currentUser: Nullable<IUserData>;
   isLoading: boolean;
   error: Nullable<string>;
}

const initialState: AuthState = {
   currentUser: null,
   isLoading: true,
   error: null,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setCurrentUser(state, action: PayloadAction<Nullable<IUserData>>) {
         state.currentUser = action.payload;
      },
      setLoading(state, action: PayloadAction<boolean>) {
         state.isLoading = action.payload;
      },
   },
});

const { actions, reducer: authReducer } = authSlice;

export { actions };
export default authReducer;
