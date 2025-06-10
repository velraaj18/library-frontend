import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import type { Task } from "../interface/Task";

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    isCompleted: false,
    dueDate: new Date(),
    status: "Pending",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/task/"
      );
      if (response.data) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/task/createTask", formData);
      console.log(formData)
      toast.current?.show({
        severity: "success",
        detail: "Task Created successfully",
        life: 3000,
      });
      setModalVisible(false);
      fetchTasks(); // Refresh task list
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        detail: error.response?.data?.message || "Something went wrong",
        life: 5000,
      });
    }
  };

  return (
    <div className="p-6">
      <Toast ref={toast} />

      {/* Create New Task Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tasks</h2>
        <Button
          label="Create New Task"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={() => setModalVisible(true)}
        />
      </div>

      {/* Task List */}
      <ul className="border rounded-lg p-4 bg-white shadow-md">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.userId} className="border-b py-2">
              <span className="font-medium">{task.title}</span> - {task.status}
            </li>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </ul>

      {/* Task Creation Modal */}
      <Dialog
        header="Create New Task"
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        modal
        className="w-96"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputText
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <InputText
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <Dropdown
            name="priority"
            value={formData.priority}
            options={["Low", "Medium", "High"]}
            onChange={(e) => setFormData({ ...formData, priority: e.value })}
            placeholder="Priority"
          />

          <Checkbox
            inputId="isCompleted"
            checked={formData.isCompleted}
            onChange={(e) =>
              setFormData({ ...formData, isCompleted: e.checked ?? false })
            }
          />
          <label htmlFor="isCompleted">Completed</label>

          <Calendar
            name="dueDate"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.value ?? new Date()})}
            showIcon
          />

          <Button
            type="submit"
            label="Create Task"
            icon="pi pi-check"
            className="p-button-primary"
          />
        </form>
      </Dialog>
    </div>
  );
};

export default TaskPage;
