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

export default function EmployeeUpdater() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [position, setPosition] = useState("");
  const [array, setArray] = useState([]);
  const [object1, setObject1] = useState(null);
  const [object2, setObject2] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee(id)
      .then((employee) => {
        setName(employee.name);
        setLevel(employee.level);
        setPosition(employee.position);
        setArray(
          employee.array.length === 0
            ? [{ object1: "", object2: "" }]
            : employee.array
        );
        console.log(array);
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

  const handleObject1Change = (event, index) => {
    let bela = [...array];
    bela[index].object1 = event;
    setObject1(event.target.value);
    setArray(bela);
    console.log(array);
  };

  const handleObject2Change = (event, index) => {
    let bela = [...array];
    bela[index].labelForWork = event.target.value;
    setObject2(event.target.value)
    setArray(bela);
    console.log(array);
  };

  const handleUpdateEmployee = (event) => {
    event.preventDefault();
    updateEmployee({ id, name, level, position, array: {object1, object2} })
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
        {array.map((element, index) => (
          <div key={index}>
            <div>
              <TextField
                required
                id="position"
                type="text"
                value={object1}
                onChange={(event) => handleObject1Change(event, index)}
                variant="standard"
                label="Working Hours:  "
              ></TextField>
            </div>
            <div>
              <TextField
                required
                id="position"
                type="text"
                value={object2}
                onChange={(event) =>
                  handleObject2Change(event.target.value, index)
                }
                variant="standard"
                label="Label for Work: "
              ></TextField>
            </div>
          </div>
        ))}
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
  );
}
