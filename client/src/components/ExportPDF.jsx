import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ tasks }) {

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Daily Task Planner Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Title", "Priority", "Category", "Status", "Due Date"]],
      body: tasks.map((task) => [
        task.title,
        task.priority,
        task.category,
        task.status,
        task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No Date",
      ]),
    });

    doc.save("Daily_Task_Report.pdf");
  };

  return (
    <button
      className="pdf-btn"
      onClick={downloadPDF}
    >
      📄 Download PDF
    </button>
  );
}

export default ExportPDF;
