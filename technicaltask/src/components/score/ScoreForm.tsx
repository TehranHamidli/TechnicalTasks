import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import { addScore } from "../../features/score/scoreSlice";
import { RootState } from "../../store";
import ScoresTable from "./ScoreTable";

const ScoreForm: React.FC = () => {
  const students = useSelector((state: RootState) => state.students.students);
  const lessons = useSelector((state: RootState) => state.lessons.lessons);

  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [lesson, setLesson] = useState("");
  const [classRoom, setClassRoom] = useState("");
  const [dateTime, setDateTime] = useState<Date | null>(new Date());
  const [score, setScore] = useState<number | undefined>(undefined);

  const dispatch = useDispatch();

  const handleStudentChange = (selectedStudent: string) => {
    setStudent(selectedStudent);

    const selectedStudentObject = students.find((s) => s.name === selectedStudent);
    if (selectedStudentObject) {
      setClassRoom(selectedStudentObject.class);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newScore = {
      id: Math.floor(Math.random() * 1000),
      student,
      teacher,
      lesson,
      classRoom,
      dateTime: dateTime?.toISOString() || new Date().toISOString(),
      score: score || 0,
    };

    dispatch(addScore(newScore));

    setStudent("");
    setTeacher("");
    setLesson("");
    setClassRoom("");
    setDateTime(new Date());
    setScore(undefined);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Scores
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        gap="2rem"
        width="100%"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={{ xs: "100%", md: "50%" }}
          maxWidth="400px"
        >
          <form onSubmit={handleSubmit}>
            <TextField
              select
              label="Student"
              value={student}
              onChange={(e) => handleStudentChange(e.target.value)}
              fullWidth
              margin="normal"
              required
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.name}>
                  {student.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Teacher"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              fullWidth
              margin="normal"
              required
            >
              {lessons.map((lesson) => (
                <MenuItem key={lesson.id} value={lesson.teacherName}>
                  {lesson.teacherName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Lesson"
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              fullWidth
              margin="normal"
              required
            >
              {lessons.map((lesson) => (
                <MenuItem key={lesson.id} value={lesson.id}>
                  {lesson.lessonName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Class"
              value={classRoom}
              onChange={(e) => setClassRoom(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Score"
              type="number"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Date-Time"
              type="datetime-local"
              value={dateTime?.toISOString().substr(0, 16) || ""}
              onChange={(e) => setDateTime(new Date(e.target.value))}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Score
            </Button>
          </form>
        </Box>

        <Box width={{ xs: "100%", md: "60%" }}>
          <ScoresTable />
        </Box>
      </Box>
    </Box>
  );
};

export default ScoreForm;
