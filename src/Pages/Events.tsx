import EventsHeader from '../Component/Core/Events/EventsHeader';
import EventsGrid from '../Component/Core/Events/EventsGrid';

function Events() {
  return (
    <div>
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-white mb-6">Events</h1>

      {/* Header with Search and Filters */}
      <EventsHeader />

      {/* Events Grid */}
      <EventsGrid />
    </div>
  );
}

export default Events;
