import { useState } from 'react';

import StudentForm from './components/student/StudentForm';
import { Button, Box } from '@mui/material';
import LessonForm from './components/lessons/LessonsForm';
import ScoreForm from './components/score/ScoreForm';

function App() {
  const [selectedForm, setSelectedForm] = useState('student');

  const handleFormChange = (form: string) => {
    setSelectedForm(form);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" p={2}>
        <Button
          onClick={() => handleFormChange('student')}
          variant={selectedForm === 'student' ? 'contained' : 'outlined'}
          color="primary"
          style={{ marginRight: '10px' }}
        >
          Student
        </Button>
        <Button
          onClick={() => handleFormChange('lesson')}
          variant={selectedForm === 'lesson' ? 'contained' : 'outlined'}
          color="primary"
          style={{ marginRight: '10px' }}
        >
          Lessons
        </Button>
        <Button
          onClick={() => handleFormChange('score')}
          variant={selectedForm === 'score' ? 'contained' : 'outlined'}
          color="primary"
        >
          Score
        </Button>
      </Box>
      {selectedForm === 'student' && (
        <Box p={3}>
        
          <StudentForm />
        </Box>
      )}
      {selectedForm === 'lesson' && (
        <Box p={3}>
        
          <LessonForm />
        </Box>
      )}
      {selectedForm === 'score' && (
        <Box p={3}>
        
          <ScoreForm />
        </Box>
      )}
    </>
  );
}

export default App;
