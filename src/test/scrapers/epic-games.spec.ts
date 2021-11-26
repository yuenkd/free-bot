import axios from 'axios'
import { ContentSource, FreeContent } from '../../interfaces'
import { apiUrl, epicProductPagePrefix, getFreeEpicGames } from '../../scrapers/epic-games'
import { getFakeEpicFreeGame } from './mock-data'

jest.mock('axios')

describe('#epic games scraper', () => {
    describe('when there are free games', () => {
        let actualfreeGames: FreeContent[]
        let expectedFreeGames: FreeContent[]

        beforeAll(async () => {
            const nextWeek = new Date()
            nextWeek.setDate(nextWeek.getDate() + 7)
            expectedFreeGames = [
                {
                    title: 'Regular Free Game',
                    description: 'Regular Free Game',
                    imageUrl: 'https://free.game.example.com',
                    url: `${epicProductPagePrefix}/regular-free-game`,
                    expirationDate: nextWeek,
                    source: ContentSource.EpicGames,
                },
                {
                    title: 'Promotional Free Game',
                    description: 'Promotional Free Game',
                    imageUrl: 'https://promo.free.game.example.com',
                    url: `${epicProductPagePrefix}/promotional-free-game`,
                    expirationDate: nextWeek,
                    source: ContentSource.EpicGames,
                },
                {
                    title: 'Free Game Other Image',
                    description: 'Free Game without thumbnail or store images',
                    imageUrl: 'https://other-image.free.game.example.com',
                    url: `${epicProductPagePrefix}/free-game-other-image`,
                    source: ContentSource.EpicGames,
                },
            ]

            const epicResponse = {
                data: {
                    Catalog: {
                        searchStore: {
                            elements: [
                                getFakeEpicFreeGame({
                                    title: expectedFreeGames[0].title,
                                    description: expectedFreeGames[0].description,
                                    imageUrl: expectedFreeGames[0].imageUrl,
                                    productSlug: 'regular-free-game',
                                    effectiveDate: new Date(),
                                    endDate: expectedFreeGames[0].expirationDate,
                                }),
                                getFakeEpicFreeGame({
                                    title: expectedFreeGames[1].title,
                                    description: expectedFreeGames[1].description,
                                    imageType: 'DieselStoreFrontWide',
                                    imageUrl: expectedFreeGames[1].imageUrl,
                                    productSlug: 'promotional-free-game',
                                    isPromotional: true,
                                    endDate: nextWeek,
                                }),
                                getFakeEpicFreeGame({
                                    title: expectedFreeGames[2].title,
                                    description: expectedFreeGames[2].description,
                                    imageType: 'OtherImage',
                                    imageUrl: expectedFreeGames[2].imageUrl,
                                    productSlug: '',
                                    urlSlug: 'free-game-other-image',
                                    effectiveDate: new Date(),
                                }),
                                getFakeEpicFreeGame({
                                    title: 'Not available until next week',
                                    description: 'Super cool game',
                                    effectiveDate: nextWeek,
                                })
                            ],
                        },
                    },
                },
            }
            ;(axios.get as jest.Mock).mockResolvedValue({
                data: epicResponse,
                status: 200,
            })
            actualfreeGames = await getFreeEpicGames()
        })
        it('hits the epic games API', () => expect(axios.get).toBeCalledWith(apiUrl))
        it('returns the list of free games effective today', () => expect(actualfreeGames).toEqual(expectedFreeGames))
    })
    describe('when there are no free games', () => {
        let actualfreeGames: FreeContent[]
        beforeAll(async () => {
            const epicResponse = {
                data: {
                    Catalog: {
                        searchStore: {},
                    },
                },
            }
            ;(axios.get as jest.Mock).mockResolvedValue({
                data: epicResponse,
                status: 200,
            })
            actualfreeGames = await getFreeEpicGames()
        })
        it('hits the epic games API', () => expect(axios.get).toBeCalledWith(apiUrl))
        it('returns the list of free games effective today', () => expect(actualfreeGames).toEqual([]))
    })
})
