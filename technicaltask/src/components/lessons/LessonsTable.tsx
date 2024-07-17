import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { RootState } from "../../store";
import {
  removeLesson,
  updateLesson,
} from "../../features/lessons/lessonsSlice";
import { Lesson } from "../../features/lessons/lessonsSlice"; 


const LessonTable: React.FC = () => {
  const lessons = useSelector((state: RootState) => state.lessons.lessons);
  const dispatch = useDispatch();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>({
    id: 0,
    lessonName: "",
    teacherName: "",
    teacherNo: 0,
    class: "",
    score: 0,
    dateTime: "",
    classRoom: "",
    student: "",
  });

  const handleDelete = (id: number) => {
    const lessonToDelete = lessons.find((lesson: Lesson) => lesson.id === id);
    if (lessonToDelete) {
      setSelectedLesson(lessonToDelete);
      setOpenDeleteDialog(true);
    }
  };

  const confirmDelete = () => {
    dispatch(removeLesson(selectedLesson.id));
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleUpdate = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLesson({
      ...selectedLesson,
      [e.target.name]: e.target.name === "teacherNo" ? parseInt(e.target.value, 10) : e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(updateLesson(selectedLesson));
    setOpenEditDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lesson Name</TableCell>
              <TableCell>Teacher Name</TableCell>
              <TableCell>Teacher No</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.lessonName}</TableCell>
                <TableCell>{lesson.teacherName}</TableCell>
                <TableCell>{lesson.teacherNo}</TableCell>
                <TableCell>{lesson.class}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: "8px" }}
                    onClick={() => handleDelete(lesson.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(lesson)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Lesson</DialogTitle>
        <DialogContent>
          <TextField
            label="Lesson Name"
            name="lessonName"
            value={selectedLesson.lessonName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teacher Name"
            name="teacherName"
            value={selectedLesson.teacherName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teacher No"
            name="teacherNo"
            value={selectedLesson.teacherNo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Class"
            name="class"
            value={selectedLesson.class}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Delete Lesson</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete lesson: {selectedLesson.lessonName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LessonTable;
