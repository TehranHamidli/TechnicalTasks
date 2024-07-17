import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Lesson {
  score: number;
  dateTime: string;
  classRoom: string;
  student: string;
  id: number;
  lessonName: string;
  teacherName: string;
  teacherNo: number;
  class: string;
}

export interface LessonState {
  lessons: Lesson[];
}

const initialState: LessonState = {
  lessons: [],
};

const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    addLesson: (state, action: PayloadAction<Lesson>) => {
      state.lessons.push(action.payload);
    },
    removeLesson: (state, action: PayloadAction<number>) => {
      state.lessons = state.lessons.filter(lesson => lesson.id !== action.payload);
    },
    updateLesson: (state, action: PayloadAction<Lesson>) => {
      const { id, lessonName, teacherName, teacherNo, class: lessonClass } = action.payload;
      const existingLesson = state.lessons.find(lesson => lesson.id === id);
      if (existingLesson) {
        existingLesson.lessonName = lessonName;
        existingLesson.teacherName = teacherName;
        existingLesson.teacherNo = teacherNo;
        existingLesson.class = lessonClass;
      }
    },
  },
});

export const { addLesson, removeLesson, updateLesson } = lessonSlice.actions;
export default lessonSlice.reducer;
