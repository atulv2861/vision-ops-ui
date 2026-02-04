import StaffProductivityFilters from '../Component/Core/StaffProductivity/StaffProductivityFilters';
import StaffProductivitySummaryCards from '../Component/Core/StaffProductivity/StaffProductivitySummaryCards';
import StaffProductivityViewControls from '../Component/Core/StaffProductivity/StaffProductivityViewControls';

function StaffProductivity() {
  return (
    <div className="space-y-6">
      <StaffProductivityFilters />
      <StaffProductivitySummaryCards />
      <StaffProductivityViewControls />
    </div>
  );
}

export default StaffProductivity;
