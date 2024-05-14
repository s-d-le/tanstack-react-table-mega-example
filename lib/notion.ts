"use server";

import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import { NextResponse } from "next/server";

const databaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: databaseId ?? "",
  });

  //   console.log((response.results[0] as PageObjectResponse).properties);
  //   console.log(response.results[0].id);

  return response.results;

  //   return new NextResponse(JSON.stringify(response.results), {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
};
