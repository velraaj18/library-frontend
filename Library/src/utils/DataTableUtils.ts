import type { DataTableColumns } from "../interface/DataTableColumns";

export const toTitleCase = (text: string) =>
  text.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());


const GenerateColumns = <T extends object> (
    sample : T,
    exclude: string[] = [],
    customBody ? : Partial<Record<keyof T, (row: T) => React.ReactNode>>
) : DataTableColumns<T>[] => {
    console.log("GenerateColumns - sample:", sample);
  return Object.keys(sample)
    .filter((key) => !exclude.includes(key))
    .map((key) => ({
      field: key as keyof T,
      header: toTitleCase(key),
      sortable: true,
       ...(customBody?.[key as keyof T] && {
        body: customBody[key as keyof T],
      }),
}))
}

export default GenerateColumns