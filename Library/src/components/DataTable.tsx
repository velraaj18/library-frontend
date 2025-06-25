import { Column } from "primereact/column";
import type { DataTableProps } from "../interface/DataTableProps";
import { DataTable } from "primereact/datatable";
import { useRef } from "react";
import { ContextMenu } from "primereact/contextmenu";

const DataTableComponent = <T extends object>({
  value,
  columns,
  paginator,
  rows = 10,
  contextMenuModel,
  contextMenuSelection,
  onContextMenuSelectionChange,
}: DataTableProps<T>) => {
  console.log("DataTable Component:", value, columns);

  const cm = useRef<ContextMenu>(null);

  return (
    <>
      {contextMenuModel && <ContextMenu model={contextMenuModel} ref={cm} />}
      <DataTable
        value={value}
        paginator={paginator}
        rows={rows}
        tableStyle={{ minWidth: "20rem" }}
        contextMenuSelection={contextMenuSelection ?? undefined}
        onContextMenuSelectionChange={(e) =>
          onContextMenuSelectionChange?.(e.value)
        }
        onContextMenu={(e) => cm.current?.show(e.originalEvent)}
        selectionMode="single"
        className="dark: !bg-amber-950"
      >
        {columns.map((col, i) => (
          <Column
            key={i}
            field={col.field as string}
            header={col.header}
            sortable={col.sortable}
            body={col.body}
            className="dark: bg-emerald-200"
            headerClassName="dark: !bg-emerald-200"
          />
        ))}
      </DataTable>
    </>
  );
};

export default DataTableComponent;
