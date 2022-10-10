import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Stack, Select, MenuItem } from "@mui/material/";
import { Link } from "react-router-dom";

const createDivision = (division) => {
  return fetch("/api/divisions", {
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
  const [location, setLocation] = useState({});
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setData(employees);
        setEmployeesName(employees.name);
          setBoss(employees);
          setLocation(employees.location)
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
    setBoss(event.target.value);
    console.log(boss);
  };

  const handleClick = (event) => {
    setEmployeesName(event.target.value);
    console.log(employeesName);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleCityChange = (event) => {
      let bela = {...location};
    bela.city = event.target.value;
      setLocation(bela);
      console.log(bela)
    setCity(event.target.value);
  };

  const handleCountryChange = (event) => {
    let bela = { ...location };
    bela.country = event.target.value;
    setLocation(bela);
    setCountry(event.target.value);
  };

  const handleCreateDivision = (event) => {
    event.preventDefault();
    setLoading(true);
    createDivision({ name, boss, budget, location })
      .then(() => {
        navigate("/division");
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
          {data.map((employee, index) => (
            <MenuItem key={index} value={employee._id}>
              {employee.name}
            </MenuItem>
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
        <div>
          <TextField
            required
            id="city"
            type="text"
            value={city}
            onChange={handleCityChange}
            variant="outlined"
            label="City:"
          ></TextField>
        </div>
        <div>
          <TextField
            required
            id="country"
            type="text"
            value={country}
            onChange={handleCountryChange}
            variant="outlined"
            label="Country:"
          ></TextField>
        </div>
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
