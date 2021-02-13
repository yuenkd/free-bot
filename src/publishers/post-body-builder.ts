import { ContentSource, FreeContent, SlackBlock, SlackMessage } from '../interfaces'

const sourceMap = {
    [ContentSource.EpicGames]: 'Epic Games',
}

export function buildSlackMessage(freeContent: FreeContent): SlackMessage {
    const { title, expirationDate, imageUrl, url, source } = freeContent
    const expirationMessage = expirationDate
        ? `<!date^${Math.floor(
              expirationDate.getTime() / 1000
          )}^Expires {date_short_pretty} at {time}|Expires ${expirationDate.toDateString()}>`
        : ''

    const blocks: SlackBlock[] = [
        {
            type: 'image',
            title: {
                type: 'plain_text',
                text: `Free from ${sourceMap[source]} - ${title}`,
            },
            image_url: imageUrl,
            alt_text: title,
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*<${url}|Get ${title}>*`,
            },
        },
    ]
    if (expirationMessage) {
        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `_${expirationMessage}_`,
            },
        })
    }
    return {
        blocks,
    }
}
