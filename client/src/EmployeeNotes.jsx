import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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

export default function EmployeeNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee(id)
      .then((employee) => {
        setName(employee.name);
        setNotes(employee.notes);
        console.log(employee);
        console.log(employee.notes);
        setLoading(false);
      })
      .then((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSomeShitChange = (event) => {
    let bela = { ...notes };
    bela.someShit = event.target.value;
    setNotes(bela);
  };

  const handleMoreShitChange = (event) => {
    let bela = { ...notes };
    bela.moreShit = event.target.value;
    setNotes(bela);
  };

  const handleUpdateEmployee = (event) => {
    event.preventDefault();
    updateEmployee({ id, notes })
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
          <div>
            <h1>{name}</h1>
          </div>
          <form onSubmit={handleUpdateEmployee} disabled={loading}>
            <div>
              <TextField
                required
                id="someShit"
                type="text"
                value={notes.someShit}
                onChange={handleSomeShitChange}
                variant="standard"
                label="SomeShit: "
              ></TextField>
            </div>
            <div>
              <TextField
                required
                id="moreShit"
                type="text"
                value={notes.moreShit}
                onChange={handleMoreShitChange}
                variant="standard"
                label="MoreShit: "
              ></TextField>
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
      )}
    </>
  );
}
