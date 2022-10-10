
const { Router } = require("express"); //const Router = require("express").Router
const DivisionModel = require("../db/division.model");

const divisionsRouter = new Router();





divisionsRouter.get("/", async (req, res) => {
    const divisions = await DivisionModel.find();
    return res.json(employees);
});
  




module.exports = employeesRouter;