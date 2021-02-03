import { ContentSource, FreeContent, SlackMessage } from '../../interfaces'
import { buildSlackMessage } from '../../publishers/post-body-builder'

describe('#postBodyBuilder', () => {
    describe('when building a slack message post body', () => {
        let expectedSlackMessage: SlackMessage
        let actualSlackMessage: SlackMessage
        beforeAll(() => {
            const expirationDate = new Date()
            const freeContent: FreeContent = {
                source: ContentSource.EpicGames,
                title: 'Free Thing',
                description: 'This cool thing is free',
                expirationDate,
                imageUrl: 'http://cool.image',
                url: 'http://here.it.is',
            }
            expectedSlackMessage = {
                blocks: [
                    {
                        type: 'image',
                        title: {
                            type: 'plain_text',
                            text: `Free from Epic Games - ${freeContent.title}`,
                        },
                        image_url: freeContent.imageUrl,
                        alt_text: freeContent.title,
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*<${freeContent.url}|Get ${freeContent.title}>*`,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `_<!date^${Math.floor(
                                expirationDate.getTime() / 1000
                            )}^Expires {date_short_pretty} at {time}|Expires ${expirationDate.toDateString()}>_`,
                        },
                    },
                ],
            }
            actualSlackMessage = buildSlackMessage(freeContent)
        })
        it('uses the passed in content to form the message', () =>
            expect(actualSlackMessage).toEqual(expectedSlackMessage))
    })
})
