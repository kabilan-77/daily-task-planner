import { MdPsychology } from "react-icons/md";

function AISuggestions() {
  return (
    <div className="widget-card">

      <div className="widget-header">
        <MdPsychology className="widget-icon" />
        <h3>AI Suggestions</h3>
      </div>

      <p className="ai-text">
        Complete your pending tasks before starting new ones.
        High priority tasks should be finished today.
      </p>

    </div>
  );
}

export default AISuggestions;