import { ContentSource, EpicFreeGame, FreeContent } from '../interfaces'

import axios from 'axios'

export const apiUrl =
    'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US'

export async function getFreeEpicGames(): Promise<FreeContent[]> {
    const response = await axios.get(apiUrl)
    return (
        response.data?.data?.Catalog?.searchStore?.elements
            ?.filter((e: EpicFreeGame) => new Date(e.effectiveDate).toDateString() === new Date().toDateString())
            .map((freeGame: EpicFreeGame) => ({
                title: freeGame.title,
                description: freeGame.description,
                imageUrl: freeGame.keyImages.find((i) => i.type === 'Thumbnail')?.url,
                url: `https://www.epicgames.com/store/en-US/product/${freeGame.productSlug}`,
                expirationDate: new Date(freeGame.price.lineOffers[0].appliedRules[0].endDate),
                source: ContentSource.EpicGames,
            })) ?? []
    )
}
