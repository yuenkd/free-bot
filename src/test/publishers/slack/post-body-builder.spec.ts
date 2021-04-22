import { ContentSource, FreeContent, SlackMessage } from '../../../interfaces'
import { buildSlackMessage } from '../../../publishers/slack/post-body-builder'

describe('#postBodyBuilder', () => {
    describe('when building a slack message post body', () => {
        let slackMessage: SlackMessage
        beforeAll(() => {
            const expirationDate = new Date('2021-01-01')
            const freeContent: FreeContent = {
                source: ContentSource.EpicGames,
                title: 'Free Thing',
                description: 'This cool thing is free',
                expirationDate,
                imageUrl: 'http://cool.image',
                url: 'http://here.it.is',
            }
            slackMessage = buildSlackMessage(freeContent)
        })
        it('uses the passed in content to form the message', () =>
            expect(slackMessage).toMatchInlineSnapshot(`
                Object {
                  "blocks": Array [
                    Object {
                      "alt_text": "Free Thing",
                      "image_url": "http://cool.image",
                      "title": Object {
                        "text": "Free from Epic Games - Free Thing",
                        "type": "plain_text",
                      },
                      "type": "image",
                    },
                    Object {
                      "text": Object {
                        "text": "*<http://here.it.is|Get Free Thing>*",
                        "type": "mrkdwn",
                      },
                      "type": "section",
                    },
                    Object {
                      "text": Object {
                        "text": "_<!date^1609459200^Expires {date_short_pretty} at {time}|Expires Thu Dec 31 2020>_",
                        "type": "mrkdwn",
                      },
                      "type": "section",
                    },
                  ],
                }
            `))
    })
    describe('when building a slack message post body from content without expiration', () => {
        let slackMessage: SlackMessage
        beforeAll(() => {
            const freeContent: FreeContent = {
                source: ContentSource.EpicGames,
                title: 'Free Thing',
                description: 'This cool thing is free',
                imageUrl: 'http://cool.image',
                url: 'http://here.it.is',
            }
            slackMessage = buildSlackMessage(freeContent)
        })
        it('uses the passed in content to form the message', () =>
            expect(slackMessage).toMatchInlineSnapshot(`
                Object {
                  "blocks": Array [
                    Object {
                      "alt_text": "Free Thing",
                      "image_url": "http://cool.image",
                      "title": Object {
                        "text": "Free from Epic Games - Free Thing",
                        "type": "plain_text",
                      },
                      "type": "image",
                    },
                    Object {
                      "text": Object {
                        "text": "*<http://here.it.is|Get Free Thing>*",
                        "type": "mrkdwn",
                      },
                      "type": "section",
                    },
                  ],
                }
            `))
    })
})
