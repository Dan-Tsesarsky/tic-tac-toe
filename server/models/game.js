const mongoose = require("mongoose");
const Joi = require("joi");
const gameSchema = new mongoose.Schema({
  board: {
    type: [],
    // [{id: "213232", name:"moshe"},{}]
  },
});
function validateGame(_workout) {
  const schema = Joi.object({
    board: Joi.array().min(9).max(9),
  });
  return schema.validate(_workout);
}
const Game = mongoose.model("Game", gameSchema);
module.exports = { validateGame, Game };
