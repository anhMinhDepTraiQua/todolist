import './App.css';
import React, { useState } from 'react';

// Định nghĩa kiểu cho một nhiệm vụ
interface Task {
  id: number;
  text: string;
  category: string;
  dueTime: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [dueTime, setDueTime] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const addTask = () => {
    if (task.trim() && category.trim() && dueTime.trim()) {
      if (editingId) {
        // Cập nhật nhiệm vụ nếu đang chỉnh sửa
        setTasks(
          tasks.map((t) =>
            t.id === editingId
              ? { ...t, text: task, category: category, dueTime: dueTime }
              : t
          )
        );
        setEditingId(null);
      } else {
        // Thêm nhiệm vụ mới
        setTasks([
          ...tasks,
          { id: Date.now(), text: task, category: category, dueTime: dueTime, completed: false },
        ]);
      }
      setTask('');
      setCategory('');
      setDueTime('');
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.text);
      setCategory(taskToEdit.category);
      setDueTime(taskToEdit.dueTime);
      setEditingId(id);
    }
  };

  return (
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
      <table className="task-table">
        <thead>
          <tr>
            <th>Nội dung</th>
            <th>Danh mục</th>
            <th>Thời gian hoàn thành</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className={task.completed ? 'completed' : ''}>
              <td onClick={() => toggleComplete(task.id)}>{task.text}</td>
              <td>{task.category}</td>
              <td>{new Date(task.dueTime).toLocaleString()}</td>
              <td>{task.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}</td>
              <td>
                <button onClick={() => startEditTask(task.id)}>Sửa</button>
                <button onClick={() => deleteTask(task.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
