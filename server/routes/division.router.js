const { Router } = require("express"); //const Router = require("express").Router
const DivisionModel = require("../db/division.model");

const divisionsRouter = new Router();

divisionsRouter.use("/:id", async (req, res, next) => {
    let division = null;
  
    try {
      divsion = await DivisionsModel.findById(req.params.id);
    } catch {
      return res.status(400).end("Bad Request");
    }
    if (!division) {
      return res.status(404).end("Not found");
    }
    req.division = division;
    next();
  });

divisionsRouter.get("/", async (req, res) => {
  const divisions = await DivisionModel.find().populate("boss");
  return res.json(divisions);
});

divisionsRouter.get("/:id", (req, res) => {
    return res.json(req.division);
  });
  
  divisionsRouter.post("/", async (req, res) => {
    const division = req.body;
    try {
      const saved = await DivisionModel.create(division);
      return res.json(saved);
    } catch {
      return res.status(400).end("Bad request");
    }
  });
  
  divisionsRouter.patch("/:id", async (req, res) => {
    const division = req.body;
  
    try {
      const updated = await req.division.set(division).save();
      return res.json(updated);
    } catch {
      return res.status(400).end("Bad Request");
    }
  });
  
  divisionsRouter.delete("/:id", async (req, res) => {
    try {
      const deleted = await req.division.delete()
      return res.json(deleted);
    } catch {
      return res.status(400).end("Bad Request");
    }
  });

module.exports = divisionsRouter;
