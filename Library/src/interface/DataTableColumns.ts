
export interface DataTableColumns <T> {
    field : keyof T,
    header : string,
    sortable? : boolean;
    body? : (row: T) =>  React.ReactNode
}