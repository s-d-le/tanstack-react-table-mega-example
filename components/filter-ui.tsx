"use client";

import React, { useState } from "react";

interface FilterUIProps {
  onFilterChange: (filters: any) => void;
}

const FilterUI: React.FC<FilterUIProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState([
    { property: "", operator: "", value: "" },
  ]);

  const addFilter = () => {
    setFilters([...filters, { property: "", operator: "", value: "" }]);
  };

  const updateFilter = (index: number, key: string, value: string) => {
    const newFilters = [...filters];
    newFilters[index][key] = value;
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-4">
      {filters.map((filter, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="Property"
            value={filter.property}
            onChange={(e) => updateFilter(index, "property", e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <select
            value={filter.operator}
            onChange={(e) => updateFilter(index, "operator", e.target.value)}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
            {/* Add more operators as needed */}
          </select>
          <input
            type="text"
            placeholder="Value"
            value={filter.value}
            onChange={(e) => updateFilter(index, "value", e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
      ))}
      <button
        onClick={addFilter}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Filter
      </button>
    </div>
  );
};

export default FilterUI;
