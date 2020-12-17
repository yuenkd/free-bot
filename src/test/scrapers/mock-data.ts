import { EpicFreeGame } from '../../interfaces'

interface FreeOverride {
    title: string
    description: string
    imageType: string
    imageUrl: string
    productSlug: string
    effectiveDate: Date
    endDate: Date
    isPromotional: boolean
}

export function getFakeEpicFreeGame(overrides: Partial<FreeOverride>): EpicFreeGame {
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    const {
        title = 'Cool Title',
        description = 'Cool Description',
        imageType = 'Thumbnail',
        imageUrl = 'https://my.cool.image.example.com',
        productSlug = 'super-cool-game',
        effectiveDate = new Date(),
        endDate = nextWeek,
        isPromotional = false,
    } = overrides

    const freeGame: EpicFreeGame = {
        title,
        description,
        effectiveDate: !isPromotional ? effectiveDate.toISOString() : new Date('2099-10-10').toISOString(),
        keyImages: [
            {
                type: imageType,
                url: imageUrl,
            },
        ],
        productSlug,
    }

    if (!isPromotional) {
        freeGame.price = {
            lineOffers: [
                {
                    appliedRules: [
                        {
                            endDate: endDate.toISOString(),
                        },
                    ],
                },
            ],
        }
    } else {
        freeGame.promotions = {
            promotionalOffers: [
                {
                    promotionalOffers: [
                        {
                            startDate: effectiveDate.toISOString(),
                            endDate: endDate.toISOString(),
                            discountSetting: {
                                discountType: 'PERCENTAGE',
                                discountPercentage: 0,
                            },
                        },
                    ],
                },
            ],
        }
    }

    return freeGame
}
