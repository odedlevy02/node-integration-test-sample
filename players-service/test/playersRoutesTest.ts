import * as assert from "assert";
import * as request from "supertest"
import { initDbStoreForTests } from "../dal/dbConnectionManager";
import { PlayerEntity } from "../entities/player.entity";
import { PlayersService } from "../routes/players/players.service";
import { Server } from "../server";
import { createPlayers } from "./roomsTestsHelper";

describe("players routes tests", () => {
    beforeEach(async () => {
        await initDbStoreForTests()
    })
    it("should get all players", async () => {
        const server = new Server()
        server.setRoutes();
        const gameId = 1
        await createPlayers(3, gameId)
        const app = server.getApp()
        const url = "/players"
        const { body: players } = await request.agent(app).get(url).send()
        assert(players.length == 3)
    })
    it("should create a player", async () => {
        const server = new Server()
        server.setRoutes();
        const gameId = 1
        const app = server.getApp()
        const url = "/players"
        await request.agent(app).post(url).send({ name: "p1",gameId })
        const playerService = new PlayersService();
        const playersRes = await playerService.getAllPlayers(null);
        assert(playersRes.length == 1)
    })
    it("should get player by game id", async () => {
        const server = new Server()
        server.setRoutes();
        const playerService = new PlayersService();
        //create 2 players mapped to different games
        await playerService.savePlayer({gameId:1,name:"p1"} as PlayerEntity)
        await playerService.savePlayer({gameId:2,name:"p2"} as PlayerEntity)
        const app = server.getApp()
        const url = `/players/game/1`
        const {body:players} = await request.agent(app).get(url).send()
        assert(players.length == 1)
    })
    it("should delete player by id",async ()=>{
        const server = new Server()
        server.setRoutes();
        const playerService = new PlayersService();
        //create player
        const playerRes = await playerService.savePlayer({gameId:1,name:"p1"} as PlayerEntity)
        const url = `/players/${playerRes.player.id}`
        const app = server.getApp()
        await request.agent(app).delete(url).send()
        const playersRes = await playerService.getAllPlayers(null);
        assert(playersRes.length == 0)
    })
})