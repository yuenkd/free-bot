import axios from 'axios'
import { ContentSource, FreeContent, SlackMessage } from '../../interfaces'
import { publishToSlack } from '../../publishers/slack'
import * as postBodyBuilder from '../../publishers/post-body-builder'

jest.mock('axios')

describe('#slack publisher', () => {
    describe('when publishing to slack', () => {
        let freeContent: FreeContent
        const builtContent: SlackMessage = {
            blocks: [{ type: 'section' }],
        }
        beforeAll(async () => {
            jest.spyOn(postBodyBuilder, 'buildSlackMessage').mockImplementation(() => builtContent)
            process.env.SLACK_HOOK = 'https://my.slack.hook'
            freeContent = {
                title: 'Test Title',
                description: 'Test Description',
                imageUrl: 'https://cool.image',
                url: 'https://cool.link',
                expirationDate: new Date(),
                source: ContentSource.EpicGames,
            }
            await publishToSlack(freeContent)
        })
        afterAll(() => {
            jest.restoreAllMocks()
        })
        it('sends a message to slack', () => expect(axios.post).toBeCalledWith(process.env.SLACK_HOOK, builtContent))
    })
})
