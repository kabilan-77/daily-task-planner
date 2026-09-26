import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function CalendarView({ tasks }) {

  const events = tasks.map((task) => ({
    title: task.title,
    date: task.dueDate,
    color:
      task.priority === "High"
        ? "#ef4444"
        : task.priority === "Medium"
        ? "#f59e0b"
        : "#22c55e",
  }));

  const handleDateClick = (info) => {
    alert(`Selected Date: ${info.dateStr}`);
  };

  const handleEventClick = (info) => {
    alert(info.event.title);
  };

  return (
    <div className="calendar-card">

      <h2>📅 Task Calendar</h2>

      <FullCalendar
        plugins={[
          dayGridPlugin,interactionPlugin]}
        
        initialView="dayGridMonth"
        height="700px"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />

    </div>
  );
}

export default CalendarView;
