import { Router } from "express";
import { getGames, insertGame } from "../controllers/gamesController.js";
import { validateNewGameMiddleware } from "../middlewares/validateNewGame.js";
import newGameSchema from "../schemas/gameSchema.js";
const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', validateNewGameMiddleware(newGameSchema), insertGame);

export default gamesRouter;