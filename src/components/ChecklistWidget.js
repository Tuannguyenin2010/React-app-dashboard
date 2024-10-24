// src/components/ChecklistWidget.js
import React, { useState } from 'react';

const ChecklistWidget = () => {
  const [tasks, setTasks] = useState([]); // Manage the list of tasks
  const [task, setTask] = useState(''); // Manage input for a new task

  // Add a new task if the input is not empty
  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask(''); // Clear input after adding
    }
  };

  // Toggle task completion status
  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Render the checklist UI
  return (
    <div className="widget">
      <h2>Checklist</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {tasks.map((t, index) => (
          <li
            key={index}
            onClick={() => toggleTask(index)} // Toggle completion on click
            style={{
              textDecoration: t.completed ? 'line-through' : 'none', // Strike-through for completed tasks
              cursor: 'pointer',
            }}
          >
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChecklistWidget; // Export the component
