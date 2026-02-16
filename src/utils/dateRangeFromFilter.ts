/**
 * Compute API from/to datetime strings (YYYY-MM-DD HH:mm:ss) from the navbar date dropdown.
 * e.g. "Today" → today 00:00:00 to 23:59:59; "Last 7 days" → 7-day range; then send in request.
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
  Date: string;
  fromDate?: string;
  toDate?: string;
}

export function getDateRangeFromFilter(filter: FilterDateInput | null): {
  from: string;
  to: string;
} {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (!filter?.Date) {
    return {
      from: formatDateTime(todayStart, false),
      to: formatDateTime(now, true),
    };
  }

  const dateLabel = filter.Date.trim();
  if (filter.fromDate && filter.toDate) {
    return {
      from: `${filter.fromDate} 00:00:00`,
      to: `${filter.toDate} 23:59:59`,
    };
  }
  if (dateLabel === 'Today') {
    return {
      from: formatDateTime(todayStart, false),
      to: formatDateTime(now, true),
    };
  }
  if (dateLabel === 'Last 7 days') {
    const from = new Date(todayStart);
    from.setDate(from.getDate() - 6);
    return {
      from: formatDateTime(from, false),
      to: formatDateTime(now, true),
    };
  }
  if (dateLabel === 'Last 30 days') {
    const from = new Date(todayStart);
    from.setDate(from.getDate() - 29);
    return {
      from: formatDateTime(from, false),
      to: formatDateTime(now, true),
    };
  }
  if (dateLabel === 'This week') {
    const day = now.getDay();
    const sun = new Date(todayStart);
    sun.setDate(sun.getDate() - day);
    const sat = new Date(sun);
    sat.setDate(sat.getDate() + 6);
    return {
      from: formatDateTime(sun, false),
      to: formatDateTime(sat, true),
    };
  }
  if (dateLabel === 'This month') {
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
      from: formatDateTime(first, false),
      to: formatDateTime(last, true),
    };
  }

  return {
    from: formatDateTime(todayStart, false),
    to: formatDateTime(now, true),
  };
}
