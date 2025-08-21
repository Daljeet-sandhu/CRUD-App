import React, { useState, useEffect } from "react";

const CATEGORY_COLORS = {
  work: "#4caf50",
  personal: "#2196f3",
  urgent: "#f44336",
};

 const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [taskText, setTaskText] = useState("");
  const [category, setCategory] = useState("work");
  const [deadline, setDeadline] = useState("");

  // Track which task is being edited (id or null)
  const [editingId, setEditingId] = useState(null);

  // Inputs for editing task
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("work");
  const [editDeadline, setEditDeadline] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskText.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskText,
        category,
        deadline,
        completed: false,
      },
    ]);

    setTaskText("");
    setDeadline("");
    setCategory("work");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditCategory(task.category);
    setEditDeadline(task.deadline);
  };

  // Save edited task
  const saveEdit = (id) => {
    if (!editText.trim()) return; // ignore empty text

    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, text: editText, category: editCategory, deadline: editDeadline }
        : task
    ));
    setEditingId(null);
  };

  // Cancel editing mode
  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 className="title text-center">To-Do List</h1>

      {/* Input area for new task */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter task..."
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="urgent">Urgent</option>
        </select>

        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          style={{ padding: 8 }}
        />

        <button onClick={addTask} className="btn btn-outline-secondary">
          Add
        </button>
      </div>

      {/* Tasks list */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.length === 0 && <p>No tasks yet! Add some above.</p>}

        {tasks.map(({ id, text, category, deadline, completed }) => (
          <li
            key={id}
            style={{
              backgroundColor: completed ? "#eee" : "#fff",
              borderLeft: `8px solid ${CATEGORY_COLORS[category]}`,
              padding: "10px 15px",
              marginBottom: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: completed ? 0.6 : 1,
              cursor: editingId === id ? "default" : "pointer",
            }}
            onClick={() => editingId === null && toggleComplete(id)} // only toggle if not editing
            title={editingId === id ? undefined : "Click to toggle complete"}
          >
            {/* Show edit form if editing this task */}
            {editingId === id ? (
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  style={{ width: "100%", padding: 6, marginBottom: 6 }}
                />
                <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                  <select
                    value={editCategory}
                    onChange={e => setEditCategory(e.target.value)}
                    style={{ flex: 1, padding: 6 }}
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <input
                    type="date"
                    value={editDeadline}
                    onChange={e => setEditDeadline(e.target.value)}
                    style={{ flex: 1, padding: 6 }}
                  />
                </div>
                <button onClick={() => saveEdit(id)} style={{ marginRight: 8, padding: "6px 12px" }}>
                  Save
                </button>
                <button onClick={cancelEdit} style={{ padding: "6px 12px" }}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                {/* Task text and info */}
                <div>
                  <strong>{text}</strong>
                  <div style={{ fontSize: 12, color: "#555" }}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    {deadline && ` | Due: ${deadline}`}
                  </div>
                </div>

                {/* Buttons for edit and delete */}
                <div>
                  <button
                    onClick={e => {
                      e.stopPropagation(); // stop toggling complete
                      startEditing({ id, text, category, deadline });
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#2196f3",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: 16,
                      marginRight: 10,
                    }}
                    aria-label="Edit task"
                    title="Edit task"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      deleteTask(id);
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#f44336",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: 18,
                    }}
                    aria-label="Delete task"
                    title="Delete task"
                  >
                    &times;
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
