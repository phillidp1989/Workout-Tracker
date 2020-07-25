const db = require("../models");

module.exports = (app) => {
  app.get("/api/workouts", async (req, res) => {
    try {
      const results = await db.Workout.find({});      
      res.json(results);
    } catch (err) {
      console.error("ERROR - api-routes.js - /api/workouts get: ", err);
      res.status(404).end();
    }
  });

  app.put("/api/workouts/:id", async (req, res) => {
    try {
      const result = await db.Workout.findByIdAndUpdate(req.params.id, {
        $push: { exercises: req.body },
      });
      res.json(result);
    } catch (err) {
      console.error("ERROR - api-routes.js - /api/workouts/:id put: ", err);
      res.status(404).end();
    }
  });

  app.post("/api/workouts", async (req, res) => {
    try {
      console.log(req.body);
      const result = await db.Workout.create(req.body);
      res.json(result);
    } catch (err) {
      console.error("ERROR - api-routes.js - /api/workouts post: ", err);
      res.status(404).end();
    }
  });

  app.get("/api/workouts/range", async (req, res) => {
    try {
      console.log("get request pending");
      const results = await db.Workout.find({});
      console.log(results);
      res.json(results);
    } catch (err) {
      console.error("ERROR - api-routes.js - /api/workouts/range get: ", err);
      res.status(404).end();
    }
  });  
};
