import * as sinon from "sinon";
import * as assert from "assert";
import { IGame } from "../dataModels/IGame";
import { PlayersService } from "../routes/players/players.service";
import { PlayerEntity } from "../entities/player.entity";
import { initDbStoreForTests } from "../dal/dbConnectionManager";
import { RoomBuilder } from "../managers/roomBuilder";
import { createPlayers, onGetGamesReturn } from "./roomsTestsHelper";
import { RoomsService } from "../routes/rooms/rooms.service";

describe("roomsBuilder tests", () => {
    beforeEach(async ()=>{
        await initDbStoreForTests()
    })
    it("should map 6 player to 2 rooms", async () => {
        const games: IGame[] = [
            { id: 1, name: "game1" },
            { id: 2, name: "game2" }
        ]
        onGetGamesReturn(games)
        const playerService = new PlayersService();
        await createPlayers(6,1)
        await new RoomBuilder().mapPlayersInRooms()
        //get the players and validate that they are mapped to 2 rooms
        const players = await playerService.getAllPlayers(null)
        const playersInRoom1 = players.filter(player=>player.roomId==1)
        const playersInRoom2 = players.filter(player=>player.roomId==2)
        assert(playersInRoom1.length==4)
        assert(playersInRoom2.length==2)

    })

});

