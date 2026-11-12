export interface GifImage {
  readonly url: string;
  readonly width: number;
  readonly height: number;
}

export interface Gif {
  readonly id: string;
  readonly title: string;
  readonly altText: string;
  readonly pageUrl: string;
  readonly preview: GifImage;
}
