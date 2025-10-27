/**
 * Service to fetch South African holidays
 */

export interface Holiday {
  name: string;
  date: Date;
  type: 'public' | 'school' | 'observance';
}

/**
 * Fetches South African public holidays for a given year
 */
export async function fetchSouthAfricanHolidays(year: number): Promise<Holiday[]> {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/ZA`, {
      signal: (AbortSignal as any).timeout?.(15000)
    } as any);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch holidays: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((holiday: any) => ({
      name: holiday.name,
      date: new Date(holiday.date),
      type: 'public'
    }));
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return [];
  }
}

/**
 * Validate that key South African holidays are present for the given year
 */
export function validateHolidays(holidays: Holiday[], year: number): { valid: boolean; missing: string[] } {
  const required = [
    "New Year's Day",
    'Human Rights Day',
    'Good Friday',
    'Family Day',
    'Freedom Day',
    "Workers' Day",
    'Youth Day',
    "National Women's Day",
    'Heritage Day',
    'Day of Reconciliation',
    'Christmas Day',
    'Day of Goodwill'
  ];

  const names = new Set(holidays.map(h => h.name.toLowerCase()));
  const missing = required.filter(r => !names.has(r.toLowerCase()));

  // Additionally verify all dates are valid and in the requested year
  const allDatesValid = holidays.every(h => !isNaN(h.date.getTime()) && h.date.getFullYear() === year);

  return { valid: missing.length === 0 && allDatesValid, missing };
}

/**
 * Fallback holidays in case the API is unavailable
 */
export function getSouthAfricanHolidaysFallback(year: number): Holiday[] {
  return [
    { name: "New Year's Day", date: new Date(year, 0, 1), type: 'public' },
    { name: 'Human Rights Day', date: new Date(year, 2, 21), type: 'public' },
    // Easter-derived dates vary yearly; these are placeholders if API fails
    { name: 'Good Friday', date: new Date(year, 2, 29), type: 'public' },
    { name: 'Family Day', date: new Date(year, 3, 1), type: 'public' },
    { name: 'Freedom Day', date: new Date(year, 3, 27), type: 'public' },
    { name: "Workers' Day", date: new Date(year, 4, 1), type: 'public' },
    { name: 'Youth Day', date: new Date(year, 5, 16), type: 'public' },
    { name: "National Women's Day", date: new Date(year, 7, 9), type: 'public' },
    { name: 'Heritage Day', date: new Date(year, 8, 24), type: 'public' },
    { name: 'Day of Reconciliation', date: new Date(year, 11, 16), type: 'public' },
    { name: 'Christmas Day', date: new Date(year, 11, 25), type: 'public' },
    { name: 'Day of Goodwill', date: new Date(year, 11, 26), type: 'public' },
  ];
}