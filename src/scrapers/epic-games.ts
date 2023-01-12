import { ContentSource, EpicFreeGame, EpicGamesResponse, EpicPromotionalOffer, FreeContent } from '../interfaces'

import axios from 'axios'

export const apiUrl =
    'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US'

export const epicProductPagePrefix = 'https://www.epicgames.com/store/en-US/p'

export async function getFreeEpicGames(): Promise<FreeContent[]> {
    const response = await axios.get<EpicGamesResponse>(apiUrl)
    const elements = response.data?.data?.Catalog?.searchStore?.elements
    return (
        elements?.filter(isGameFreeToday).map((freeGame: EpicFreeGame) => ({
            title: freeGame.title,
            description: freeGame.description,
            imageUrl: getImageUrl(freeGame),
            url: `${epicProductPagePrefix}/${getSlug(freeGame)}`,
            expirationDate: getExpirationDate(freeGame),
            source: ContentSource.EpicGames,
        })) ?? []
    )
}

function getSlug(freeGame: EpicFreeGame) {
    const { productSlug, urlSlug, catalogNs, offerMappings } = freeGame
    return offerMappings?.[0]?.pageSlug || catalogNs?.mappings?.[0]?.pageSlug || productSlug || urlSlug
}

function isGameFreeToday(game: EpicFreeGame) {
    const today = new Date().toDateString()
    const effectiveDate = new Date(game.effectiveDate).toDateString()
    const isFreeToday = today === effectiveDate

    if (isFreeToday) {
        return isFreeToday
    }

    const freePromotion = getFreePromotion(game)

    if (freePromotion) {
        return new Date(freePromotion.startDate).toDateString() === today
    }
    return false
}

function getFreePromotion(game: EpicFreeGame): EpicPromotionalOffer | undefined {
    const promotionalOffers = game.promotions?.promotionalOffers?.find((promotion) =>
        promotion.promotionalOffers?.find(isFreePromotion)
    )
    const freePromotion = promotionalOffers?.promotionalOffers.find(isFreePromotion)
    return freePromotion
}

function isFreePromotion(promotion: EpicPromotionalOffer) {
    return (
        promotion.discountSetting?.discountType === 'PERCENTAGE' && promotion.discountSetting?.discountPercentage === 0
    )
}

function getExpirationDate(game: EpicFreeGame): Date | undefined {
    const freePromotion = getFreePromotion(game)
    const dateStr = game.price?.lineOffers[0]?.appliedRules[0]?.endDate || (freePromotion && freePromotion.endDate)
    if (dateStr) {
        return new Date(dateStr)
    }
}

function getImageUrl(game: EpicFreeGame): string {
    return (
        game.keyImages.find((i) => i.type === 'Thumbnail')?.url ||
        game.keyImages.find((i) => i.type === 'DieselStoreFrontWide')?.url ||
        game.keyImages[0].url
    )
}
