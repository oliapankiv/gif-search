import { Gif, GifAuthor, GifImage } from '../models/gif.model';
import { GiphyGif, GiphyRendition } from '../models/giphy-api.model';

export function mapGif(dto: GiphyGif): Gif {
  return {
    id: dto.id,
    title: dto.title.trim() || 'Untitled GIF',
    altText: dto.alt_text?.trim() || dto.title.trim() || 'GIF',
    rating: dto.rating.toUpperCase(),
    pageUrl: dto.url,
    sourceUrl: dto.source || null,
    createdAt: parseGiphyDate(dto.import_datetime),
    author: mapAuthor(dto),
    preview: mapImage(dto.images.fixed_width),
    original: mapImage(dto.images.original),
  };
}

function mapAuthor(dto: GiphyGif): GifAuthor | null {
  if (dto.user) {
    return {
      displayName: dto.user.display_name || dto.user.username,
      username: dto.user.username,
      avatarUrl: dto.user.avatar_url || null,
      profileUrl: dto.user.profile_url || null,
      isVerified: dto.user.is_verified,
    };
  }

  if (dto.username) {
    return {
      displayName: dto.username,
      username: dto.username,
      avatarUrl: null,
      profileUrl: null,
      isVerified: false,
    };
  }

  return null;
}

function mapImage(dto: GiphyRendition): GifImage {
  const size = Number(dto.size);

  return {
    url: dto.url,
    width: Number(dto.width),
    height: Number(dto.height),
    size: Number.isFinite(size) && size > 0 ? size : null,
  };
}

function parseGiphyDate(value: string | undefined): Date | null {
  if (!value || value.startsWith('0000')) {
    return null;
  }

  const date = new Date(`${value.replace(' ', 'T')}Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}
