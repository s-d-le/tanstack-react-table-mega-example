import Image from "next/image";
import { getDatabase } from "@/lib/notion";

async function getPosts() {
  const database = await getDatabase();
  // console.log(database);
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
      </div>
    </main>
  );
}
