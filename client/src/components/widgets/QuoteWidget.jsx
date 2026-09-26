function QuoteWidget() {

  const quotes = [
    "Success is the sum of small efforts repeated every day.",
    "Focus on progress, not perfection.",
    "Stay positive. Work hard. Make it happen.",
    "Every completed task is one step closer to your goal."
  ];

  const quote =
    quotes[new Date().getDate() % quotes.length];

  return (
    <div className="widget">
      <h3>💡 Quote of the Day</h3>
      <p>{quote}</p>
    </div>
  );
}

export default QuoteWidget;