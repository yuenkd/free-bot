/* eslint-disable @typescript-eslint/no-require-imports */
import { getFreeEpicGames as mockGetFreeEpicGames } from '../scrapers/epic-games'
import { publishToSlack as mockPublishToSlack } from '../publishers/slack/slack'
import { publishToDiscord as mockPublishToDiscord } from '../publishers/discord'
jest.mock('../scrapers/epic-games')
jest.mock('../publishers/slack/slack')
jest.mock('../publishers/discord')

describe('index', () => {
    describe('when running once', () => {
        beforeAll(() => {
            ;(mockGetFreeEpicGames as jest.Mock).mockResolvedValueOnce([{}])
            ;(mockPublishToSlack as jest.Mock).mockImplementation()
            ;(mockPublishToDiscord as jest.Mock).mockImplementation()
            jest.spyOn(console, 'log').mockImplementation()
            process.env.RUN_ONCE = 'yes'
            require('../index')
        })
        afterAll(() => {
            jest.restoreAllMocks()
        })
        it('gets the free games', () => expect(mockGetFreeEpicGames).toHaveBeenCalled())
        it('publishes to slack', () => expect(mockPublishToSlack).toHaveBeenCalled())
        it('publishes to discord', () => expect(mockPublishToDiscord).toHaveBeenCalled())
    })
})
