import CleaningHygieneSummaryCards from '../Component/Core/CleaningHygiene/CleaningHygieneSummaryCards';
import CleaningHygieneViewControls from '../Component/Core/CleaningHygiene/CleaningHygieneViewControls';

function CleaningHygiene() {
  return (
    <div className="space-y-6">
      <CleaningHygieneSummaryCards />
      <CleaningHygieneViewControls />
    </div>
  );
}

export default CleaningHygiene;
