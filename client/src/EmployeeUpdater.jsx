import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, MenuItem, TextField, Select } from "@mui/material/";
import { Link } from "react-router-dom";

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const fetchLocations = (id) => {
  return fetch("/api/locations").then((res) => res.json());
};

export default function EmployeeUpdater() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [level, setLevel] = useState();
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [pickLoc, setPickLoc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee(id)
      .then((employee) => {
        setName(employee.name);
        setLevel(employee.level);
        setPosition(employee.position);
      })
      .catch((error) => console.log(error));
      fetchLocations(id)
        .then((response) => {
          console.log(location);
          setPickLoc(response);
          setLoading(false);
        })
        .then((error) => {
          console.log(error);
        });
  }, [id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    console.log(event.target);
  };

  const handleUpdateEmployee = (event) => {
    event.preventDefault();
    updateEmployee({ id, name, level, position, location })
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
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <form onSubmit={handleUpdateEmployee} disabled={loading}>
            <div>
              <TextField
                required
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                variant="standard"
                label="Name: "
              ></TextField>
            </div>
            <div>
              <TextField
                required
                id="level"
                type="text"
                value={level}
                onChange={handleLevelChange}
                variant="standard"
                label="Level: "
              ></TextField>
            </div>
            <div>
              <TextField
                required
                id="position"
                type="text"
                value={position}
                onChange={handlePositionChange}
                variant="standard"
                label="Position: "
              ></TextField>
            </div>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location}
              label="City"
              onChange={handleLocationChange}
            >
              {pickLoc.map((element) => (
                // <div key={loc._id}>
                <MenuItem key={element._id} id={element._id} value={element}>
                  {element.city}
                </MenuItem>
                // </div>
              ))}
            </Select>
            <div>
              <Button variant="contained" type="Submit" disabled={loading}>
                Update employee
              </Button>
              <Button variant="text">
                <Link to="/">Back</Link>
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
