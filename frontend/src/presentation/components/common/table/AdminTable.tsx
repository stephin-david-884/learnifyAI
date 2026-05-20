import React from 'react';

type Props = {
  headers: string[];
  loading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  colSpan: number;
  children: React.ReactNode;
};

const AdminTable: React.FC<Props> = ({
  headers,
  loading,
  isEmpty,
  emptyMessage = "No data found",
  colSpan,
  children
}) => {
  return (
    <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'>

      <div className='overflow-x-auto'>

        <table className="min-w-full divide-y divide-slate-200">

          <thead className="bg-slate-50">

            <tr>

              {headers.map((header) => (

                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                >

                  {header}

                </th>

              ))}

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">

            {loading ? (
              <tr>

                <td
                  colSpan={colSpan}
                  className="px-6 py-16 text-center text-sm text-slate-500"
                >
                  Loading...
                </td>

              </tr>
            ) : isEmpty ? (

              <tr>

                <td
                  colSpan={colSpan}
                  className='px-6 py-16 text-center text-sm text-slate-500'
                >

                  {emptyMessage}

                </td>

              </tr>

            ) : (

              children

            )

            }

          </tbody>

        </table>
      </div>
    </div>
  )
}

export default AdminTable;
