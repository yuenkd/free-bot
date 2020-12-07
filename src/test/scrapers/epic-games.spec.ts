import axios from 'axios'
import { FreeContent } from '../../interfaces'
import { apiUrl, getFreeEpicGames } from '../../scrapers/epic-games'

jest.mock('axios')

describe('#epic games scraper', () => {
    describe('when checking for free content', () => {
        let freeGames: FreeContent[]
        const title = 'Cave Story+'
        const description = 'Cave Story+'
        const imageUrl =
            'https://cdn1.epicgames.com/78473822f724474d8e436f6bde735623/offer/EGS_CaveStory_NicalisIncStudioPixel_S2-1200x1600-fe3f0018e131d715af61f6b2143af331.jpg'
        const productSlug = 'cave-story-plus'

        beforeAll(async () => {
            const today = new Date()
            const nextWeek = new Date()
            nextWeek.setDate(nextWeek.getDate() + 7)
            const freeGame = {
                data: {
                    Catalog: {
                        searchStore: {
                            elements: [
                                {
                                    title,
                                    description,
                                    effectiveDate: today.toISOString(),
                                    keyImages: [
                                        {
                                            type: 'Thumbnail',
                                            url: imageUrl,
                                        },
                                    ],
                                    productSlug,
                                    price: {
                                        lineOffers: [
                                            {
                                                appliedRules: [
                                                    {
                                                        endDate: '2020-12-10T16:00:00.000Z',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                },
                                {
                                    title: 'Not available until next week',
                                    description: 'Super cool game',
                                    effectiveDate: nextWeek.toISOString(),
                                    keyImages: [
                                        {
                                            type: 'Thumbnail',
                                            url: imageUrl,
                                        },
                                    ],
                                    productSlug,
                                    price: {
                                        lineOffers: [
                                            {
                                                appliedRules: [
                                                    {
                                                        endDate: '2020-12-10T16:00:00.000Z',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                },
            }
            ;(axios.get as jest.Mock).mockResolvedValue({
                data: freeGame,
                status: 200,
            })
            freeGames = await getFreeEpicGames()
        })
        it('hits the epic games API', () => expect(axios.get).toBeCalledWith(apiUrl))
        it('returns the list of free games effective today', () =>
            expect(freeGames).toEqual([
                {
                    title,
                    description,
                    imageUrl,
                    url: expect.stringContaining(productSlug),
                    expirationDate: expect.any(Date),
                },
            ]))
    })
})
