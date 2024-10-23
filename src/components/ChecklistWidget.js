// src/components/ChecklistWidget.js
import React, { useState } from 'react';

const ChecklistWidget = () => {
  const [tasks, setTasks] = useState([]); // Store tasks
  const [task, setTask] = useState(''); // Store new task input

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

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
            onClick={() => toggleTask(index)}
            style={{
              textDecoration: t.completed ? 'line-through' : 'none',
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

export default ChecklistWidget;
