import {
  WEEKLY_ACTIVITY,
  MONTHLY_REPORTS,
  RESOLUTION_TRENDS,
  REPORT_CATEGORY_BREAKDOWN,
} from '../data/seedData';
import { networkDelay } from '../utils/storage';
import { getReports } from './reportsService';
import { getListings } from './marketplaceService';
import { getInitiatives } from './initiativesService';

export async function getWeeklyActivity() {
  await networkDelay(200);
  return WEEKLY_ACTIVITY;
}

export async function getAnalyticsOverview(period = '6m') {
  await networkDelay(400);
  const [reports, listings, initiatives] = await Promise.all([
    getReports(),
    getListings(),
    getInitiatives(),
  ]);

  const resolved = reports.filter((r) => r.status === 'Resolved').length;
  const participants = initiatives.reduce((sum, i) => sum + i.participantCount, 0);

  const scale = { '3m': 0.5, '6m': 1, '12m': 1.8 }[period] ?? 1;

  return {
    kpis: {
      reportsResolved: resolved,
      resourcesReused: listings.length,
      communityParticipation: participants,
    },
    monthlyReports: MONTHLY_REPORTS.map((d) => ({ ...d, reports: Math.round(d.reports * scale) })),
    resolutionTrends: RESOLUTION_TRENDS.map((d) => ({
      ...d,
      resolved: Math.round(d.resolved * scale),
      submitted: Math.round(d.submitted * scale),
    })),
    categoryBreakdown: REPORT_CATEGORY_BREAKDOWN,
  };
}
