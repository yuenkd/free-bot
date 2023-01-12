import 'dotenv/config'
import { publishToSlack } from './publishers/slack/slack'
import { getFreeEpicGames } from './scrapers/epic-games'
import cron from 'node-cron'
import { publishToDiscord } from './publishers/discord'
import { FreeContent } from './interfaces'

async function main() {
    console.log(`Checking Epic Games at ${new Date().toISOString()}`)
    const freeGames = await getFreeEpicGames()
    await Promise.allSettled([publishFreeGamesToSlack(freeGames), publishToDiscord(freeGames), console.log(freeGames)])
}

async function publishFreeGamesToSlack(freeGames: FreeContent[]) {
    try {
        for (const freeGame of freeGames) {
            await publishToSlack(freeGame)
        }
    } catch (err) {
        console.error(err)
    }
}

if (process.env.RUN_ONCE) {
    void main()
} else {
    const schedule = process.env.CRON_SCHEDULE || '0 17 * * *'
    cron.schedule(schedule, () => {
        void main()
    })
}
