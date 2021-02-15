import { getFreeEpicGames as mockGetFreeEpicGames } from '../scrapers/epic-games'
import { publishToSlack as mockPublishToSlack } from '../publishers/slack'
jest.mock('../scrapers/epic-games')
jest.mock('../publishers/slack')

describe('index', () => {
    describe('when running once', () => {
        beforeAll(() => {
            ;(mockGetFreeEpicGames as jest.Mock).mockResolvedValueOnce([{}])
            ;(mockPublishToSlack as jest.Mock).mockImplementation()
            jest.spyOn(console, 'log').mockImplementation()
            process.env.RUN_ONCE = 'yes'
            require('../index')
        })
        afterAll(() => {
            jest.restoreAllMocks()
        })
        it('gets the free games', () => expect(mockGetFreeEpicGames).toHaveBeenCalled())
        it('publishes to slack', () => expect(mockPublishToSlack).toHaveBeenCalled())
    })
})
