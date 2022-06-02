import { AppDataStore } from "../../dal/dbConnectionManager";
import { RoomEntity } from "../../entities/room.entity";
import { RoomBuilder } from "../../managers/roomBuilder";

export class RoomsService{

    async getAllRooms(limit){
        const repo = await AppDataStore.getRepository(RoomEntity)
        const rooms  = await repo.find({take:limit})
        return rooms 
    }
    async getRoomById(id){
        const repo = AppDataStore.getRepository(RoomEntity)
        const room = await repo.findOneBy({id})
        return {room}
    }

    async saveRoom(room :RoomEntity){
        const roomRepo = await AppDataStore.getRepository(RoomEntity)
        const roomResult = await roomRepo.save(room )
        return {room :roomResult};
    }

    async getLastRoom() {
        const matchRepo = AppDataStore.getRepository(RoomEntity);
        const room = await matchRepo.findOne({ where: {}, order: { id: "DESC" } })
        return { room }
    }

    async deleteRoomById(id){
        if(!id){
            throw new Error(`id is mandatory`)
        }
        const repo = await AppDataStore.getRepository(RoomEntity);
        const delResult = await repo.delete(id)
        return {numDeleted:delResult.affected}
    }

    async mapPlayers(){
        await new RoomBuilder().mapPlayersInRooms()
        return {succeeded:true}
    }


}