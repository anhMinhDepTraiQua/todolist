import './App.css';
import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addTask = () => {
    if (task.trim() && category.trim() && dueTime.trim()) {
      if (editingId) {
        //tự đông cập nhật nhiệm vụ nếu như đang edit
        setTasks(
          tasks.map((t) =>
            t.id === editingId
              ? { ...t, text: task, category: category, dueTime: dueTime }
              : t
          )
        );
        setEditingId(null);
      } else {
        //thêm nhiệm vụ
        setTasks([
          ...tasks,
          { id: Date.now(), text: task, category: category, dueTime: dueTime, completed: false }
        ]);
      }
      setTask('');
      setCategory('');
      setDueTime('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.text);
      setCategory(taskToEdit.category);
      setDueTime(taskToEdit.dueTime);
      setEditingId(id);
    }
  };

  return (
    <>
      <div className="App">
        <h3>Danh sách cần làm</h3>
        <div className="input-container">
          <input
            name="todoapp"
            placeholder="Nội dung nhiệm vụ"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            name="category"
            placeholder="Danh mục"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="datetime-local"
            name="dueTime"
            placeholder="Thời gian hoàn thành"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
          />
          <button onClick={addTask}>{editingId ? 'Cập nhật' : 'Thêm'}</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <div>
                <span onClick={() => toggleComplete(task.id)}>
                  <strong>{task.text}</strong>
                </span>
                <p>Danh mục: {task.category}</p>
                <p>Hoàn thành trước: {new Date(task.dueTime).toLocaleString()}</p>
              </div>
              <button onClick={() => startEditTask(task.id)}>Sửa</button>
              <button onClick={() => deleteTask(task.id)}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
