import axios from 'axios'
import { FreeContent, SlackMessage } from '../../interfaces'
import { buildSlackMessage, publishToSlack } from '../../publishers/slack'

jest.mock('axios')

describe('#slack publisher', () => {
    describe('when publishing to slack', () => {
        let freeContent: FreeContent
        let builtContent: SlackMessage
        beforeAll(async () => {
            process.env.SLACK_HOOK = 'https://my.slack.hook'
            freeContent = {
                title: 'Test Title',
                description: 'Test Description',
                imageUrl: 'https://cool.image',
                url: 'https://cool.link',
                expirationDate: new Date(),
            }
            builtContent = buildSlackMessage(freeContent)
            await publishToSlack(freeContent)
        })
        it('sends a message to slack', () => expect(axios.post).toBeCalledWith(process.env.SLACK_HOOK, builtContent))
    })
})
