export const getInitials = (name?: string) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

/**
 * Format ISO date string (YYYY-MM-DD) to any format using tokens: YYYY, MM, DD
 * Example: formatDate('2024-01-20', 'DD/MM/YYYY') => '20/01/2024'
 */
export function formatDate(dateStr?: string, format: string = 'DD/MM/YYYY'): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  return format.replace(/YYYY/g, year).replace(/MM/g, month).replace(/DD/g, day);
}
