import * as React from 'react'
import {
  flexRender,
  type ColumnDef,
  type Table as TanstackTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { DataTablePagination } from './data-table-pagination'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableAdvancedToolbar } from './data-table-advanced-toolbar'
import type { DataTableFilterField } from '../../types'
import { Checkbox } from '../ui/checkbox'

interface DataTableProps<TData> extends React.PropsWithChildren {
  table: TanstackTable<TData>
  floatingBar?: React.ReactNode | null
  filterFields?: DataTableFilterField<TData>[]
}

export function DataTable<TData>({
  table,
  floatingBar = null,
  filterFields,
  children,
}: DataTableProps<TData>) {
  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
        {children}
      </DataTableAdvancedToolbar>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
      </div>
    </div>
  )
}

export function selectColumn<entityType>(): ColumnDef<entityType> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
}

export function buildColumns<entityType>(
  ...fields: (keyof entityType)[]
): ColumnDef<entityType, unknown>[] {
  return fields.map((field) => ({
    accessorKey: field as string,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={String(field)} />
    ),
    cell: (info) => (
      <div className="w-20">{String(info.row.original[field])}</div>
    ),
    meta: {
      field: field,
    },
  }))
}

export function buildFilterColumns<entityType>(
  ...fields: (keyof entityType)[]
): DataTableFilterField<entityType>[] {
  return fields.map((field) => ({
    caption: String(field),
    key: field,
    placeholder: String(field),
    options: [],
  }))
}
