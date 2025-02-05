"use client";

interface TableData {
  title: string;
  columns: string[];
  data: string[][];
}

interface TableDataSectionProps {
  data: {
    tables: TableData[];
  };
}

export default function TableDataSection({ data }: TableDataSectionProps) {
  if (!data?.tables) return null;

  return (
    <div className="space-y-8">
      {data.tables.map((table, tableIndex) => (
        <div key={tableIndex} className="overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">{table.title}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {table.columns.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.data.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
