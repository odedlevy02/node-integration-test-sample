import * as sinon from "sinon";
import * as assert from "assert";
import { IGame } from "../dataModels/IGame";
import { PlayersService } from "../routes/players/players.service";
import { PlayerEntity } from "../entities/player.entity";
import { initDbStoreForTests } from "../dal/dbConnectionManager";
import { RoomBuilder } from "../managers/roomBuilder";
import { createPlayers, onGetGamesReturn } from "./roomsTestsHelper";

describe("roomsBuilder tests", () => {
    beforeEach(async ()=>{
        await initDbStoreForTests()
    })
    it("should map 5 player to 2 rooms", async () => {
        const games: IGame[] = [
            { id: 1, name: "game1" },
            { id: 2, name: "game2" }
        ]
        onGetGamesReturn(games)
        const playerService = new PlayersService();
        await createPlayers(5,1)
        await new RoomBuilder().mapPlayersInRooms()
        //get the players and validate that they are mapped to 2 rooms
        const players = await playerService.getAllPlayers(null)
        assert(players[0].roomId==1)
        assert(players[4].roomId==2)
    })

});

