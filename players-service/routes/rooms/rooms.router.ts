import {Router} from "express";
import * as express from "express";
import {RoomsService} from "./rooms.service" 
import { serviceErrorReduce } from "../../helpers/serviceErrorReducer";

class RoomsRouter{

  router: Router;

  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  private createRoutes() {
    this.router.get("/", this.getAllRooms);
    this.router.get("/:id", this.getRoomById);
    this.router.post("/", this.saveRoom);
    this.router.delete("/:id", this.deleteRoomById);
    this.router.post("/map-players",this.mapPlayers)
  }

  getAllRooms=async (req,res)=>{
    try {
      const {limit} = req.query
      let result = await new RoomsService().getAllRooms(limit)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in getAllRooms: ", error)
      res.status(500).send({ message: error })
    }
  }

  getRoomById=async (req,res)=>{
    try {
      const {id} = req.params
      let result = await new RoomsService().getRoomById(id)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in getRoomById: ", error)
      res.status(500).send({ message: error })
    }
  }

  saveRoom=async (req,res)=>{
    try {
      const room = req.body
      let result = await new RoomsService().saveRoom(room)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in createRoom: ", error)
      res.status(500).send({ message: error })
    }
  }


  deleteRoomById=async (req,res)=>{
    try {
      const room = req.params
      let result = await new RoomsService().deleteRoomById(room)
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in deleteRoomById: ", error)
      res.status(500).send({ message: error })
    }
  }

  mapPlayers=async (req,res)=>{
    try {
      let result = await new RoomsService().mapPlayers()
      res.status(200).send(result)
    } catch (err) {
      let error = serviceErrorReduce(err);
      console.error("Error in mapPlayers: ", error)
      res.status(500).send({ message: error })
    }
  }

}

export const roomsRouter= new RoomsRouter().router;
//Note - validate that -  this.app.use("/rooms",roomsRouter); - was added to server.ts in method setRoutes
