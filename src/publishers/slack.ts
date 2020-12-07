import axios from 'axios'
import { FreeContent, SlackMessage } from '../interfaces'

export async function publishToSlack(freeContent: FreeContent): Promise<void> {
    if (process.env.SLACK_HOOK) {
        await axios.post(process.env.SLACK_HOOK, buildSlackMessage(freeContent))
    }
}

export function buildSlackMessage(freeContent: FreeContent): SlackMessage {
    const { title, expirationDate, imageUrl, url } = freeContent
    return {
        blocks: [
            {
                type: 'section',
                fields: [
                    {
                        type: 'plain_text',
                        text: 'Free from Epic Games',
                        emoji: true,
                    },
                ],
            },
            {
                type: 'image',
                title: {
                    type: 'plain_text',
                    text: `Available until ${expirationDate.toDateString()} at 9AM`,
                    emoji: true,
                },
                image_url: imageUrl,
                alt_text: title,
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `<${url}|Get ${title}>`,
                },
            },
        ],
    }
}
