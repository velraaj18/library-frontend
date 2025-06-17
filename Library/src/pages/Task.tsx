import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        
import type { Task } from "../interface/Task";
import {
  TaskStatus,
  TaskPriority,
} from "../../../../Backend/src/enums/taskEnums";

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: TaskPriority,
    isCompleted: false,
    dueDate: new Date(),
    status: TaskStatus,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useRef<Toast>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5001/api/task/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("API Response:", response.data); // Debugging: Log response format

    if (Array.isArray(response.data)) {  
      setTasks(response.data); // Directly assign the array
    } else {
      console.error("Unexpected response format:", response.data);
      setTasks([]); // Fallback to empty array
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    setTasks([]); // Ensure tasks is never undefined
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/task/createTask", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Include Bearer token
          "Content-Type": "application/json",
        },
      });
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

      {/* Task Table */}
      <DataTable value={tasks} paginator rows={5} className="shadow-md rounded-lg bg-white dark:bg-black" size="normal">
        <Column field="title" header="Title" sortable filter />
        <Column field="description" header="Description" sortable filter />
        <Column field="priority" header="Priority" sortable filter />
        <Column field="status" header="Status" sortable filter />
        <Column field="dueDate" header="Due Date" sortable filter body={(rowData) => new Date(rowData.dueDate).toLocaleString()} />
        <Column field="dateCreated" header="Created At" sortable filter body={(rowData) => new Date(rowData.dateCreated).toLocaleString()} />
        <Column field="isCompleted" header="Completed" body={(rowData) => (rowData.isCompleted ? "Yes" : "No")} />
      </DataTable>

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
            options={Object.values(TaskPriority).map((value) => ({
              label: value,
              value,
            }))}
            onChange={(e) => setFormData({ ...formData, priority: e.value })}
            placeholder="Select Priority"
          />

          <Dropdown
            name="status"
            value={formData.status}
            options={Object.values(TaskStatus).map((value) => ({
              label: value,
              value,
            }))}
            onChange={(e) => setFormData({ ...formData, status: e.value })}
            placeholder="Select Status"
          />

          <Checkbox
            inputId="isCompleted"
            checked={formData.isCompleted}
            onChange={(e) =>
              setFormData({ ...formData, isCompleted: e.checked ?? false })
            }
            name="Completed"
          />
          <label htmlFor="isCompleted">Completed</label>

          <Calendar
            name="dueDate"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.value ?? new Date() })
            }
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
