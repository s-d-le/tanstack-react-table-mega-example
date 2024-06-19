"use client";
import { useState, useEffect } from "react";
import { getDatabase } from "@/lib/notion";
import TableView from "@/components/table-view";
import FilterUI from "@/components/filter-ui";
import { visibleColumns } from "@/app/visibleColumns";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  // const [columns, setColumns] = useState<any[]>([]);
  const [filter, setFilter] = useState<any>({ or: [] });
  const [sorts, setSorts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // use columns from response if you dont want to bother with visibleColumns
        const { columns, data } = await getDatabase(filter, sorts);
        // setColumns(columns);
        setData(data);
      } catch {
        throw new Error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filter, sorts]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center font-momo">
        <FilterUI onFilterChange={setFilter} />
        <TableView columns={visibleColumns} data={data} isLoading={isLoading} />
      </div>
    </main>
  );
}
