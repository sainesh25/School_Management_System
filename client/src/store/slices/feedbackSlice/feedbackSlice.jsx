import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    feedbacks : []
}

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        saveFeedbackMessage : (state, action) => {
            state.feedbacks = action.payload;
        }
    }
});

export const { saveFeedbackMessage } = feedbackSlice.actions;
export default feedbackSlice.reducer;