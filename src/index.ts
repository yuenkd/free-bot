import 'dotenv/config'
import { publishToSlack } from './publishers/slack'
import { getFreeEpicGames } from './scrapers/epic-games'
import cron from 'node-cron'

async function main() {
    const freeGames = await getFreeEpicGames()
    for (const freeGame of freeGames) {
        console.log(freeGame)
        await publishToSlack(freeGame)
    }
}

cron.schedule('0 17 * * *', () => {
    void main()
})
