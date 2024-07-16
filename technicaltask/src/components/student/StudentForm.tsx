import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '../../features/students/studentSlice';
import { TextField, Button } from '@mui/material';
import StudentTable from './StudentTable';

const StudentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [studentNoError, setStudentNoError] = useState('');
  const [studentClassError, setStudentClassError] = useState('');
  const dispatch = useDispatch();

  const validateInputs = () => {
    let valid = true;
    if (!name) {
      setNameError('Please enter a name.');
      valid = false;
    } else {
      setNameError('');
    }
    if (!surname) {
      setSurnameError('Please enter a surname.');
      valid = false;
    } else {
      setSurnameError('');
    }
    if (!studentNo) {
      setStudentNoError('Please enter a student number.');
      valid = false;
    } else {
      setStudentNoError('');
    }
    if (!studentClass) {
      setStudentClassError('Please enter a class.');
      valid = false;
    } else {
      setStudentClassError('');
    }
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      const newStudent = { id: Math.random().toString(), name, surname, studentNo: Number(studentNo), class: studentClass };
      dispatch(addStudent(newStudent));
      setName('');
      setSurname('');
      setStudentNo('');
      setStudentClass('');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          label="Student Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
          margin="normal"
          error={!!surnameError}
          helperText={surnameError}
        />
        <TextField
          label="Student No"
          value={studentNo}
          onChange={(e) => setStudentNo(e.target.value)}
          fullWidth
          margin="normal"
          type="number"
          error={!!studentNoError}
          helperText={studentNoError}
        />
        <TextField
          label="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          fullWidth
          margin="normal"
          error={!!studentClassError}
          helperText={studentClassError}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Add</Button>
      </form>

<StudentTable />
    </>
  );
};

export default StudentForm;
