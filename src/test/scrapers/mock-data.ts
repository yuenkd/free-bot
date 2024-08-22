import { EpicFreeGame } from '../../interfaces'

interface FreeOverride {
    title: string
    description: string
    imageType: string
    imageUrl: string
    productSlug: string
    urlSlug: string
    effectiveDate: Date
    endDate: Date
    isPromotional: boolean
    pageSlug: string
    offerMappingPageSlug: string
}

export function getFakeEpicFreeGame(overrides: Partial<FreeOverride>): EpicFreeGame {
    const {
        title = 'Cool Title',
        description = 'Cool Description',
        imageType = 'Thumbnail',
        imageUrl = 'https://my.cool.image.example.com',
        productSlug = 'super-cool-game',
        urlSlug = 'super-cool-game-url',
        effectiveDate = new Date(),
        endDate,
        isPromotional = false,
        pageSlug,
        offerMappingPageSlug,
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
        urlSlug,
    }

    if (pageSlug) {
        freeGame.catalogNs = { mappings: [{ pageSlug }] }
    }

    if (offerMappingPageSlug) {
        freeGame.offerMappings = [{ pageSlug: offerMappingPageSlug }]
    }

    if (!isPromotional) {
        freeGame.price = {
            lineOffers: [
                {
                    appliedRules: [
                        {
                            endDate: endDate ? endDate.toISOString() : '',
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
                            endDate: endDate ? endDate.toISOString() : '',
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
