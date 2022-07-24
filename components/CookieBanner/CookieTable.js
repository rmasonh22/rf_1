function CookieTable({ cookies }) {
  const tableHeaders = ["Cookie", "Duration", "Origin", "Description"];
  return (
    <div className="mt-4 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeaders.map((headerName) => (
                    <th
                      key={headerName}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      {headerName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cookies.map((cookie, idx) => (
                  <tr
                    key={cookie.cookieName}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="whitespace-pre-line px-4 py-4 text-sm font-medium text-gray-900">
                      {cookie.cookieName}
                    </td>
                    <td className="whitespace-pre-line px-4 py-4 text-sm text-gray-500">
                      {cookie.cookieDuration}
                    </td>
                    <td className="whitespace-pre-line px-4 py-4 text-sm text-gray-500">
                      {cookie.cookieService}
                    </td>
                    <td className="whitespace-pre-line px-4 py-4 text-sm text-gray-500">
                      {cookie.cookieDescription}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieTable;
