export interface FreeContent {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  expirationDate: Date;
}

export interface EpicFreeGame {
  title: string;
  description: string;
  keyImages: { type: string; url: string }[];
  effectiveDate: Date;
  productSlug: string;
  price: { lineOffers: { appliedRules: { endDate: string }[] }[] };
}

export interface SlackField {
  type: string;
  text: string;
  emoji?: boolean;
}

export interface SlackBlock {
  type: string;
  fields?: SlackField[];
  title?: SlackField;
  image_url?: string;
  alt_text?: string;
  text?: SlackField;
}

export interface SlackMessage {
  blocks: SlackBlock[];
}
