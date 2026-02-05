/**
 * Token utilities for JWT storage and retrieval.
 * Single source of truth for token key - no magic strings in app code.
 */

const TOKEN_STORAGE_KEY = 'auth_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function hasToken(): boolean {
  return Boolean(getToken());
}
