import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Student {
  id: string;
  name: string;
  surname: string;
  studentNo: number;
  class: string;
}

export interface StudentState {
  students: Student[];
}

const initialState: StudentState = {
  students: [],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
    removeStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      const { id, name, surname, studentNo, class: studentClass } = action.payload;
      const existingStudent = state.students.find(student => student.id === id);
      if (existingStudent) {
        existingStudent.name = name;
        existingStudent.surname = surname;
        existingStudent.studentNo = studentNo;
        existingStudent.class = studentClass;
      }
    },
  },
});

export const { addStudent, removeStudent, updateStudent } = studentSlice.actions;
export default studentSlice.reducer;
