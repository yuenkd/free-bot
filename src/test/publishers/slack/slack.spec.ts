import axios from 'axios'
import { ContentSource, FreeContent, SlackMessage } from '../../../interfaces'
import { publishToSlack } from '../../../publishers/slack/slack'
import * as postBodyBuilder from '../../../publishers/slack/post-body-builder'

jest.mock('axios')

describe('#slack publisher', () => {
    describe('when publishing to slack', () => {
        afterEach(() => {
            jest.clearAllMocks()
        })
        const freeContent: FreeContent = {
            title: 'Test Title',
            description: 'Test Description',
            imageUrl: 'https://cool.image',
            url: 'https://cool.link',
            expirationDate: new Date(),
            source: ContentSource.EpicGames,
        }

        describe('with a slack hook', () => {
            const builtContent: SlackMessage = {
                blocks: [{ type: 'section' }],
            }
            beforeAll(async () => {
                jest.spyOn(postBodyBuilder, 'buildSlackMessage').mockImplementation(() => builtContent)
                process.env.SLACK_HOOK = 'https://my.slack.hook'
                await publishToSlack(freeContent)
            })
            it('sends a message to slack', () =>
                expect(axios.post).toHaveBeenCalledWith(process.env.SLACK_HOOK, builtContent))
        })
        describe('without a slack hook', () => {
            beforeAll(async () => {
                delete process.env.SLACK_HOOK
                await publishToSlack(freeContent)
            })

            it('does not send a message to slack', () => expect(axios.post).not.toHaveBeenCalled())
        })
    })
})
