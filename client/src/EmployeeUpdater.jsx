import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  MenuItem,
  TextField,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material/";
import { Link } from "react-router-dom";
import Loading from "./Loading";

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

const fetchDivisions = (id) => {
  return fetch(`/api/divisions`).then((res) => res.json());
};

export default function EmployeeUpdater() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [position, setPosition] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [division, setDivision] = useState([]);
  const [divisionData, setDivisionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    fetchEmployee(id)
      .then((employee) => {
        setName(employee.name);
        setLevel(employee.level);
        setPosition(employee.position);
        setStartingDate(employee.startingDate.slice(0, 10));
        setFavoriteColor(employee.favoriteColor);
        setCurrentSalary(employee.currentSalary);
        setDesiredSalary(employee.desiredSalary);
      })
      .then((error) => {
        console.log(error);
      });
    fetchDivisions().then((div) => {
      setDivisionData(div);
      setLoading(false);
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

  const handleStartingDateChange = (event) => {
    setStartingDate(event.target.value);
  };

  const handleFavoriteColorChange = (event) => {
    setFavoriteColor(event.target.value);
    console.log(favoriteColor);
  };

  const handleCurrentSalaryChange = (event) => {
    setCurrentSalary(event.target.value);
  };

  const handleDesiredSalaryChange = (event) => {
    setDesiredSalary(event.target.value);
  };

  const handleDivisionChange = (event) => {
    // setDivision(event.target.value);
    const {
      target: { value },
    } = event;
    setDivision(typeof value === "string" ? value.split(",") : value);
    console.log(division)
  };

  const handleUpdateEmployee = (event) => {
    event.preventDefault();
    updateEmployee({
      id,
      name,
      level,
      position,
      startingDate,
      favoriteColor,
      currentSalary,
      desiredSalary,
      divisions: division,
    })
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

  if (loading) {
    return <Loading />;
  }

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
        <div id="calendar-div">
          <label for="calendar">Select Date:</label>
          <input
            type="date"
            value={startingDate}
            onChange={handleStartingDateChange}
          />
        </div>
        <div>
          <label for="color">Select Color:</label>
          <input
            type="color"
            value={favoriteColor}
            onChange={handleFavoriteColorChange}
          ></input>
        </div>
        <div>
          <TextField
            required
            id="current-salary"
            type="number"
            value={currentSalary}
            onChange={handleCurrentSalaryChange}
            variant="outlined"
            label="Current Salary:"
          ></TextField>
        </div>
        <div>
          <TextField
            required
            id="desired-salary"
            type="number"
            value={desiredSalary}
            onChange={handleDesiredSalaryChange}
            variant="outlined"
            label="Desired Salary:"
          ></TextField>
        </div>
        <div>
          <Select
            value={division}
            label="Select Division"
            onChange={handleDivisionChange}
            multiple
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {divisionData.map((element, index) => (
              <MenuItem key={index} value={element._id}>
                <Checkbox checked={division.indexOf(element.name) > -1} />
                <ListItemText primary={element.name} />
              </MenuItem>
            ))}
          </Select>
        </div>
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
