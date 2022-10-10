import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, MenuItem, TextField, Select } from "@mui/material/";
import { Link } from "react-router-dom";

const updateDivision = (division) => {
  return fetch(`/api/divisions/${division.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(division),
  }).then((res) => res.json());
};

const fetchDivisions = (id) => {
  return fetch(`/api/divisions/${id}`).then((res) => res.json());
};

const fetchEmployees = (id) => {
  return fetch(`/api/employees`).then((res) => res.json());
};

export default function DivisionUpdater() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [boss, setBoss] = useState("");
  const [divisionBoss, setDivisionBoss] = useState([]);
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState({});
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDivisions(id)
      .then((division) => {
        setLoading(false);
        setName(division.name);
        setBoss(division.boss);
        setBudget(division.budget);
        setCity(division.location.city);
          setCountry(division.location.country);
          setLocation(division.location)
      })
      .then((error) => {
        console.log(error);
      });
    fetchEmployees().then((employee) => {
      setDivisionBoss(employee);
    });
  }, [id]);

  console.log(divisionBoss);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBossChange = (event) => {
    setBoss(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleCityChange = (event) => {
    let bela = { ...location };
    bela.city = event.target.value;
    setLocation(bela);
    console.log(bela);
    setCity(event.target.value);
  };

  const handleCountryChange = (event) => {
    let bela = { ...location };
    bela.country = event.target.value;
    setLocation(bela);
    setCountry(event.target.value);
  };

  const handleUpdateDivision = (event) => {
    event.preventDefault();
    updateDivision({
      id,
      name,
      boss,
      budget,
      location,
    })
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
      <form onSubmit={handleUpdateDivision} disabled={loading}>
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
          <Select
            value={boss}
            onChange={handleBossChange}
            variant="outlined"
            label="Boss:"
          >
            {divisionBoss.map((element, index) => (
              <MenuItem key={index} value={element._id}>
                {element.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <TextField
            required
            id="position"
            type="text"
            value={budget}
            onChange={handleBudgetChange}
            variant="standard"
            label="Position: "
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
            Update division
          </Button>
          <Button variant="text">
            <Link to="/division">Back</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
