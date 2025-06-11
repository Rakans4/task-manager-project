import { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import AuthForm from "./AuthForm";
import { getApiClient } from "../api";
import { toast } from "react-hot-toast";

type Task = {
  id?: string;
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
};

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const api = getApiClient(token);

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (priority) params.append("priority", priority);
      if (status) params.append("status", status);
      const res = await api.get(`/tasks`, { params });
      setTasks(res.data);
      toast.success("Task created!");
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleCreate = async (task: Task) => {
    try {
      const res = await api.post("/tasks", task);
      setTasks((prev) => [...prev, res.data]);
      setNewTask({
        title: "",
        description: "",
        priority: "Medium",
        status: "Todo",
      });
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  const handleUpdate = async (updatedTask: Task) => {
    try {
      const res = await api.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? res.data : task))
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) return <AuthForm onAuthSuccess={setToken} />;

  return (
    <div className="p-6 max-w-xl mx-auto">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <button onClick={handleLogout} className="text-sm text-red-500 underline">
          Logout
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <select value={priority} onChange={e => setPriority(e.target.value)} className="border p-2 rounded">
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 rounded">
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In-Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={() => fetchTasks()}>search</button>
      </div>
      <TaskInput
        onSubmit={(task: Task) => handleCreate(task)}
      />

      <ul className="list bg-base-100 rounded-box shadow-md">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id || ""}
            task={task}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
