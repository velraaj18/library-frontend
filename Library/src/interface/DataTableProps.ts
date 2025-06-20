import type { DataTableColumns } from "./DataTableColumns";

export interface DataTableProps<T> {
  value: T[];
  columns: DataTableColumns<T>[];
  paginator?: boolean;
  rows?: number;
  globalFilter?: boolean;
  title?: string;
}
