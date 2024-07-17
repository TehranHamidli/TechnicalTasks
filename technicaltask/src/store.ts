
import { configureStore } from '@reduxjs/toolkit';

import studentReducer from './features/students/studentSlice'
import lessonsReducer from './features/lessons/lessonsSlice'
import scoreReducer from './features/score/scoreSlice'


export const store = configureStore({
  reducer: {
    students: studentReducer,
    lessons: lessonsReducer,
    score: scoreReducer,
  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
