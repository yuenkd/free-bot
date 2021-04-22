import 'dotenv/config'
import { publishToSlack } from './publishers/slack/slack'
import { getFreeEpicGames } from './scrapers/epic-games'
import cron from 'node-cron'
import { publishToDiscord } from './publishers/discord'
import { FreeContent } from './interfaces'

async function main() {
    console.log(`Checking Epic Games at ${new Date().toISOString()}`)
    const freeGames = await getFreeEpicGames()
    await Promise.allSettled([publishFreeGamesToSlack(freeGames), publishToDiscord(freeGames)])
}

async function publishFreeGamesToSlack(freeGames: FreeContent[]) {
    try {
        for (const freeGame of freeGames) {
            console.log(freeGame)
            await publishToSlack(freeGame)
        }
    } catch (err) {
        console.error(err)
    }
}

if (process.env.RUN_ONCE) {
    void main()
} else {
    cron.schedule('0 17 * * *', () => {
        void main()
    })
}
