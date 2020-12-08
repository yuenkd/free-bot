import { ContentSource, FreeContent, SlackMessage } from '../../interfaces'
import { buildSlackMessage } from '../../publishers/post-body-builder'

describe('#postBodyBuilder', () => {
    describe('when building a slack message post body', () => {
        let expectedSlackMessage: SlackMessage
        let actualSlackMessage: SlackMessage
        beforeAll(() => {
            const freeContent: FreeContent = {
                source: ContentSource.EpicGames,
                title: 'Free Thing',
                description: 'This cool thing is free',
                expirationDate: new Date(),
                imageUrl: 'http://cool.image',
                url: 'http://here.it.is',
            }
            expectedSlackMessage = {
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
                            text: `Available until ${freeContent.expirationDate.toDateString()} at 9AM`,
                            emoji: true,
                        },
                        image_url: freeContent.imageUrl,
                        alt_text: freeContent.title,
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `<${freeContent.url}|Get ${freeContent.title}>`,
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
