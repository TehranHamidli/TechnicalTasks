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
import { removeScore, updateScore } from "../../features/score/scoreSlice";
import { Score } from "../../features/score/scoreSlice";

const ScoresTable: React.FC = () => {
  const scores = useSelector((state: RootState) => state.score.scores);
  const dispatch = useDispatch();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedScore, setSelectedScore] = useState<Score>({
    id: 0,
    student: "",
    teacher: "",
    lesson: "",
    classRoom: "",
    dateTime: "",
    score: 0,
  });

  const handleDelete = (id: number) => {
    const scoreToDelete = scores.find((score) => score.id === id);
    if (scoreToDelete) {
      setSelectedScore(scoreToDelete);
      setOpenDeleteDialog(true);
    }
  };
// test
  const confirmDelete = () => {
    dispatch(removeScore(selectedScore.id));
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleUpdate = (score: Score) => {
    setSelectedScore(score);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedScore({
      ...selectedScore,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(updateScore(selectedScore));
    setOpenEditDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Lesson</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Date-Time</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map((score) => (
              <TableRow key={score.id}>
                <TableCell>{score.student}</TableCell>
                <TableCell>{score.teacher}</TableCell>
                <TableCell>{score.lesson}</TableCell>
                <TableCell>{score.classRoom}</TableCell>
                <TableCell>{score.dateTime}</TableCell>
                <TableCell>{score.score}</TableCell>
                <TableCell style={{display:"flex"}}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: "8px" }}
                    onClick={() => handleDelete(score.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(score)}
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
        <DialogTitle>Edit Score</DialogTitle>
        <DialogContent>
          <TextField
            label="Student"
            name="student"
            value={selectedScore.student}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teacher"
            name="teacher"
            value={selectedScore.teacher}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Lesson"
            name="lesson"
            value={selectedScore.lesson}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Class"
            name="classRoom"
            value={selectedScore.classRoom}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date-Time"
            name="dateTime"
            type="datetime-local"
            value={selectedScore.dateTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Score"
            name="score"
            type="number"
            value={selectedScore.score}
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
        <DialogTitle>Delete Score</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete score: {selectedScore.lesson}?
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

export default ScoresTable;
