/**
 * Raw response shapes returned by the Giphy REST API — only the fields the app reads.
 * Numeric values inside renditions are sent as strings.
 * @see https://developers.giphy.com/docs/api/schema
 */

export interface GiphyRendition {
  readonly url: string;
  readonly width: string;
  readonly height: string;
  readonly size?: string;
}

export interface GiphyImages {
  readonly fixed_width: GiphyRendition;
  readonly original: GiphyRendition;
}

export interface GiphyUser {
  readonly avatar_url: string;
  readonly display_name: string;
  readonly username: string;
  readonly profile_url: string;
  readonly is_verified: boolean;
}

export interface GiphyGif {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly alt_text?: string;
  readonly rating: string;
  readonly username: string;
  readonly source: string;
  readonly import_datetime: string;
  readonly user?: GiphyUser;
  readonly images: GiphyImages;
}

export interface GiphyPagination {
  readonly total_count: number;
}

export interface GiphyListResponse {
  readonly data: GiphyGif[];
  readonly pagination: GiphyPagination;
}

export interface GiphySingleResponse {
  readonly data: GiphyGif;
}
