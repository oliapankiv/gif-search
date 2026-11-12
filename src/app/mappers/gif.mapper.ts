import { Gif, GifImage } from '../models/gif.model';
import { GiphyGif, GiphyRendition } from '../models/giphy-api.model';

export function mapGif(dto: GiphyGif): Gif {
  return {
    id: dto.id,
    title: dto.title.trim() || 'Untitled GIF',
    altText: dto.alt_text?.trim() || dto.title.trim() || 'GIF',
    pageUrl: dto.url,
    preview: mapImage(dto.images.fixed_width),
  };
}

function mapImage(dto: GiphyRendition): GifImage {
  return {
    url: dto.url,
    width: Number(dto.width),
    height: Number(dto.height),
  };
}
