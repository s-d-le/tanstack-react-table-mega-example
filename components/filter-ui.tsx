import React, { useState } from "react";

interface FilterUIProps {
  onFilterChange: (filter: any) => void;
}

const FilterUI: React.FC<FilterUIProps> = ({ onFilterChange }) => {
  const [filterGroups, setFilterGroups] = useState<
    Array<{ key: string; value: string; logic: string }>
  >([{ key: "", value: "", logic: "or" }]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newFilterGroups = [...filterGroups];
    newFilterGroups[index] = { ...newFilterGroups[index], [name]: value };
    setFilterGroups(newFilterGroups);
  };

  const handleAddFilter = () => {
    setFilterGroups([...filterGroups, { key: "", value: "", logic: "or" }]);
  };

  const handleRemoveFilter = (index: number) => {
    const newFilterGroups = filterGroups.filter((_, i) => i !== index);
    setFilterGroups(newFilterGroups);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filterConditions: { [key: string]: any[] } = { and: [], or: [] };

    filterGroups.forEach((filter) => {
      const condition = {
        property: filter.key,
        rich_text: { contains: filter.value },
      };
      filterConditions[filter.logic].push(condition);
    });

    const filter = filterConditions.or.length
      ? { or: filterConditions.or }
      : {};
    if (filterConditions.and.length) {
      filter.and = filterConditions.and;
    }

    onFilterChange(filter);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {filterGroups.map((filter, index) => (
        <div key={index} className="flex space-x-4 mb-2">
          <select
            name="key"
            value={filter.key}
            onChange={(e) => handleInputChange(e, index)}
            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Property</option>
            <option value="Name">Name</option>
            {/* Add other filter options as needed */}
          </select>
          <input
            type="text"
            name="value"
            placeholder="Filter value"
            value={filter.value}
            onChange={(e) => handleInputChange(e, index)}
            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <select
            name="logic"
            value={filter.logic}
            onChange={(e) => handleInputChange(e, index)}
            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="or">OR</option>
            <option value="and">AND</option>
          </select>
          <button
            type="button"
            onClick={() => handleRemoveFilter(index)}
            className="px-3 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleAddFilter}
          className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Filter
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply Filter
        </button>
      </div>
    </form>
  );
};

export default FilterUI;
