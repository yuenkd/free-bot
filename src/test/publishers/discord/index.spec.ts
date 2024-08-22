/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'axios'
import { ContentSource, FreeContent } from '../../../interfaces'
import { publishToDiscord } from '../../../publishers/discord'

jest.mock('axios')

describe('#discord publisher', () => {
    describe('when publishing to discord', () => {
        afterEach(() => {
            jest.clearAllMocks()
        })
        const expirationDate = new Date()
        const freeContent: FreeContent[] = [
            {
                title: 'Test Title',
                description: 'Test Description',
                imageUrl: 'https://cool.image',
                url: 'https://cool.link',
                expirationDate,
                source: ContentSource.EpicGames,
            },
        ]

        describe('with a discord webhook', () => {
            const builtContent = {
                username: 'Free from Epic Games',
                avatar_url:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/647px-Epic_Games_logo.svg.png',
                embeds: [
                    {
                        title: freeContent[0].title,
                        description: `Expires ${expirationDate.toDateString()}`,
                        url: freeContent[0].url,
                        image: {
                            url: freeContent[0].imageUrl,
                        },
                    },
                ],
            } //some discord message
            beforeAll(async () => {
                process.env.DISCORD_HOOK = 'https://my.discord.hook'
                await publishToDiscord(freeContent)
            })
            it('sends a message to discord', () =>
                expect(axios.post).toHaveBeenCalledWith(process.env.DISCORD_HOOK, builtContent))
        })
        describe('without a discord hook', () => {
            beforeAll(async () => {
                delete process.env.DISCORD_HOOK
                await publishToDiscord(freeContent)
            })

            it('does not send a message to discord', () => expect(axios.post).not.toHaveBeenCalled())
        })
    })
})
