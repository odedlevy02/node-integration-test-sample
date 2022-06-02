import {Router} from "express";
import * as express from "express";
import {GamesService} from "./games.service" 
import { serviceErrorReduce } from "../../helpers/serviceErrorReducer";

class GamesRouter{

  router: Router;

  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  private createRoutes() {
    this.router.get("/", this.getAllGame);
    this.router.get("/:id", this.getGameById);
    this.router.post("/", this.saveGame);
    this.router.delete("/:id", this.deleteGameById);
  }

  getAllGame=async (req,res)=>{
    try {
      const {limit} = req.query
      let result = await new GamesService().getAllGame(limit)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in getAllGame: ", error)
      res.status(500).send({ message: error })
    }
  }

  getGameById=async (req,res)=>{
    try {
      const {id} = req.params
      let result = await new GamesService().getGameById(id)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in getGameById: ", error)
      res.status(500).send({ message: error })
    }
  }

  saveGame=async (req,res)=>{
    try {
      const game = req.body
      let result = await new GamesService().saveGame(game)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in createGame: ", error)
      res.status(500).send({ message: error })
    }
  }


  deleteGameById=async (req,res)=>{
    try {
      const game = req.params
      let result = await new GamesService().deleteGameById(game)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in deleteGameById: ", error)
      res.status(500).send({ message: error })
    }
  }

}

export const gamesRouter= new GamesRouter().router;
//Note - add to server.ts method setRoutes:  this.app.use("/games",gamesRouter);
