import { IGame } from "../dataModels/IGame";
import { PlayerEntity } from "../entities/player.entity";
import { GamesServiceApi } from "../managers/gamesServiceApi";
import { PlayersService } from "../routes/players/players.service";


export async function onGetGamesReturn(games:IGame[]){
    GamesServiceApi.prototype.getGames=async ()=>{
        return games;
    }
}

export async function createPlayers(numPlayers, gameId) {
    const playerService = new PlayersService();
    const arr = Array.from(Array(numPlayers).keys())
    for (let id of arr) {
        await playerService.savePlayer({ name: `p${id}`, gameId: 1 } as PlayerEntity)
    }

}

