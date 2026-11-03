// BinFlow categorization utilities

export const lanes = ['alpha', 'beta', 'gamma'] as const;

export function tagFromValue(value: number | null): string {
  if (value == null) return 'unknown';
  if (value > 0.8) return 'spike';
  if (value < 0.2) return 'flat';
  return 'normal';
}

export function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
