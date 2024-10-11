export type FilterOperator = {
  label: string
  process: (val: any) => any
  applyWhenNoValue?: boolean
}
const selectableOperators: FilterOperator[] = [
  { label: 'Is', process: (val: any) => val },
  {
    label: 'Is not',
    process: (val: any) => ({ $ne: val }),
  },
  {
    label: 'Is empty',
    process: (_: any) => null,
    applyWhenNoValue: true,
  },
  {
    label: 'Is not empty',
    process: (_: any) => ({ $ne: null }),
    applyWhenNoValue: true,
  },
]
export const dataTableConfig = {
  selectableOperators,
}
