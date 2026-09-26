import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

function DragDropBoard({ tasks }) {
  const pending = tasks.filter(
    (task) => task.status === "Pending"
  );

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  );

  const onDragEnd = () => {
    // We will connect this to MongoDB later
  };

  return (
    <div className="overview-card">

      <h2>📋 Drag & Drop Board</h2>

      <DragDropContext onDragEnd={onDragEnd}>

        <div className="drag-board">

          <Droppable droppableId="pending">
            {(provided) => (
              <div
                className="drag-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>Pending</h3>

                {pending.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="drag-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="completed">
            {(provided) => (
              <div
                className="drag-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>Completed</h3>

                {completed.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="drag-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>

        </div>

      </DragDropContext>

    </div>
  );
}

export default DragDropBoard;