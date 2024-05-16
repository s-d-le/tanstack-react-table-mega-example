"use client";
import { useState, useEffect } from "react";
import { getDatabase } from "@/lib/notion";
import TableView from "@/components/table-view";
import FilterUI from "@/components/filter-ui";

export default function Home() {
  // const { columns, data } = await getPosts();

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [filter, setFilter] = useState({ or: [] });
  const [sorts, setSorts] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { columns, data } = await getDatabase({ filter, sorts });

      setColumns(columns);
      setData(data);
    };
    fetchData();
  }, [filter, sorts]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center font-momo">
        <FilterUI />
        <TableView columns={columns} data={data} />
      </div>
    </main>
  );
}
