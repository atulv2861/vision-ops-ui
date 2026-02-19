import { useState } from 'react';
import ViewSelector from '../../Comman/ViewSelector';

export interface CleaningHygieneViewControlsData {
  selectedView: 'dashboard' | 'map';
}

interface CleaningHygieneViewControlsProps {
  data?: CleaningHygieneViewControlsData;
  onDataChange?: (data: CleaningHygieneViewControlsData) => void;
}

function CleaningHygieneViewControls({ data, onDataChange }: CleaningHygieneViewControlsProps) {
  const [controlsData, setControlsData] = useState<CleaningHygieneViewControlsData>({
    selectedView: 'dashboard',
    ...data,
  });

  const handleViewChange = (view: 'dashboard' | 'map') => {
    const newData = { ...controlsData, selectedView: view };
    setControlsData(newData);
    onDataChange?.(newData);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <ViewSelector value={controlsData.selectedView} onChange={handleViewChange} />
    </div>
  );
}

export default CleaningHygieneViewControls;
