import axios from 'axios'
import { ContentSource, DiscordMessage, FreeContent } from '../../interfaces'

export async function publishToDiscord(freeContent: FreeContent[]): Promise<void> {
    if (process.env.DISCORD_HOOK) {
        const freeContentChunks = chunkArray(freeContent, 10)
        for (const chunk of freeContentChunks) {
            await axios.post(process.env.DISCORD_HOOK, buildDiscordMessages(chunk))
        }
    }
}

function chunkArray(array: FreeContent[], size: number) {
    const result = []
    const arrayCopy = [...array]
    while (arrayCopy.length > 0) {
        result.push(arrayCopy.splice(0, size))
    }
    return result
}

const avatarMap = {
    [ContentSource.EpicGames]:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/647px-Epic_Games_logo.svg.png',
}

const userMap = {
    [ContentSource.EpicGames]: 'Free from Epic Games',
}

function buildDiscordMessages(freeContent: FreeContent[]): DiscordMessage {
    const discordMessage: DiscordMessage = {
        embeds: freeContent.map((free) => ({
            title: free.title,
            description: free.expirationDate ? `Expires ${free.expirationDate.toDateString()}` : '',
            url: free.url,
            image: {
                url: free.imageUrl,
            },
        })),
    }
    if (new Set(freeContent.map((fc) => fc.source)).size === 1) {
        discordMessage.username = userMap[freeContent[0].source]
        discordMessage.avatar_url = avatarMap[freeContent[0].source]
    }
    return discordMessage
}
