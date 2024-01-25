import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    teachers: [],
    isLoading: false,
    errorMessage: '',
}

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        saveTeachers: (state, action) => {
            state.teachers = action.payload;
        },
    }
})

export const { saveTeachers } = teacherSlice.actions;
export default teacherSlice.reducer;