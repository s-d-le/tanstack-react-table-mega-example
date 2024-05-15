"use server";

import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import { NextResponse } from "next/server";

const databaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getDatabase = async (filter: any, sorts: any) => {
  const response = await notion.databases.query({
    database_id: databaseId ?? "",
    filter,
    sorts,
  });

  /**
   * Transform response to usable data for table component
   */
  const columns = Object.keys(
    (response.results[0] as PageObjectResponse).properties || {}
  )
    .map((key) => ({
      accessorKey: key,
      header: key,
    }))
    .reverse();

  /**
   * For MVP purposes, we will only get the content of property plain_text
   */
  const data = response.results.map((item: any) => {
    const rowData: any = {};
    for (const key in item.properties) {
      const property = item.properties[key]?.[item.properties[key].type];
      if (Array.isArray(property)) {
        rowData[key] = property.map((p: any) => p.plain_text).join(", ");
      } else {
        rowData[key] = property?.plain_text || property || "";
      }
    }
    return rowData;
  });

  console.log(response.results);

  return { columns, data };

  //   return new NextResponse(JSON.stringify(response.results), {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
};
