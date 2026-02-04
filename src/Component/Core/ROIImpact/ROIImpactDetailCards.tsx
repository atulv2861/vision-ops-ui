import ROIImpactDetailCard, { type ROIImpactDetailCardData } from './ROIImpactDetailCard';

// Dummy data - This structure matches API response format
const detailCardsData: ROIImpactDetailCardData[] = [
  {
    title: 'Operational Cost Savings',
    badge: '29% saved',
    detailLine1: 'Before: $450K → After: $320K',
    detailLine2: 'Vision-based automation, no manual tracking',
    iconType: 'dollar',
    colorTheme: 'green'
  },
  {
    title: 'Space Utilization',
    badge: '+22%',
    detailLine1: 'Avoided $45K infrastructure expansion',
    detailLine2: 'Real-time occupancy analytics',
    iconType: 'target',
    colorTheme: 'blue'
  },
  {
    title: 'Staff Efficiency',
    badge: '+34%',
    detailLine1: '8 → 6 security staff required',
    detailLine2: 'Automated zone monitoring',
    iconType: 'staff',
    colorTheme: 'purple'
  },
  {
    title: 'Cleaning Optimization',
    badge: '25% less',
    detailLine1: '180 → 135 hours/week',
    detailLine2: 'Usage-based scheduling only',
    iconType: 'star',
    colorTheme: 'green'
  },
  {
    title: 'Safety Risk Reduction',
    badge: '83% fewer',
    detailLine1: '23 → 4 incidents/month',
    detailLine2: 'Early detection & prevention',
    iconType: 'shield',
    colorTheme: 'red'
  }
];

function ROIImpactDetailCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {detailCardsData.map((card, index) => (
        <ROIImpactDetailCard key={index} data={card} />
      ))}
    </div>
  );
}

export default ROIImpactDetailCards;
