import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

const createEmployee = (employee) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

export default function EmployeeCreator() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleCreateEmployee = (event) => {
    event.preventDefault();
    setLoading(true)
    createEmployee({ name, level, position })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleCreateEmployee}>
        <div>
          <TextField
            required
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            variant="outlined"
            label="Name:"
          ></TextField>
        </div>
        <div>
          <TextField
            required
            id="level"
            type="text"
            value={level}
            onChange={handleLevelChange}
            variant="outlined"
            label="Level:"
          ></TextField>
        </div>
        <div>
          <TextField
            required
            id="position"
            type="text"
            value={position}
            onChange={handlePositionChange}
            variant="outlined"
            label="Position:"
          ></TextField>
        </div>
        <div>
          <Button variant="contained" type="Submit" disabled={loading}>
            Create Employee
          </Button>
          <Button variant="contained"><Link to="/">Back</Link></Button>
        </div>
      </form>
    </div>
  );
}
