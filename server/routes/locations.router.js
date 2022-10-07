const { Router } = require("express"); //const Router = require("express").Router
const LocationsModel = require("../db/locations.model");

const locationsRouter = new Router();

locationsRouter.use("/:id", async (req, res, next) => {
  let location = null;

  try {
    location = await LocationsModel.findById(req.params.id);
    //const employee = await EmployeeModel.findOne({_id: req.params.id});
  } catch {
    return res.status(400).end("Bad Request");
  }
  if (!employee) {
    return res.status(404).end("Not found");
  }
  req.location = location;
  next();
});

locationsRouter.get("/", async (req, res) => {
  const locations = await LocationsModel.find();
  return res.json(locations);
});


module.exports = locationsRouter;