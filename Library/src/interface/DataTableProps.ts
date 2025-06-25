import type { DataTableColumns } from "./DataTableColumns";
import type { MenuItem } from "primereact/menuitem";

export interface DataTableProps<T> {
  value: T[];
  columns: DataTableColumns<T>[];
  paginator?: boolean;
  rows?: number;
  globalFilter?: boolean;
  title?: string;
  contextMenuModel? : MenuItem[];
  contextMenuSelection? : T | null;
  onContextMenuSelectionChange?: (value: T | null) => void;
}