import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Button,
  MenuItem,
  TextField,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material/";


const createEmployee = (employee) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchDivisions = () => {
  return fetch(`/api/divisions`).then((res) => res.json());
};

export default function EmployeeCreator() {
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
  const [loading, setLoading] = useState(false);

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
    fetchDivisions()
      .then((division) => {
        setLoading(false);
        setDivisionData(division);
      })
      .then((error) => {
        console.log(error);
      });
}, []);

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
    console.log(favoriteColor)
  };

  const handleCurrentSalaryChange = (event) => {
    setCurrentSalary(event.target.value);
  };

  const handleDesiredSalaryChange = (event) => {
    setDesiredSalary(event.target.value);
  };

  const handleDivisionChange = (event) => {
    const {
      target: { value },
    } = event;
    setDivision(typeof value === "string" ? value.split(",") : value);
  };


  const handleCreateEmployee = (event) => {
    event.preventDefault();
    setLoading(true);
    createEmployee({ name, level, position, startingDate, favoriteColor, currentSalary, desiredSalary, divisions: division })
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
        <div id="calendar-div">
        <label for="calendar">Select Date:</label>
        <input type="date" value={startingDate} onChange={handleStartingDateChange}/>
        </div>
        <div>
          <label for="color">Select Color:</label>
          <input type="color" value={favoriteColor} onChange={handleFavoriteColorChange}></input>
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
            Create Employee
          </Button>
          <Button variant="contained">
            <Link to="/">Back</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
