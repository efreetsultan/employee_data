const { Router } = require("express"); //const Router = require("express").Router
const EmployeeModel = require("../db/employee.model");

const employeesRouter = new Router();

employeesRouter.patch("/height", async (req, res) => {
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const employees = await EmployeeModel.find();
  employees.map((employee) => {
    employee.height = getRndInteger(140, 190);
    employee.save();
  });
  return res.json(employees);
});

employeesRouter.use("/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
    //const employee = await EmployeeModel.findOne({_id: req.params.id});
  } catch {
    return res.status(400).end("Bad Request");
  }
  if (!employee) {
    return res.status(404).end("Not found");
  }
  req.employee = employee;
  next();
});

employeesRouter.get("/", async (req, res) => {
  const employees = await EmployeeModel.find();
  return res.json(employees);
});

employeesRouter.get("/:id", (req, res) => {
  return res.json(req.employee);
});

employeesRouter.post("/", async (req, res) => {
  const employee = req.body;
  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch {
    return res.status(400).end("Bad request");
  }
});

employeesRouter.patch("/:id", async (req, res) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch {
    return res.status(400).end("Bad Request");
  }
});

employeesRouter.delete("/:id", async (req, res) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch {
    return res.status(400).end("Bad Request");
  }
});

module.exports = employeesRouter;
