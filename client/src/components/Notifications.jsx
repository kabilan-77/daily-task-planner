import React from "react";
import {
  MdNotificationsActive,
  MdCheckCircle,
  MdWarningAmber,
  MdAccessTime,
} from "react-icons/md";

function Notifications() {
  const notifications = [
    {
      id: 1,
      icon: <MdCheckCircle color="green" />,
      title: "Task Completed",
      message: "Mini Project completed successfully.",
      time: "10 min ago",
    },
    {
      id: 2,
      icon: <MdWarningAmber color="orange" />,
      title: "High Priority",
      message: "Finish Assignment before tomorrow.",
      time: "1 hour ago",
    },
    {
      id: 3,
      icon: <MdAccessTime color="#6C63FF" />,
      title: "Reminder",
      message: "Team Meeting at 4:00 PM.",
      time: "Today",
    },
  ];

  return (
    <div className="notification-card">
      <div className="card-title-row">
        <h2>
          <MdNotificationsActive /> Notifications
        </h2>
      </div>

      {notifications.map((item) => (
        <div className="notification-item" key={item.id}>
          <div className="notification-icon">
            {item.icon}
          </div>

          <div className="notification-content">
            <h4>{item.title}</h4>
            <p>{item.message}</p>
            <small>{item.time}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
