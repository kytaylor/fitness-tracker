const Workout = require('../models/Workout');
const router = require('express').Router();

router.get('/workouts', async (req, res) => {
    res.json(
        await Workout.aggregate([{
            $addFields: { 
              totalDuration: { $sum: "$exercises.duration" } 
            } 
        },
        ])
      );
});

router.post('/workouts', async (req, res) => {
    Workout.create({})
    .then(data => res.json(data))
    .catch(err => {
        console.log("err", err)
        res.json(err)
    })
});

router.get('/workouts/range', async (req, res) => {
    Workout.find({}).limit(7).then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put('/workouts/:id', async (req, res) => {
    Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body } },
        { new: true }
    )
        .then(data => res.json(data))
        .catch(err => {
            console.log("err", err)
            res.json(err)
        })
});

module.exports = router;