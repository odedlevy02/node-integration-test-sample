
import{get} from "superagent"
/* istanbul ignore file */
export class GamesServiceApi{

    async getGames(){
        const url = `${process.env.GAMES_URL}/games`
        const {body:games} = await get(url).send()
        return games;
    }
}