import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import {Button, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, Tooltip} from '@mui/material/';
import {Delete, Upgrade} from '@mui/icons-material';

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

  const handleDelete = (id) => {
    deleteEmployee(id).catch((error) => {
      console.log(error);
    });
    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
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
            <TableCell component={Paper}>Actions</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {data.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.level}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <Tooltip title="Update">
                  <Button variant="contained">
                  <Link to={`/update/${employee._id}`}><Upgrade /></Link>
                  </Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                  <Button variant="contained" onClick={() => handleDelete(employee._id)} >
                  <Delete />
                </Button>
                  </Tooltip>
                  <Tooltip title="Add Notes">
                  <Button variant="contained">
                  <Link to={`/notes/${employee._id}`}><Upgrade /></Link>
                  </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </TableContainer>
    </div>
  );
}
