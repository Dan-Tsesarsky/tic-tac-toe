const express = require("express");
const { validateGame, Game } = require("../models/game");
const router = express.Router();
router.post("/", async (req, res) => {
  console.log("hello");
  const { error } = validateGame(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);
  //   workout = Workout.findOne({_id: req.user.workout, user: req.user.id });

  const board = req.body.board;
  const game = new Game({ board });
  await game.save();

  return res.json(game);
});

router.put("/edit/:id", async (req, res) => {
  const { error } = validateGame(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const game = await Game.findOne({
    _id: req.params.id,
  });

  if (!game) res.status(404).send("Invalid workout Id");

  const { board } = req.body;
  let GameProfile = {
    board,
  };
  const updatedGame = await Game.findOneAndUpdate(
    { _id: req.params.id },
    { $set: GameProfile },
    { new: true }
  );
  return res.json(updatedGame);
});
module.exports = router;
