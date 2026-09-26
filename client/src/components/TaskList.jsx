import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

function TaskList({ tasks = [], fetchTasks, onEdit, search = "" }) {
  const [taskList, setTaskList] = useState([]);

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    setTaskList(Array.isArray(tasks) ? tasks : []);
  }, [tasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...taskList];
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    setTaskList(items);
  };

  const filteredTasks = taskList
    .filter((task) => {
      const title = task?.title || "";
      const status = task?.status || "";
      const priority = task?.priority || "";

      const matchesSearch = title
        .toLowerCase()
        .includes((search || "").toLowerCase());

      const matchesStatus =
        statusFilter === "All" || status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    })
    .sort((a, b) => {
      if (sortBy === "Newest") {
        return (
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
        );
      }

      if (sortBy === "Oldest") {
        return (
          new Date(a.createdAt || 0) -
          new Date(b.createdAt || 0)
        );
      }

      if (sortBy === "Due Date") {
        return (
          new Date(a.dueDate || 0) -
          new Date(b.dueDate || 0)
        );
      }

      if (sortBy === "Priority") {
        const order = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        return (
          (order[a.priority] || 99) -
          (order[b.priority] || 99)
        );
      }

      return 0;
    });

  return (
    <div className="task-list">

      <h2>📋 My Tasks</h2>

      <div className="filters">

        <button
          onClick={() => setStatusFilter("All")}
          className={statusFilter === "All" ? "active-filter" : ""}
        >
          All
        </button>

        <button
          onClick={() => setStatusFilter("Pending")}
          className={statusFilter === "Pending" ? "active-filter" : ""}
        >
          Pending
        </button>

        <button
          onClick={() => setStatusFilter("Completed")}
          className={statusFilter === "Completed" ? "active-filter" : ""}
        >
          Completed
        </button>

      </div>

      <div className="filters">

        <button
          onClick={() => setPriorityFilter("All")}
          className={priorityFilter === "All" ? "active-filter" : ""}
        >
          All
        </button>

        <button
          onClick={() => setPriorityFilter("High")}
          className={priorityFilter === "High" ? "active-filter" : ""}
        >
          High
        </button>

        <button
          onClick={() => setPriorityFilter("Medium")}
          className={priorityFilter === "Medium" ? "active-filter" : ""}
        >
          Medium
        </button>

        <button
          onClick={() => setPriorityFilter("Low")}
          className={priorityFilter === "Low" ? "active-filter" : ""}
        >
          Low
        </button>

      </div>

      <div className="search-box">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Due Date">Due Date</option>
          <option value="Priority">Priority</option>
        </select>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredTasks.length === 0 ? (
                <p>No tasks found.</p>
              ) : (
                filteredTasks.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={String(task._id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          task={task}
                          fetchTasks={fetchTasks}
                          onEdit={onEdit}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  );
}

export default TaskList;