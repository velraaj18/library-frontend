import { TaskStatus, TaskPriority } from "../../../../Backend/src/enums/taskEnums";

export interface Task {
  title: string;
  description?: string;
  priority: TaskPriority;
  isCompleted: boolean;
  dueDate: Date;
  dateCreated: Date;
  dateModified?: Date;
  status: TaskStatus;
  userId: string; // Typically a MongoDB ObjectId stored as a string
}
