import React from 'react';

function SearchHistory({ searchHistory }) {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Search History</h2>
      {searchHistory.length === 0 ? (
        <p>No search history yet</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">City</th>
              <th className="p-2 text-left">Temperature</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {searchHistory.map((search, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{search.username}</td>
                <td className="p-2">{search.city}</td>
                <td className="p-2">
                  {search.weather_data?.current?.temperature}°C
                </td>
                <td className="p-2">
                  {new Date(search.search_date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SearchHistory;