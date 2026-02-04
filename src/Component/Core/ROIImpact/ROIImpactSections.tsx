import ROIImpactSection, { type ROIImpactSectionData } from './ROIImpactSection';

// Dummy data - This structure matches API response format
const sectionsData: ROIImpactSectionData[] = [
  {
    annualSavings: '$45,000/yr',
    colorTheme: 'orange',
    cards: [
      { title: 'Overcrowding Reduction', value: '83%' },
      { title: 'Space Utilization', value: '+22%' },
      { title: 'Avoided Expansion', value: '$45K' }
    ],
    benefits: [
      'Real-time density tracking prevents overcrowded cafeterias and corridors',
      'Optimized classroom and facility scheduling based on actual usage patterns',
      'Data-driven decision to avoid unnecessary infrastructure expansion'
    ]
  },
  {
    annualSavings: '$35,000/yr',
    colorTheme: 'blue',
    cards: [
      { title: 'Investigation Time', value: '82% faster' },
      { title: 'Security Staff Saved', value: '1.5 FTE' },
      { title: 'Search Time', value: '45→8 min' }
    ],
    benefits: [
      'Automatic movement history across cameras (no manual footage review)',
      'Faster incident investigation and resolution for authorized personnel only',
      'Reduced security staffing overhead through automated tracking'
    ]
  },
  {
    annualSavings: '$28,000/yr',
    colorTheme: 'red',
    cards: [
      { title: 'Response Time', value: '75% faster' },
      { title: 'Prevented Incidents', value: '19/month' },
      { title: 'Liability Risk', value: '-68%' }
    ],
    benefits: [
      'Auto-detection of running, crowd gathering, abnormal movement patterns',
      'Early incident prevention through real-time alerts (12→3 min response)',
      'Reduced escalation and liability risk with documented evidence'
    ]
  },
  {
    annualSavings: '$22,000/yr',
    colorTheme: 'purple',
    cards: [
      { title: 'Coverage Gaps', value: '-87%' },
      { title: 'Overtime Reduction', value: '$13K/yr' },
      { title: 'Staff Efficiency', value: '+34%' }
    ],
    benefits: [
      'Optimized staff deployment based on real-time zone presence data',
      'Automatic supervision gap detection (presence only, no productivity scoring)',
      'Privacy-first approach: zone coverage monitoring without individual tracking'
    ]
  },
  {
    annualSavings: '$23,000/yr',
    colorTheme: 'green',
    cards: [
      { title: 'Hours Saved', value: '45 hrs/wk' },
      { title: 'Cost Reduction', value: '25%' },
      { title: 'Hygiene Score', value: '+18%' }
    ],
    benefits: [
      'Eliminated over-cleaning through usage-based scheduling (180→135 hrs/wk)',
      'Targeted cleaning based on real student and staff traffic patterns',
      'Improved hygiene compliance without manual checklists or inspections'
    ]
  }
];

function ROIImpactSections() {
  return (
    <div className="space-y-6">
      {sectionsData.map((section, index) => (
        <ROIImpactSection key={index} data={section} />
      ))}
    </div>
  );
}

export default ROIImpactSections;
