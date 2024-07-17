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
  removeStudent,
  updateStudent,
} from "../../features/students/studentSlice";

const StudentTable: React.FC = () => {
  const students = useSelector((state: RootState) => state.students.students);
  const dispatch = useDispatch();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    name: "",
    surname: "",
    studentNo: 0,
    class: "",
  });

  const handleDelete = (id: string) => {
    const studentToDelete = students.find((student) => student.id === id);
    if (studentToDelete) {
      setSelectedStudent(studentToDelete);
      setOpenDeleteDialog(true);
    }
  };

  const confirmDelete = () => {
    dispatch(removeStudent(selectedStudent.id));
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleUpdate = (student: any) => {
    setSelectedStudent(student);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStudent({
      ...selectedStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(updateStudent(selectedStudent));
    setOpenEditDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Student Surname</TableCell>
              <TableCell>Student No</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.surname}</TableCell>
                <TableCell>{student.studentNo}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(student.id)}
                    style={{ marginRight: "8px" }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(student)}
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
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Student Name"
            name="name"
            value={selectedStudent.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Student Surname"
            name="surname"
            value={selectedStudent.surname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Student No"
            name="studentNo"
            value={selectedStudent.studentNo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Class"
            name="class"
            value={selectedStudent.class}
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
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedStudent.name}{" "}
            {selectedStudent.surname}?
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

export default StudentTable;
