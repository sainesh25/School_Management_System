import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    isLoggedIn : false,
    user: null,
    errorMessage: '',
    successMessage: '',
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
            state.successMessage = '';        
        },
        addSuccessMessage: (state, action) => {
            state.successMessage = action.payload;
            state.errorMessage = '';
        },
        addUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        userLoggedIn : (state) => {
            state.isLoggedIn = true;
        },
        userLoggedOut : (state) => {
            state.isLoggedIn = false;
        },
    }
});

export const {addUser, clearUser, addErrorMessage, addSuccessMessage, userLoggedIn, userLoggedOut} = authSlice.actions;
export default authSlice.reducer;