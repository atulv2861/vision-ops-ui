import CameraSummaryCards from '../Component/Core/Cameras/CameraSummaryCards';
import CameraFilters from '../Component/Core/Cameras/CameraFilters';
import CameraCardsGrid from '../Component/Core/Cameras/CameraCardsGrid';

function Cameras() {
  return (
    <div className="space-y-6">
      <CameraSummaryCards />
      <CameraFilters />
      <CameraCardsGrid />
    </div>
  );
}

export default Cameras;
