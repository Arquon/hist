import { type IUserData } from "@/types/IUserData";
import { type Nullable } from "@/types/default";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCurrentUserData, signIn, signUp } from "./actions";
import { isAuthAsyncThunkError } from "@/utils/isAsyncThunkError";

interface AuthState {
   currentUser: Nullable<IUserData>;
   isLoading: boolean;
}

const initialState: AuthState = {
   currentUser: null,
   isLoading: true,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      signOut(state) {
         state.currentUser = null;
      },
   },
   extraReducers(builder) {
      builder
         .addCase(signIn.fulfilled, (state, action) => {
            state.currentUser = action.payload;
         })
         .addCase(signUp.fulfilled, (state, action) => {
            state.currentUser = action.payload;
         })
         .addCase(getCurrentUserData.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getCurrentUserData.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
         })
         .addMatcher(isAuthAsyncThunkError, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
         });
   },
});

const { actions, reducer: authReducer } = authSlice;

export { actions };
export default authReducer;
