import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Stack, Select, MenuItem } from "@mui/material/";
import { Link } from "react-router-dom";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const createDivision = (division) => {
  return fetch("/api/division", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(division),
  }).then((res) => res.json());
};

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

export default function DivisionCreator() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [employeesName, setEmployeesName] = useState("");
  const [name, setName] = useState("");
  const [boss, setBoss] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setData(employees);
          setEmployeesName(employees.name);
          setBoss(employees)
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
    console.log(data);
    console.log(boss);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

    const handleBossChange = (event) => {
        let bela = [...data]
        bela[0]._id=event.target.value
      setBoss(bela);
      console.log(boss)
  };

    const handleClick = (event) => {
        setEmployeesName(event.target.value)
        console.log(employeesName)
    }

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  //   const handleCityChange = (event) => {
  //     setStartingDate(event.target.value);
  //   };

  //   const handleCountryChange = (event) => {
  //     setFavoriteColor(event.target.value);
  //     console.log(favoriteColor);
  //   };

  const handleCreateDivision = (event) => {
    event.preventDefault();
    setLoading(true);
    createDivision({ name, boss, budget /* location, location*/ })
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
      <form onSubmit={handleCreateDivision}>
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
        <Select
          value={boss}
          onChange={handleBossChange}
          variant="outlined"
          label="Boss:"
        >
          {data.map((employee) => (
              <MenuItem key={employee._id}>{employee.name}</MenuItem>
          ))}
        </Select>
        <div>
          <TextField
            required
            id="position"
            type="number"
            value={budget}
            onChange={handleBudgetChange}
            variant="outlined"
            label="Budget:"
          ></TextField>
        </div>
        {/* <div>
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
        </div> */}
        <div>
          <Button variant="contained" type="Submit" disabled={loading}>
            Create Division
          </Button>
          <Button variant="contained">
            <Link to="/division">Back</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
