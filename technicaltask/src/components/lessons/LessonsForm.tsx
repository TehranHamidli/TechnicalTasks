import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Box, Typography } from "@mui/material";
import { addLesson } from "../../features/lessons/lessonsSlice";
import LessonTable from "./LessonsTable";
import { Lesson } from "../../features/lessons/lessonsSlice"; 

const LessonForm: React.FC = () => {
  const [lessonName, setLessonName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherNo, setTeacherNo] = useState("");
  const [lessonClass, setLessonClass] = useState("");
  const [lessonNameError, setLessonNameError] = useState("");
  const [teacherNameError, setTeacherNameError] = useState("");
  const [teacherNoError, setTeacherNoError] = useState("");
  const [lessonClassError, setLessonClassError] = useState("");
  const dispatch = useDispatch();

  const validateInputs = () => {
    let valid = true;
    if (!lessonName) {
      setLessonNameError("Please enter a lesson name.");
      valid = false;
    } else {
      setLessonNameError("");
    }
    if (!teacherName) {
      setTeacherNameError("Please enter a teacher name.");
      valid = false;
    } else {
      setTeacherNameError("");
    }
    if (!teacherNo) {
      setTeacherNoError("Please enter a teacher number.");
      valid = false;
    } else {
      setTeacherNoError("");
    }
    if (!lessonClass) {
      setLessonClassError("Please enter a class.");
      valid = false;
    } else {
      setLessonClassError("");
    }
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      const newLesson: Lesson = {
        id: Math.floor(Math.random() * 1000),
        lessonName,
        teacherName,
        teacherNo: Number(teacherNo),
        class: lessonClass,
        score: 0,
        dateTime: new Date().toISOString(), 
        classRoom: "",
        student: "",
      };
      dispatch(addLesson(newLesson));
      setLessonName("");
      setTeacherName("");
      setTeacherNo("");
      setLessonClass("");
    }
  };

  return (
    <>
      <Typography variant="h4" display="flex" justifyContent="center">
        Lessons
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        gap="2rem"
        marginTop={{ xs: "2rem", md: 0 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={{ xs: "100%", md: "35%" }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              label="Lesson Name"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              fullWidth
              margin="normal"
              error={!!lessonNameError}
              helperText={lessonNameError}
            />
            <TextField
              label="Teacher Name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              fullWidth
              margin="normal"
              error={!!teacherNameError}
              helperText={teacherNameError}
            />
            <TextField
              label="Teacher No"
              value={teacherNo}
              onChange={(e) => setTeacherNo(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
              error={!!teacherNoError}
              helperText={teacherNoError}
            />
            <TextField
              label="Class"
              value={lessonClass}
              onChange={(e) => setLessonClass(e.target.value)}
              fullWidth
              margin="normal"
              error={!!lessonClassError}
              helperText={lessonClassError}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add lessons
            </Button>
          </form>
        </Box>

        <Box width={{ xs: "100%", md: "50%" }}>
          <LessonTable />
        </Box>
      </Box>
    </>
  );
};

export default LessonForm;
