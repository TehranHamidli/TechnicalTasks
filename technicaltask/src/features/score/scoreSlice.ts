import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Score {
  id: number;
  student: string;
  teacher: string;
  lesson: string;
  classRoom: string;
  dateTime: string;
  score: number;
}

export interface ScoreState {
  scores: Score[];
}

const initialState: ScoreState = {
  scores: [],
};

const scoreSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<Score>) => {
      state.scores.push(action.payload);
    },
    removeScore: (state, action: PayloadAction<number>) => {
      state.scores = state.scores.filter(score => score.id !== action.payload);
    },
    updateScore: (state, action: PayloadAction<Score>) => {
      const { id, student, teacher, lesson, classRoom, dateTime, score } = action.payload;
      const existingScore = state.scores.find(score => score.id === id);
      if (existingScore) {
        existingScore.student = student;
        existingScore.teacher = teacher;
        existingScore.lesson = lesson;
        existingScore.classRoom = classRoom;
        existingScore.dateTime = dateTime;
        existingScore.score = score;
      }
    },
  },
});

export const { addScore, removeScore, updateScore } = scoreSlice.actions;
export default scoreSlice.reducer;
