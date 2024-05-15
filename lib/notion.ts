"use server";

import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import { NextResponse } from "next/server";

const databaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getDatabase = async (filter = {}, sorts = []) => {
  const response = await notion.databases.query({
    database_id: databaseId ?? "",
  });

  /**
   * Transform response to usable data for table component
   */
  const columns = Object.keys(
    (response.results[0] as PageObjectResponse).properties || {}
  ).map((key) => ({
    accessorKey: key,
    header: key,
  }));

  const data = response.results.map((item: any) => {
    const rowData: any = {};
    for (const key in item.properties) {
      rowData[key] = item.properties[key]?.[item.properties[key].type];
    }
    return rowData;
  });

  return { columns, data };

  //   return new NextResponse(JSON.stringify(response.results), {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
};
