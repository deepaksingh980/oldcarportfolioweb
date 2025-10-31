export default function AdminTable({ data, columns, onEdit, onDelete }: any) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-neutral-800 rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-200 dark:bg-neutral-700">
          <tr>
            {columns.map((col: any) => (
              <th key={col} className="p-2 text-left font-semibold">{col}</th>
            ))}
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item._id} className="border-t border-neutral-300 dark:border-neutral-700">
              {columns.map((col: any) => (
                <td key={col} className="p-2">{item[col]}</td>
              ))}
              <td className="p-2 space-x-2">
                <button onClick={() => onEdit(item)} className="text-blue-500">Edit</button>
                <button onClick={() => onDelete(item)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
