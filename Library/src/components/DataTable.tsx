import { Column } from "primereact/column"
import type { DataTableProps } from "../interface/DataTableProps"
import { DataTable } from "primereact/datatable"

const DataTableComponent = <T extends object> ({
    value,
    columns,
    paginator,
    rows = 10,
}: DataTableProps<T>) => {
    console.log("DataTable Component:", value, columns);
  return (
    <>
      <DataTable value={value} paginator={paginator} rows={rows}>
        {columns.map((col, i) => (
          <Column
            key={i}
            field={col.field as string}
            header={col.header}
            sortable={col.sortable}
            body={col.body}
          />
        ))}
      </DataTable>
    </>
  );
}

export default DataTableComponent