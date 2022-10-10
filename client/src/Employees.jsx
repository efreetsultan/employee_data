import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import {
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material/";
import { Delete, Upgrade } from "@mui/icons-material";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export default function Employees() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    deleteEmployee(id).catch((error) => {
      console.log(error);
    });
    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
    setOpen(false);
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setData(employees);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setData(null);
        setLoading(false);
        setError(error);
        console.log(error);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data || !data.length) {
    return <h1>No employees found yet.</h1>;
  }

  return (
    <div>
      <Button variant="contained">
        <Link to="/create">Create employee</Link>
      </Button>
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell component={Paper}>Name</TableCell>
            <TableCell component={Paper}>Level</TableCell>
            <TableCell component={Paper}>Position</TableCell>
            <TableCell component={Paper}>Starting Date</TableCell>
            <TableCell component={Paper}>Favorite Color</TableCell>
            <TableCell component={Paper}>Current Salary</TableCell>
            <TableCell component={Paper}>Desired Salary</TableCell>
            <TableCell component={Paper}>Diff</TableCell>
            <TableCell component={Paper}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.level}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.startingDate.slice(0, 10)}</TableCell>
              <TableCell style={{ backgroundColor: employee.favoriteColor }}></TableCell>
              <TableCell>{employee.currentSalary + " $"}</TableCell>
              <TableCell>{employee.desiredSalary + " $"}</TableCell>
              <TableCell>{employee.desiredSalary-employee.currentSalary + " $"}</TableCell>
              <TableCell style={{display:"flex"}}>
                <Tooltip title="Update">
                  <Button variant="contained">
                    <Link to={`/update/${employee._id}`}>
                      <Upgrade />
                    </Link>
                  </Button>
                </Tooltip>
                <div>
                  <Tooltip title="Delete">
                    <Button variant="contained" onClick={handleClickOpen}>
                      <Delete />
                    </Button>
                  </Tooltip>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Confirmation"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Do you really want to delete this shit?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Nope!</Button>
                      <Button
                        onClick={() => handleDelete(employee._id)}
                        autoFocus
                      >
                        Yepp!
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </div>
  );
}
