import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Task = {
  id?: string;
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
};

type TaskInputProps = {
  onSubmit: (task: Task) => void;
  taskToEdit?: Task | null;
};

const defaultTask: Task = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Pending",
};

const TaskInput = ({ onSubmit, taskToEdit }: TaskInputProps) => {
  const [task, setTask] = useState<Task>(defaultTask);

  // Populate form if editing
  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask(defaultTask);
    }
  }, [taskToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(task);
    setTask(defaultTask); // Reset after submission
  };

  return (
    <div className="flex gap-2 mb-4">
      <fieldset className="fieldset p-4 space-y-2 w-full">
        <label className="label">Title</label>
        <input
          type="text"
          className="input w-full"
          placeholder="New Task"
          name="title"
          value={task.title}
          onChange={handleChange}
        />

        <label className="label">Description</label>
        <textarea
          className="textarea w-full"
          placeholder="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
        />

        <label className="label">Priority</label>
        <select
          className="select w-full"
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label className="label">Status</label>
        <select
          className="select w-full"
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In-Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <Button type="button" onClick={handleSubmit}>
          {task.id ? "Update" : "Add"}
        </Button>
      </fieldset>
    </div>
  );
};

export default TaskInput;
