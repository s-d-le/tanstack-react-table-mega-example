import { getDatabase } from "@/lib/notion";
import TableView from "@/components/table-view";

async function getPosts() {
  const database = await getDatabase();
  return database;
}

export default async function Home() {
  const data = await getPosts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center font-momo">
        {data.map((page) => (
          <p key={page.id}>{page.id}</p>
        ))}
        <TableView />
      </div>
    </main>
  );
}
