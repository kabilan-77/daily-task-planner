import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import API from "../api/taskApi";

function KanbanBoard({ tasks = [], fetchTasks }) {

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  );

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  );

  const columns = {
    Pending: pending,
    "In Progress": progress,
    Completed: completed,
  };

  const handleDragEnd = async (result) => {

    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    try {

      const task = tasks.find(
        (t) => t._id === taskId
      );

      if (!task) return;

      await API.put(`/${taskId}`, {
        ...task,
        status: newStatus,
      });

      if (fetchTasks) {
        fetchTasks();
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chart-card">

      <h2>📋 Kanban Board</h2>

      <DragDropContext onDragEnd={handleDragEnd}>

        <div className="kanban-board">

          {Object.entries(columns).map(([status, list]) => (

            <Droppable
              key={status}
              droppableId={status}
            >
              {(provided) => (

                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >

                  <h3>{status}</h3>

                  {list.map((task, index) => (

                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (

                        <div
                          className="kanban-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >

                          <h4>{task.title}</h4>

                          <p>{task.description}</p>

                          <small>
                            {task.priority}
                          </small>

                        </div>

                      )}
                    </Draggable>

                  ))}

                  {provided.placeholder}

                </div>

              )}
            </Droppable>

          ))}

        </div>

      </DragDropContext>

    </div>
  );
}

export default KanbanBoard;