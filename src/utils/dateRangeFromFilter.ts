/**
 * Compute API from/to datetime strings (YYYY-MM-DD HH:mm:ss) from filter fromDate/toDate.
 */
const pad = (n: number) => String(n).padStart(2, '0');

function formatDateTime(d: Date, endOfDay: boolean): string {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  if (endOfDay) return `${y}-${pad(m)}-${pad(day)} 23:59:59`;
  return `${y}-${pad(m)}-${pad(day)} 00:00:00`;
}

export interface FilterDateInput {
  fromDate?: string;
  toDate?: string;
}

export function getDateRangeFromFilter(filter: FilterDateInput | null): {
  from: string;
  to: string;
} {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (filter?.fromDate && filter?.toDate) {
    return {
      from: `${filter.fromDate} 00:00:00`,
      to: `${filter.toDate} 23:59:59`,
    };
  }
  return {
    from: formatDateTime(todayStart, false),
    to: formatDateTime(now, true),
  };
}

/** Return fromDate/toDate (YYYY-MM-DD) for a preset label. Used by Navbar to set filter. */
export function getDateRangeYMDForPreset(preset: string): {
  fromDate: string;
  toDate: string;
} {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();

  const toDate = `${y}-${pad(m + 1)}-${pad(todayStart.getDate())}`;

  if (preset === 'Today') {
    return { fromDate: toDate, toDate };
  }
  if (preset === 'Last 7 days') {
    const from = new Date(todayStart);
    from.setDate(from.getDate() - 6);
    return {
      fromDate: `${from.getFullYear()}-${pad(from.getMonth() + 1)}-${pad(from.getDate())}`,
      toDate,
    };
  }
  if (preset === 'Last 30 days') {
    const from = new Date(todayStart);
    from.setDate(from.getDate() - 29);
    return {
      fromDate: `${from.getFullYear()}-${pad(from.getMonth() + 1)}-${pad(from.getDate())}`,
      toDate,
    };
  }
  if (preset === 'This week') {
    const day = now.getDay();
    const sun = new Date(todayStart);
    sun.setDate(sun.getDate() - day);
    const sat = new Date(sun);
    sat.setDate(sat.getDate() + 6);
    return {
      fromDate: `${sun.getFullYear()}-${pad(sun.getMonth() + 1)}-${pad(sun.getDate())}`,
      toDate: `${sat.getFullYear()}-${pad(sat.getMonth() + 1)}-${pad(sat.getDate())}`,
    };
  }
  if (preset === 'This month') {
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);
    return {
      fromDate: `${y}-${pad(m + 1)}-${pad(first.getDate())}`,
      toDate: `${y}-${pad(m + 1)}-${pad(last.getDate())}`,
    };
  }
  return { fromDate: toDate, toDate };
}
