import { HttpErrorResponse } from '@angular/common/http';

export function getErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    switch (error.status) {
      case 0:
        return 'Network error. Check your internet connection and try again.';
      case 401:
      case 403:
        return 'Access to GIPHY was denied. Check that a valid API key is configured.';
      case 404:
        return 'The requested GIF was not found.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      default:
        return 'GIPHY is not responding right now. Please try again later.';
    }
  }

  return 'Something went wrong. Please try again.';
}
