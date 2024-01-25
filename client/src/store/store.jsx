import {configureStore} from '@reduxjs/toolkit';

import authReducer from './slices/authSlice/authSlice';
import teacherReducer from './slices/teacherSlice/teacherSlice'
import feedbackReducer from './slices/feedbackSlice/feedbackSlice';

const store = configureStore({  
    reducer: {
        authentication: authReducer,
        teacher: teacherReducer,
        feedback: feedbackReducer,
    }
})

export default store;

