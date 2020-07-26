const db = require("../models");

module.exports = (app) => {

  // Get request to retrieve all workouts in DB
  app.get("/api/workouts", async (req, res) => {
    try {
      const results = await db.Workout.find({});      
      res.json(results);
    } catch (err) {
      console.error("ERROR - api-routes.js - /api/workouts get: ", err);
      res.status(404).end();
    }
  });

  // Put request to update exercise information in specific workout identified using req.params.id
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

  // Post request to create new workout in DB
  app.post("/api/workouts", async (req, res) => {
    try {      
      const result = await db.Workout.create(req.body);      
      res.json(result);
    } catch (err) {
      console.error("ERROR - api-routes.js - /api/workouts post: ", err);
      res.status(404).end();
    }
  });

  // Get request to retrieve last 7 workouts from the DB
  app.get("/api/workouts/range", async (req, res) => {
    try {      
      const results = await db.Workout.find({}, {}, { sort: { _id : 1 } }).limit(7);      
      res.json(results);
    } catch (err) {
      console.error("ERROR - api-routes.js - /api/workouts/range get: ", err);
      res.status(404).end();
    }
  });  
};
