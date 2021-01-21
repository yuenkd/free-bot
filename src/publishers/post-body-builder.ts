import { ContentSource, FreeContent, SlackMessage } from '../interfaces'

const sourceMap = {
    [ContentSource.EpicGames]: 'Epic Games',
}

export function buildSlackMessage(freeContent: FreeContent): SlackMessage {
    const { title, expirationDate, imageUrl, url, source } = freeContent
    return {
        blocks: [
            {
                type: 'section',
                fields: [
                    {
                        type: 'plain_text',
                        text: `Free from ${sourceMap[source]}`,
                        emoji: true,
                    },
                ],
            },
            {
                type: 'image',
                title: {
                    type: 'plain_text',
                    text: expirationDate ? `Available until ${expirationDate.toDateString()} at 9AM` : '',
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
