import {Router} from "express";
import * as express from "express";
import {PlayersService} from "./players.service" 
import { serviceErrorReduce } from "../../helpers/serviceErrorReducer";

class PlayersRouter{

  router: Router;

  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  private createRoutes() {
    this.router.get("/", this.getAllPlayers);
    this.router.get("/game/:id", this.getPlayersByGameId);
    this.router.get("/:id", this.getPlayerById);
    
    this.router.post("/", this.savePlayer);
    this.router.delete("/:id", this.deletePlayerById);
  }

  getAllPlayers=async (req,res)=>{
    try {
      const {limit} = req.query
      let result = await new PlayersService().getAllPlayers(limit)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in getAllPlayers: ", error)
      res.status(500).send({ message: error })
    }
  }

  getPlayersByGameId=async (req,res)=>{
    try {
      const {id} = req.params
      let result = await new PlayersService().getPlayersByGameId(id)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in getPlayersByGameId: ", error)
      res.status(500).send({ message: error })
    }
  }

  getPlayerById=async (req,res)=>{
    try {
      const {id} = req.params
      let result = await new PlayersService().getPlayerById(id)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in getPlayerById: ", error)
      res.status(500).send({ message: error })
    }
  }

  savePlayer=async (req,res)=>{
    try {
      const player = req.body
      let result = await new PlayersService().savePlayer(player)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in createPlayer: ", error)
      res.status(500).send({ message: error })
    }
  }


  deletePlayerById=async (req,res)=>{
    try {
      const player = req.params
      let result = await new PlayersService().deletePlayerById(player)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in deletePlayerById: ", error)
      res.status(500).send({ message: error })
    }
  }

}

export const playersRouter= new PlayersRouter().router;
//Note - validate that -  this.app.use("/players",playersRouter); - was added to server.ts in method setRoutes
