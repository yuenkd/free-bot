export interface FreeContent {
    title: string
    description: string
    imageUrl: string
    url: string
    expirationDate: Date
    source: ContentSource
}

export enum ContentSource {
    EpicGames,
}

export interface EpicFreeGame {
    title: string
    description: string
    keyImages: { type: string; url: string }[]
    effectiveDate: Date
    productSlug: string
    price: { lineOffers: { appliedRules: { endDate: string }[] }[] }
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
