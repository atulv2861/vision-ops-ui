import type { GlobalFilterData } from '../Context/AppContext';

let currentFilters: GlobalFilterData | null = null;

export function setGlobalFilters(filters: GlobalFilterData): void {
  currentFilters = filters;
}

export function getGlobalFilters(): GlobalFilterData | null {
  return currentFilters;
}

