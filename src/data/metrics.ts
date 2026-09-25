/**
 * Every number shown on the site lives here, so it only has to be fixed in one place.
 *
 * `verified: false` means the number has NOT been checked against source data.
 * The brief lists two known conflicts that must be resolved before launch:
 *   1. Revenue: resolved, $540K confirmed.
 *   2. Conversion: resolved, 26.61% is the online conversion rate (not a lift).
 * The Canadian Tire case study's Summary section also quotes $540K and 26.61%: keep them in sync.
 * Do not "fix" these by guessing. Pull the real figure, update `value`/`label`,
 * set `verified: true`, and note the source in `source`.
 *
 * In `npm run dev`, unverified metrics get a dashed outline on the page.
 * `npm run check:launch` fails while any metric is unverified.
 */
export interface Metric {
  value: string;
  label: string;
  verified: boolean;
  source?: string;
  note?: string;
}

export const metrics = {
  conversionLift: {
    // Key kept for history: this is the absolute online conversion rate, not a lift.
    value: '26.61%',
    label: 'Online conversion rate',
    verified: true,
    source: 'Confirmed by Megan (Sept 2026) as the online conversion rate.',
  },
  omniChannelLift: {
    value: '+67%',
    label: 'Omni-channel lift',
    verified: false,
  },
  pdpViewRate: {
    value: '+30%',
    label: 'PDP view rate',
    verified: false,
  },
  attributedRevenue: {
    value: '$540K',
    label: 'Attributed revenue',
    verified: true,
    source: 'Confirmed by Megan (Sept 2026). The earlier $177K + $366K breakdown is no longer shown.',
  },
} satisfies Record<string, Metric>;

export type MetricKey = keyof typeof metrics;
