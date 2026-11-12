/**
 * Raw response shapes returned by the Giphy REST API — only the fields the app reads.
 * Numeric values inside renditions are sent as strings.
 * @see https://developers.giphy.com/docs/api/schema
 */

export interface GiphyRendition {
  readonly url: string;
  readonly width: string;
  readonly height: string;
}

export interface GiphyImages {
  readonly fixed_width: GiphyRendition;
}

export interface GiphyGif {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly alt_text?: string;
  readonly images: GiphyImages;
}

export interface GiphyPagination {
  readonly total_count: number;
}

export interface GiphyListResponse {
  readonly data: GiphyGif[];
  readonly pagination: GiphyPagination;
}
