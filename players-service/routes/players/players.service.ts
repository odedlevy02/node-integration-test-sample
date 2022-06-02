import { AppDataStore } from "../../dal/dbConnectionManager";
import { PlayerEntity } from "../../entities/player.entity";

export class PlayersService{

    async getAllPlayers(limit){
        const repo = await AppDataStore.getRepository(PlayerEntity)
        const players  = await repo.find({take:limit})
        return players 
    }

    async getPlayersByGameId(id){
        const repo = await AppDataStore.getRepository(PlayerEntity)
        const players  = await repo.find({where:{gameId:id}})
        return players 
    }
    async getPlayerById(id){
        const repo = AppDataStore.getRepository(PlayerEntity)
        const player = await repo.findOneBy({id})
        return {player}
    }

    async savePlayer(player :PlayerEntity){
        const playerRepo = await AppDataStore.getRepository(PlayerEntity)
        const playerResult = await playerRepo.save(player )
        return {player :playerResult};
    }

    async deletePlayerById(id){
        if(!id){
            throw new Error(`id is mandatory`)
        }
        const repo = await AppDataStore.getRepository(PlayerEntity);
        const delResult = await repo.delete(id)
        return {numDeleted:delResult.affected}
    }


}