import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, MenuItem, TextField, Select } from "@mui/material/";
import { Link } from "react-router-dom";
import Loading from "./Loading"

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
  const [divisionData, setDivisionData]= useState([])
  const [loading, setLoading] = useState(true);

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
      fetchDivisions()
      .then((division) => {
        setDivisionData(division)
        setDivision(division[0]);
        setLoading(false);
        
      })
    }, [id]);
    console.log(divisionData)
    console.log(division)

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
    //   const newArray = [...divisionData];
    //   newArray[0]._id = event.target.value;
    // setDivision(newArray);
    // console.log(newArray)
    setDivision(event.target.value)
    console.log(division)
    }

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
      divisions: [division]
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
          <Select value={division._id } label="Select Division" onChange={handleDivisionChange}>
            {divisionData.map((element, index) => (
              <MenuItem key={index } value={element._id}>{element.name}</MenuItem>
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
