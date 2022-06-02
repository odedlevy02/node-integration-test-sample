import { RoomEntity } from "../entities/room.entity";
import { PlayersService } from "../routes/players/players.service";
import { RoomsService } from "../routes/rooms/rooms.service";
import { GamesServiceApi } from "./gamesServiceApi";

/**
 * This manager will try to to build rooms for players in a game
 * Each room is limited to 4 players.
 *  
 */
export class RoomBuilder{
    PLAYERS_PER_ROOM = 4
    async mapPlayersInRooms(){
        //get games
        const games = await new GamesServiceApi().getGames()
        const playerService = new PlayersService();
        for(let game of games){
            //get players in game
            const playersInGame  = await playerService.getPlayersByGameId(game.id)
            const notMappedPlayers = playersInGame.filter(playersInGame=>playersInGame.roomId==null)
            //creat a new room
            const roomService = new RoomsService();
            let newRoomResult = await roomService.saveRoom({gameId:game.id} as RoomEntity)
            let numPlayersInRoom = 0;
            for(const player of notMappedPlayers){
                //validate if reached the limit of 4
                if(numPlayersInRoom>=4){
                    newRoomResult = await roomService.saveRoom({gameId:game.id} as RoomEntity)
                    numPlayersInRoom = 0;
                }
                player.roomId = newRoomResult.room.id;
                await playerService.savePlayer(player)
                numPlayersInRoom++;
            }
        }
    }
    
}
