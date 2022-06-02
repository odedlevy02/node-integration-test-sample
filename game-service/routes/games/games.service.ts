import { AppDataStore } from "../../dal/dbConnectionManager";
import { GameEntity } from "../../entities/game.entity";

export class GamesService{

    async getAllGame(limit){
        const repo = await AppDataStore.getRepository(GameEntity)
        const game  = await repo.find({take:limit})
        return game 
    }
    async getGameById(id){
        const repo = AppDataStore.getRepository(GameEntity)
        const game = await repo.findOneBy({id})
        return {game}
    }

    async saveGame(game :GameEntity){
        const gameRepo = await AppDataStore.getRepository(GameEntity)
        const gameResult = await gameRepo.save(game )
        return {game :gameResult};
    }

    async deleteGameById(id){
        if(!id){
            throw new Error(`id is mandatory`)
        }
        const repo = await AppDataStore.getRepository(GameEntity);
        const delResult = await repo.delete(id)
        return {numDeleted:delResult.affected}
    }


}