//import StudentDistributionFilters from '../Component/Core/StudentDistribution/StudentDistributionFilters';
import StudentDistributionSummaryCards from '../Component/Core/StudentDistribution/StudentDistributionSummaryCards';
import AggregatePresenceChart from '../Component/Core/StudentDistribution/AggregatePresenceChart';
//import StudentDistributionViewControls from '../Component/Core/StudentDistribution/StudentDistributionViewControls';

function StudentDistribution() {
  return (
    <div className="space-y-6">
      {/* <StudentDistributionFilters /> */}
      <StudentDistributionSummaryCards />
      <AggregatePresenceChart />
      {/* <StudentDistributionViewControls /> */}
    </div>
  );
}

export default StudentDistribution;
