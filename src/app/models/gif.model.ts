export interface GifImage {
  readonly url: string;
  readonly width: number;
  readonly height: number;
  readonly size: number | null;
}

export interface GifAuthor {
  readonly displayName: string;
  readonly username: string;
  readonly avatarUrl: string | null;
  readonly profileUrl: string | null;
  readonly isVerified: boolean;
}

export interface Gif {
  readonly id: string;
  readonly title: string;
  readonly altText: string;
  readonly rating: string;
  readonly pageUrl: string;
  readonly sourceUrl: string | null;
  readonly createdAt: Date | null;
  readonly author: GifAuthor | null;
  readonly preview: GifImage;
  readonly original: GifImage;
}
