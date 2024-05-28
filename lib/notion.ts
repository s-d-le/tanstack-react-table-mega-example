"use server";

import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";

const databaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

/**
 * TODO: Init query params
 */
// export const getDatabase = async (
//   { database_id, filter, sorts }: QueryDatabaseParameters = {
//     database_id: databaseId ?? "",
//     filter: { or: [] },
//     sorts: [],
//   }
// ) => {

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
    .map((key) => {
      const property = (response.results[0] as PageObjectResponse).properties[
        key
      ];

      return {
        accessorKey: key,
        header: key,
        id: property.id,
      };
    })
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

  return { columns, data };
};
