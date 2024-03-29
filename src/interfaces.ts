export interface EpicGamesResponse {
    data: { Catalog: { searchStore: { elements: EpicFreeGame[] } } }
}

export interface FreeContent {
    title: string
    description: string
    imageUrl: string
    url: string
    expirationDate?: Date
    source: ContentSource
}

export enum ContentSource {
    EpicGames,
}

export interface EpicFreeGame {
    title: string
    description: string
    keyImages: { type: string; url: string }[]
    effectiveDate: string
    productSlug: string
    urlSlug: string
    price?: { lineOffers: { appliedRules: { endDate: string }[] }[] }
    promotions?: { promotionalOffers: { promotionalOffers: EpicPromotionalOffer[] }[] }
    catalogNs?: { mappings?: CatalogMapping[] }
    offerMappings?: { pageSlug: string }[]
}

export interface CatalogMapping {
    pageSlug: string
}

export interface EpicPromotionalOffer {
    startDate: string
    endDate: string
    discountSetting: { discountType: string; discountPercentage: number }
}

export interface SlackField {
    type: 'plain_text' | 'mrkdwn'
    text: string
    emoji?: boolean
}

export interface SlackBlock {
    type: 'section' | 'image'
    fields?: SlackField[]
    title?: SlackField
    image_url?: string
    alt_text?: string
    text?: SlackField
}

export interface SlackMessage {
    blocks: SlackBlock[]
}

export interface DiscordMessage {
    username?: string
    avatar_url?: string
    embeds?: unknown[]
}
