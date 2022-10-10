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

export default function DivisionUpdater() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [boss, setBoss] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDivisions(id)
      .then((division) => {
        setLoading(false);
        setName(division.name);
        setBoss(division.boss);
        setBudget(division.budget);
      })
      .then((error) => {
        console.log(error);
      });
  }, [id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBossChange = (event) => {
    setBoss(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };


  const handleUpdateDivision = (event) => {
    event.preventDefault();
    updateDivision({
      id,
      name,
      boss,
      budget,
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
          <TextField
            required
            id="level"
            type="text"
            value={boss}
            onChange={handleBossChange}
            variant="standard"
            label="Boss: "
          ></TextField>
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
