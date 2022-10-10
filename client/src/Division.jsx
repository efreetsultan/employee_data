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

const fetchDivisions = () => {
  return fetch("/api/divisions").then((res) => res.json());
};

const deleteDivisions = (id) => {
  return fetch(`/api/divisions/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export default function Divisions() {
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
    deleteDivisions(id).catch((error) => {
      console.log(error);
    });
    setData((divisions) => {
      return divisions.filter((division) => division._id !== id);
    });
    setOpen(false);
  };

  useEffect(() => {
    fetchDivisions()
      .then((divisions) => {
        setData(divisions);
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
    return <h1>No divisions found yet.</h1>;
  }

  return (
    <div>
      <Button variant="contained">
        <Link to="/division/create">Create divisions</Link>
      </Button>
      <Button variant="contained">
        <Link to="/">Employee</Link>
      </Button>
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell component={Paper}>Name</TableCell>
            <TableCell component={Paper}>Boss</TableCell>
            <TableCell component={Paper}>Budget</TableCell>
            <TableCell component={Paper}>City</TableCell>
            <TableCell component={Paper}>Country</TableCell>
            <TableCell component={Paper}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((division) => (
            <TableRow key={division._id}>
              <TableCell>{division.name}</TableCell>
              <TableCell>{division.boss.name}</TableCell>
              <TableCell>{division.budget}</TableCell>
              <TableCell style={{ display: "flex" }}>
                <Tooltip title="Update">
                  <Button variant="contained">
                    <Link to={`/division/update/${division._id}`}>
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
                        onClick={() => handleDelete(division._id)}
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
