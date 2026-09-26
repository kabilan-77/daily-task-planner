import { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";

function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="widget-card">
      <div className="widget-header">
        <MdAccessTime className="widget-icon" />
        <h3>Current Time</h3>
      </div>

      <div className="clock-time">
        {time.toLocaleTimeString()}
      </div>

      <div className="clock-date">
        {time.toDateString()}
      </div>
    </div>
  );
}

export default ClockWidget;